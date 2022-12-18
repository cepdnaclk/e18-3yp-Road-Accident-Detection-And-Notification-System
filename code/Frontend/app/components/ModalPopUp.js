import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function ModalPopUp({visible, children}) {

    const [showModal, setShowModal] = useState(visible);
    useEffect(() => {
        toggleModal();
    }, [visible]);
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }

    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackground}>
                <LinearGradient
                    style={styles.modalContainer}
                    colors={[ '#20203A', '#22233F' ]}
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 1}}>
                
                    {children}
                </LinearGradient>
            </View>
            <StatusBar backgroundColor='rgba(0,0,0,0.8)'/>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        // backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,

    }
})

export default ModalPopUp;