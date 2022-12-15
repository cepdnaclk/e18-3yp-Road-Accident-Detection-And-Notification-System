import React, { useState } from 'react';
import { Modal, View, StyleSheet, StatusBar } from 'react-native';

function ModalPopUp({visible, children}) {

    const [showModal, setShowModal] = useState(visible);

    return (
        <Modal transparent visible={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    {children}
                </View>
            </View>
            <StatusBar backgroundColor='rgba(0,0,0,0.5)'/>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,

    }
})

export default ModalPopUp;