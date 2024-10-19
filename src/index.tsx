/* eslint-disable react/no-unstable-nested-components */
// import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  IntroScreen,
  LoginScreen,
  NewPasswordScreen,
  OtpScreen,
  ResetPasswordScreen,
  SignUpScreen,
  SplashScreen,
} from './screens';

import {store} from './redux/store';
import {Provider} from 'react-redux';
import AppNavigation from './navigation/AppNavigation';
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  ToastConfig,
} from 'react-native-toast-message';
import {Colors} from './theme';
import {StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  const toastConfig: ToastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={[styles.toastStyle, {borderLeftColor: Colors.greenColor}]}
        text1NumberOfLines={0}
      />
    ),
    error: (props: any) => (
      <ErrorToast {...props} style={styles.toastStyle} text1NumberOfLines={0} />
    ),
    info: (props: any) => (
      <InfoToast
        {...props}
        style={[styles.toastStyle, {borderLeftColor: Colors.cyanColor}]}
        text1NumberOfLines={0}
      />
    ),
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="IntroScreen"
              component={IntroScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OtpScreen"
              component={OtpScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NewPasswordScreen"
              component={NewPasswordScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AppScreen"
              component={AppNavigation}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} />
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  toastStyle: {
    borderLeftColor: Colors.redColor,
    height: 'auto',
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
});

export default App;
