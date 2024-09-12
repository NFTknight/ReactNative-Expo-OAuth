import React from "react";
// navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// components
import { Text } from "react-native";
// icons
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// Screens
import Login from "@screens/Login";
import Home from "@screens/Home";
import Calendar from "@screens/Calendar";
import Concierge from "@screens/Concierge";
import Invest from "@screens/Invest";
import Community from "@screens/Community";

// ---------------------------------------------------------------- //

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
          paddingVertical: 5,
          backgroundColor: '#000',
        },
      }}

    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel({ focused, color }) {
            return <Text style={focused ? { color: '#fff' } : { color: color }}>Home</Text>
          },
          tabBarLabelStyle: { fontSize: 12, color: "#fff" },
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? <Ionicons color={'#fff'} name="home-outline" size={30} /> : <Ionicons color={color} name="home-outline" size={30} />
          },
        }}
        component={Home} />

      <Tab.Screen
        name="Calendar"
        options={{
          tabBarLabel({ focused, color }) {
            return <Text style={focused ? { color: '#fff' } : { color: color }}>Calendar</Text>
          },
          tabBarLabelStyle: { fontSize: 12, color: "#fff" },
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? <Feather color={'#fff'} name="calendar" size={30} /> : <Feather color={color} name="calendar" size={30} />
          },
        }}
        component={Calendar} />

      <Tab.Screen
        name="Concierge"
        options={{
          tabBarLabel({ focused, color }) {
            return <Text style={focused ? { color: '#fff' } : { color: color }}>Concierge</Text>
          },
          tabBarLabelStyle: { fontSize: 12, color: "#fff" },
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? <Feather color={'#fff'} name="message-square" size={30} /> : <Feather color={color} name="message-square" size={30} />
          },
        }}
        component={Concierge} />

      <Tab.Screen
        name="Invest"
        options={{
          tabBarLabel({ focused, color }) {
            return <Text style={focused ? { color: '#fff' } : { color: color }}>Invest</Text>
          },
          tabBarLabelStyle: { fontSize: 12, color: "#fff" },
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? <MaterialCommunityIcons color={'#fff'} name="lightning-bolt-outline" size={30} /> : <MaterialCommunityIcons color={color} name="lightning-bolt-outline" size={30} />
          },
        }}
        component={Invest} />

      <Tab.Screen
        name="Community"
        options={{
          tabBarLabel({ focused, color }) {
            return <Text style={focused ? { color: '#fff' } : { color: color }}>Community</Text>
          },
          tabBarLabelStyle: { fontSize: 12, color: "#fff" },
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? <Feather color={'#fff'} name="users" size={30} /> : <Feather color={color} name="users" size={30} />
          },
        }}
        component={Community} />
    </Tab.Navigator>
  );
};

// ---------------------------------------------------------------- //

export default (props: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Login'}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomBar" component={BottomBar} />
    </Stack.Navigator>
  );
}