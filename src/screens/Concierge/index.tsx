import React from 'react';
// react native component
import { View, Text, StyleSheet, Pressable } from 'react-native';
// top tab element
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// icon
import Entypo from '@expo/vector-icons/Entypo';
// components
import Messages from './Messages';
import Cities from './Cities';
import Trips from './Trips';

// ---------------------------------------------------------------- //

const Tab = createMaterialTopTabNavigator();

const Concierge = ({ navigation }: { navigation: any }) => {

    const handleAdd = () => {

    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ width: 40 }}></Text>
                <Text style={styles.title}>Concierge</Text>
                <Text>
                    <Pressable onPress={handleAdd} style={styles.addButton}>
                        <Entypo name="plus" size={30} color="black" />
                    </Pressable>
                </Text>
            </View>
            <Tab.Navigator
                screenOptions={{
                    tabBarIndicatorStyle: {
                        borderBottomWidth: 1,
                        backgroundColor: '#000',
                    },
                    tabBarStyle: { backgroundColor: '#e4dfdb' },
                    tabBarLabelStyle: {
                        fontSize: 22,
                        textTransform: "none",
                    },
                }}
            >
                <Tab.Screen name="Messages" component={Messages} />
                <Tab.Screen name="Cities" component={Cities} />
                <Tab.Screen name="Trips" component={Trips} />
            </Tab.Navigator>
        </View>
    );
};

// ---------------------------------------------------------------- //

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e4dfdb',
        height: '100%',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    title: {
        fontSize: 26,
    },
    addButton: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 5,
    },
});

// ---------------------------------------------------------------- //

export default Concierge;