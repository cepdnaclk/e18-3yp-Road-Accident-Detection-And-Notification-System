import React, { useState, useContext, useEffect } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { 
    ImageBackground, 
    Image, 
    StyleSheet, 
    View, 
    StatusBar, 
    TouchableOpacity, 
    ScrollView,
    useWindowDimensions,
    Text,
    FlatList, 
} from 'react-native';
// import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import ContactListCard from '../components/ContactListCard';
import ModalPopUp from '../components/ModalPopUp';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';

let currentIndex = 0
const profilePics = [
    {
        image: require('../assets/profPic/picture1.jpg'),
    },
    {
        image: require('../assets/profPic/picture2.jpg'),
    },
    {
        image: require('../assets/profPic/picture3.jpg'),
    },     
]

const renderItem = ({ item }) => {
    currentIndex = currentIndex + 1;
    if (currentIndex == 3) {
        currentIndex = 0
    }
    return (
        <ContactListCard name={item.name} telephoneNo={item.phoneNum} image={profilePics[currentIndex].image} />
    );
};

const DriverHomeScreen = ({navigation}) => {

    // useEffect(() => {

    //     // const interval = setInterval(() => {
    //     //     console.log('repeated')
    //     // }, 5000);
    //     // return () => clearInterval(interval);
    // }, []);

    const [visible, setVisible] = useState(false);
    const [modalInputs, setModalInputs] = useState({
        fname: '',
        lname: '',
        tpNo: '',
    });
    const [errors, setErrors] = useState({});

    const { isLoading, userInfo, AddEmergencyContact } = useContext(AuthContext);

    const size = useWindowDimensions();
    const height = size.height + StatusBar.currentHeight + 13;

    const [fontsLoaded] = useFonts({
        'Poppins': require('../assets/fonts/Poppins-Medium.ttf'),
        'YanoneKaff': require('../assets/fonts/YanoneKaffeesatz-SemiBold.ttf'),
    });

    const handleOnChange = (text, input) => {
        setModalInputs(prevState => ({...prevState, [input]: text}));
    };

    const ValidateInputs = () => {
        // Keyboard.dismiss();
        let valid = true;

        if (!modalInputs.fname && !modalInputs.lname) {
            handleError('Please input atleast firsnamet or lastname', 'fname');
            valid = false;
        } else if (modalInputs.fname || modalInputs.lname) {
            handleError('', 'fname');
        }
        if (!modalInputs.tpNo) {
            handleError('Please input telephone number', 'tpNo');
            valid = false;
        } else if (!(modalInputs.tpNo.length === 10 || modalInputs.tpNo.length === 9) || !parseInt(modalInputs.tpNo)) {
            handleError('Invalid telephone number', 'tpNo');
            valid = false;
        } else {
            handleError('', 'tpNo');
        }
        console.log(errors)

        if (valid) {
            AddEmergencyContact(modalInputs.fname, modalInputs.lname, modalInputs.tpNo);
            setModalInputs({
                fname: '',
                lname: '',
                tpNo: '',
            })
            setVisible(false);            
        }
    };

    const handleError = (errorMsg, input) => {
        setErrors((prevState) => ({...prevState, [input]: errorMsg}));
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        // <ScrollView>
        <>
            <ModalPopUp visible={visible}>
                <Spinner visible={isLoading} />
                <View style={{alignItems: 'center'}}>
                    <View style={styles.header}>
                        <Text style={{color: 'rgba(181, 181, 181, 0.7)', fontFamily: 'YanoneKaff', fontSize: 20, letterSpacing: 1.5, paddingLeft: '3%'}}>New Contact</Text>
                        <TouchableOpacity onPress={() => {
                            setModalInputs({
                                fname: '',
                                lname: '',
                                tpNo: '',
                            })
                            setVisible(false)
                        }}>
                            <Ionicons name="close" size={24} color="rgba(181, 181, 181, 0.7)" />
                        </TouchableOpacity>
                    </View>
                    <CustomInput 
                        width='100%' 
                        font='Poppins' 
                        iconName='account-outline'
                        iconSize={20} 
                        placeholder='first name' 
                        label='firstname'
                        onChangeText={(text) => handleOnChange(text, 'fname')}
                        value={modalInputs.fname}
                        error={errors.fname}
                        onFocus={() => {
                            handleError(null, 'fname');
                        }}
                        />
                    <CustomInput 
                        width='100%' 
                        font='Poppins' 
                        iconName='account-outline'
                        iconSize={20} 
                        placeholder='last name' 
                        label='lastname'
                        onChangeText={(text) => handleOnChange(text, 'lname')}
                        value={modalInputs.lname}
                        // error='This is an error message'
                        />
                    <CustomInput 
                        width='100%' 
                        font='Poppins' 
                        iconName='cellphone'
                        iconSize={18} 
                        placeholder='telephone number' 
                        label='telephonenumber'
                        onChangeText={(text) => handleOnChange(text, 'tpNo')}
                        value={modalInputs.tpNo}
                        error={errors.tpNo}
                        onFocus={() => {
                            handleError(null, 'tpNo');
                        }}
                        />
                    <View style={styles.modalBottomBtns}>
                        <CustomButton 
                            width='55%' 
                            font='Poppins' 
                            fontSize={15}
                            primary='#5037A9' 
                            secondary='#48319D' 
                            color='#DBDBDB' 
                            title='Add Contact'
                            onPress={() => {
                                ValidateInputs()
                            }} />
                        <CustomButton 
                            width='41%' 
                            font='Poppins' 
                            fontSize={15} 
                            primary='#C7C0E3' 
                            secondary='#AEA6CC' 
                            color='#5037A9' 
                            title='Cancel'
                            onPress={() => {
                                setModalInputs({
                                    fname: '',
                                    lname: '',
                                    tpNo: '',
                                })
                                setVisible(false)
                            }} />
                    </View>
                </View>
            </ModalPopUp>
            <View style={[styles.container, {height: height}]}>
                <ImageBackground source={require('../assets/img/Background.png')} style={styles.image}>
                    <View style={styles.welcomeLogo}>
                        {/* <TouchableOpacity 
                            onPress={() => navigation.navigate('Welcome')}
                            style={styles.back}>

                            <Ionicons name="md-chevron-back" size={35} color="#B5B5B5" />
                        </TouchableOpacity> */}
                        <Image source={require('../assets/img/LogoDriver.png')} style={{width: 110, height: 50}}/>
                    </View>

                    <View style={styles.label}>
                        <Text style={[styles.txtlabel, {fontFamily: 'YanoneKaff'}]}>My emergency contacts</Text>
                        
                        <TouchableOpacity onPress={() => {setVisible(true)}}>
                            <Ionicons name="ios-add" size={30} color="rgba(219, 219, 219, 0.7)" />
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1}}>
                        <FlatList style={{flex: 1}}
                            // data={list}
                            data={userInfo.emergency}
                            renderItem={renderItem}
                            keyExtractor={item => item.phoneNum}
                        />
                    </View>
                </ImageBackground>
            </View>
            {/* <CustomNavigationBar /> */}
            <ExpoStatusBar style='light'/>
        </>
        // </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        // flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    welcomeLogo: {
        // flex: 1,
        height: '17%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: StatusBar.currentHeight + 10,
        paddingLeft: '4%',
        // backgroundColor: '#5037A9'
    },
    back: {
        position: 'absolute',
        top: StatusBar.currentHeight + 10,
        right: 20,
    },
    label: {
        height: '4%',
        flexDirection: 'row',
        // backgroundColor: '#5037A9',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '4%',
        marginBottom: '3.5%',
    },
    txtlabel: {
        color: '#D8D5DF',
        fontSize: 17,
        letterSpacing: 1
    },
    header: {
        width: '100%',
        height: 35,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        // backgroundColor: '#D8D5DF',
    },
    modalBottomBtns: {
        width: '100%', 
        marginTop: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
})

export default DriverHomeScreen;