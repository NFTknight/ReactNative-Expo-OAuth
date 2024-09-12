import React from 'react';
// react native component
import { View, Text, StyleSheet, Pressable } from 'react-native';
// icon
import Entypo from '@expo/vector-icons/Entypo';

// ---------------------------------------------------------------- //

const Trips = ({ navigation }: { navigation: any }) => {

    const handleStartExploring = () => {

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nothing booked just yet!</Text>
            <Text style={styles.text}>Explore our experiences</Text>
            <Pressable onPress={handleStartExploring} style={styles.button}>
                <Text style={styles.buttonText}>
                    <Text>
                        Start Exploring
                    </Text>
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

export default Trips;