import React, { useEffect } from "react";
// navigation
import { NavigationContainer } from "@react-navigation/native";
// icon
import FontAwesome from "@expo/vector-icons/FontAwesome";
// font
import { useFonts } from 'expo-font';
// splash screen
import * as SplashScreen from "expo-splash-screen";
// context
import { AuthProvider } from "../contexts/AuthContext";
// main navigation
import MainNavigator from "./MainNavigator";

// ---------------------------------------------------------------- //

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    'nunito': require('@assets/fonts/Nunito/Nunito-Regular.ttf'),
    'nunito-md': require('@assets/fonts/Nunito/Nunito-Medium.ttf'),
    'nunito-sb': require('@assets/fonts/Nunito/Nunito-SemiBold.ttf'),
    'nunito-b': require('@assets/fonts/Nunito/Nunito-Bold.ttf'),
    'manrope': require('@assets/fonts/Manrope/Manrope-Regular.ttf'),
    'manrope-md': require('@assets/fonts/Manrope/Manrope-Medium.ttf'),
    'manrope-sb': require('@assets/fonts/Manrope/Manrope-SemiBold.ttf'),
    'manrope-b': require('@assets/fonts/Nunito/Nunito-Bold.ttf'),
    ...FontAwesome.font
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  if (!loaded) return null;

  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default RootLayout;