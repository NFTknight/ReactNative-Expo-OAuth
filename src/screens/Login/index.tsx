import React, { useEffect, useState } from "react";
// react nativ & expo component
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from 'react-native-loading-spinner-overlay';
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from "expo-checkbox";
// auth
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/build/providers/Google";
// icon
import { Feather } from "@expo/vector-icons";
// context
import { useAuth } from "src/contexts/AuthContext";

// ---------------------------------------------------------------- //

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }: { navigation: any }) => {
  const { loggedInUser, setLoggedInUser } = useAuth();
  const [error, setError] = useState<unknown>(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidePassword, setHidePassword] = React.useState(true);

  const [authError, setAuthError] = React.useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_OAUTH_CLIENT_ID,
  })

  const getUserInfo = async (token: any) => {
    if (!token) return;
    try {
      setGoogleLoading(true);
      const response = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await response.json();
      console.log('Google-SignedIn User info: ', user);
      if (user) {
        setGoogleLoading(true);
        const userInfo = { email: user.email, name: user.name, avatar: user.picture, authType: 'google' };
        setLoggedInUser(userInfo);
        setGoogleLoading(false);
        navigation.navigate('BottomBar');
      }
    } catch (err) {
      console.error(err);
      setGoogleLoading(false);
    }
  }

  const handleSignInWithGoogle = async () => {
    try {
      setGoogleLoading(true);
      if (response?.type === 'success') {
        await getUserInfo(response.authentication?.accessToken);
        console.log("User info is saved:", response.authentication?.accessToken);
      }
    } catch (err) {
      console.log('error signing in with google', err);
    } finally {
      setGoogleLoading(false);
    }
  }

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const createErrorMsg = (error: any) => {
    let name = error.name;
    console.log('createErrorMsg- error.name: ', name);
    if (name === 'NotAuthorizedException') setAuthError('Incorrect username or password');
    if (name === 'UserNotFoundException') setAuthError('User not registered');
  };

  const handleCheckboxPress = async () => {
    setChecked(!checked);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={isLoading || googleLoading}
        size={0}
        overlayColor="rgba(0,0,0,0.4)"
        textStyle={{ color: 'white' }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.scrollViewContent}
        >
          <Text style={styles.header}>INX</Text>
          <Text style={styles.loginTitle}>Log in</Text>
          <Text style={styles.subTitle}>Enter your email and password to continue</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email / User Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#003f5c"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
          </View>
          <View style={[styles.inputWrapper, { marginTop: 16 }]}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                placeholderTextColor="#003f5c"
                value={password}
                secureTextEntry={hidePassword}
                onChangeText={(text) => setPassword(text)}
              />
              <Pressable
                onPress={() => setHidePassword(!hidePassword)}
                style={styles.eyeIcon}
              >
                {!hidePassword ? (
                  <Feather name="eye" size={20} />
                ) : (
                  <Feather name="eye-off" size={20} />
                )}
              </Pressable>
            </View>
            {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
            {!passwordError && authError && <Text style={styles.errorText}>{authError}</Text>}
          </View>
          <View style={styles.checkboxWrapper}>
            <View style={styles.rememberMeWrapper}>
              <Checkbox
                style={styles.checkbox}
                value={checked ? true : false}
                onValueChange={handleCheckboxPress}
                color={checked ? '#1E1445' : undefined}
              />
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>
            <Pressable onPress={() => { }}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>
          </View>

          <LinearGradient
            colors={['#8839ED', '#2F49ED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Pressable onPress={() => { }} style={styles.continueButton} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={styles.activityIndicator}
                />
              ) : <Text style={styles.continueButtonText}>Continue</Text>}
            </Pressable>
          </LinearGradient>

          <View style={styles.orSection}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.line} />
          </View>
          <Pressable onPress={() => promptAsync()} style={styles.googleButton} disabled={googleLoading}>
            {googleLoading ? (
              <ActivityIndicator
                size="small"
                color="blue"
                style={styles.activityIndicator}
              />
            ) :
              <View style={styles.flexRow}>
                <Image
                  source={require("@assets/icons/google.svg")}
                  style={styles.googleIcon}
                  contentFit="contain"
                />
                <Text style={styles.googleButtonText}>Continue With Google</Text>
              </View>
            }
          </Pressable>
          <Pressable onPress={() => { }} style={styles.appleButton}>
            <Image
              source={require("@assets/icons/apple.svg")}
              style={styles.appleIcon}
              contentFit="contain"
            />
            <Text style={styles.appleButtonText}>Continue With Apple</Text>
          </Pressable>
          <View style={styles.signUpWrapper}>
            <Text style={styles.noAccountText}>You don't have an account yet?</Text>
            <Pressable onPress={() => { }}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ---------------------------------------------------------------- //

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  scrollViewContent: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 30,
  },
  header: {
    alignSelf: 'center',
    fontSize: 48,
    color: '#1E1445',
    marginTop: 12,
  },
  loginTitle: {
    fontSize: 30,
    color: '#1E1445',
    marginTop: 36,
  },
  subTitle: {
    fontSize: 12,
    color: '#9B92BF',
    marginTop: 8,
  },
  inputWrapper: {
    flexDirection: 'column',
    marginTop: 32,
  },
  inputLabel: {
    fontSize: 12,
    color: '#1E1445',
  },
  textInput: {
    marginTop: 6,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 32,
    backgroundColor: '#F7F1FE',
    fontSize: 12,
    color: '#1E1445',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  textInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 25,
    zIndex: 10,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  rememberMeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  rememberMeText: {
    color: '#1E1445',
    fontSize: 12,
    marginLeft: 6,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: '#1E1445',
    textDecorationLine: 'underline',
  },
  gradientButton: {
    borderRadius: 16,
    marginTop: 32,
  },
  continueButton: {
    padding: 16,
  },
  activityIndicator: {
    alignSelf: 'center',
  },
  continueButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  orSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
    marginHorizontal: 16,
  },
  orText: {
    fontSize: 12,
    color: '#1E1445',
  },
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#9B92BF',
    marginBottom: 8,
  },
  flexRow: {
    flexDirection: 'row'
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8
  },
  googleButtonText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#1E1445',
  },
  appleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#9B92BF',
  },
  appleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  appleButtonText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#1E1445',
  },
  signUpWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  noAccountText: {
    fontSize: 12,
    color: '#1E1445',
    marginRight: 8
  },
  signUpText: {
    fontSize: 12,
    color: '#8839ED',
  }
});

// ---------------------------------------------------------------- //

export default Login;