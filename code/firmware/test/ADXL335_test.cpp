#include <Arduino.h>
#include <unity.h>

//--------------------------------------------------------------
#define xPin A1
#define yPin A2
#define zPin A3
//--------------------------------------------------------------
// calibrated minimum and maximum Raw Ranges for each axis

int xMin = 264;
int xMax = 398;

int yMin = 265;
int yMax = 398;

int zMin = 267;
int zMax = 401;

float x_g_value, y_g_value, z_g_value;

// Take multiple samples to reduce noise
const int samples = 10;
//--------------------------------------------------------------

void test_orientation(void)
{
    // Read raw values
    int xRaw = 0, yRaw = 0, zRaw = 0;
    for (int i = 0; i < samples; i++)
    {
        xRaw += analogRead(xPin);
        yRaw += analogRead(yPin);
        zRaw += analogRead(zPin);
    }
    xRaw /= samples;
    yRaw /= samples;
    zRaw /= samples;
    //--------------------------------------------------------------
    // Convert raw values to 'milli-Gs"
    // Convert value of RawMin to -1000
    // Convert value of RawMax to 1000
    long xMilliG = map(xRaw, xMin, xMax, -1000, 1000);
    long yMilliG = map(yRaw, yMin, yMax, -1000, 1000);
    long zMilliG = map(zRaw, zMin, zMax, -1000, 1000);
    //--------------------------------------------------------------

    // re-scale to fractional Gs
    x_g_value = xMilliG / 1000.0;
    y_g_value = yMilliG / 1000.0;
    z_g_value = zMilliG / 1000.0;

    x_g_value = x_g_value < 0 ? x_g_value * (1) : x_g_value;
    y_g_value = y_g_value < 0 ? y_g_value * (1) : y_g_value;
    z_g_value = z_g_value < 0 ? z_g_value * (1) : z_g_value;
}

void test_orientation_xaxis(void)
{
    TEST_ASSERT_EQUAL(0, round(x_g_value));
}

void test_orientation_yaxis(void)
{
    TEST_ASSERT_EQUAL(0, round(y_g_value));
}

void test_orientation_zaxis(void)
{
    TEST_ASSERT_EQUAL(1, round(z_g_value));
}

void setup()
{

    delay(2000);
    UNITY_BEGIN();
}

uint8_t i = 0;
uint8_t max_rounds = 10;

void loop()
{
    if (i < max_rounds)
    {
        test_orientation();
        RUN_TEST(test_orientation_xaxis);
        RUN_TEST(test_orientation_yaxis);
        RUN_TEST(test_orientation_zaxis);
        delay(500);
        i++;
    }
    else if (i == max_rounds)
    {
        UNITY_END();
    }
}