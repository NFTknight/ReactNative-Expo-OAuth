import React from 'react';
// react native component
import { View, Text, StyleSheet, Pressable } from 'react-native';
// icon
import Entypo from '@expo/vector-icons/Entypo';

// ---------------------------------------------------------------- //

const Messages = ({ navigation }: { navigation: any }) => {

    const handleMakeRequest = () => {

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nothing here just yet!</Text>
            <Text style={styles.text}>Ready to make a concierge request?</Text>
            <Pressable onPress={handleMakeRequest} style={styles.button}>
                <Text style={styles.buttonText}>
                    <Text>
                        Make a Request
                        &nbsp;&nbsp;&nbsp;
                    </Text>
                    <Entypo name="plus" size={22} color="white" />
                </Text>
            </Pressable>
        </View>

    );
};

// ---------------------------------------------------------------- //

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4dfdb',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    title: {
        fontSize: 26,
        color: '#374642'
    },
    text: {
        fontSize: 20,
        color: '#747373'
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 50,
        paddingHorizontal: 30,
        paddingVertical: 15,
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
    }
});

// ---------------------------------------------------------------- //

export default Messages;