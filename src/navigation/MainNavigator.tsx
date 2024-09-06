import React, { useEffect, useState, useRef } from "react";
import { Platform } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import HomeScreen from "@screens/HomeScreen";
import LoginScreen from "@screens/LoginScreen";
import ARKit from "@screens/ARkit";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const navigation = useNavigation<any>();

  return (
    <Stack.Navigator
      initialRouteName={'Login'}
    >
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ARKit'
        component={ARKit}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;