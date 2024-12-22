/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../theme';
import {
  AnimatedCheckbox,
  AnimatedInput,
  ButtonComponent,
} from '../../components';
import {CloseEye, Mail, OpenEye, PadLock} from '../../assets';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {resetLogin, userLogin} from '../../redux/Auth/LoginSlice';
import {ApiStatus} from '../../redux/Type';
import {storage} from '../../utils/Storage';
import {displayToast} from '../../utils/DisplayToast';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef(null);
  const dispatch = useAppDispatch();

  const loginRes = useAppSelector(state => state.login);

  useLayoutEffect(() => {
    if (
      storage.contains('remember') &&
      storage.contains('email') &&
      storage.contains('password')
    ) {
      setIsChecked(true);
      setEmail(storage.getString('email')!);
      setPassword(storage.getString('password')!);
    }
  }, []);

  useEffect(() => {
    if (loginRes.status === ApiStatus.success) {
      setEmail('');
      setPassword('');
      // dispatch(resetLogin());
      navigation.replace('AppScreen');
    } else if (
      loginRes.status === ApiStatus.failed &&
      loginRes.navigateTo === 'Otp'
    ) {
      navigation.replace('OtpScreen');
    }
  }, [loginRes.status]);

  const loginHandler = () => {
    const mailFormat =
      /^(?!.*\+@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.trim().length === 0) {
      displayToast('Please enter your email.', 'error');
    } else if (!email.match(mailFormat)) {
      displayToast('Please enter valid email.', 'error');
    } else if (password.trim().length === 0) {
      displayToast('Please enter password.', 'error');
    } else {
      let apiReqBody = {
        email,
        password,
      };
      dispatch(userLogin(apiReqBody));
    }
  };

  const saveCredHandler = (e: boolean) => {
    setIsChecked(e);
    if (e) {
      storage.set('remember', true);
      storage.set('email', email);
      storage.set('password', password);
    } else {
      storage.delete('remember');
      storage.delete('email');
      storage.delete('password');
    }
  };

  // return (
  //   <ImageBackground
  //     source={require('../../assets/images/loginBackground.png')}
  //     style={styles.imagebackground}
  //     resizeMode="stretch">
  //     <View style={styles.containerView}>
  //       <View style={styles.logoView}>
  //         <Image
  //           source={require('../../assets/images/logo.png')}
  //           style={styles.logoImage}
  //         />
  //       </View>
  //       <Text style={{...Fonts.headerText, ...styles.mt80}}>
  //         Hello, Welcome Back
  //       </Text>
  //       <KeyboardAvoidingView
  //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  //         style={styles.keyboardAvoidingView}>
  //         <ScrollView contentContainerStyle={styles.container}>
  //           <AnimatedInput
  //             ref={emailRef}
  //             value={email}
  //             onChange={setEmail}
  //             placeholder="Email"
  //             keyboardType="email-address"
  //             logo={<Mail />}
  //             onSubmitEditing={() => passwordRef.current.focus()}
  //           />
  //           <AnimatedInput
  //             ref={passwordRef}
  //             value={password}
  //             onChange={setPassword}
  //             placeholder="Password"
  //             logo={
  //               !passwordVisible ? (
  //                 <OpenEye fill={Colors.grayTextColor} />
  //               ) : (
  //                 <CloseEye fill={Colors.grayTextColor} />
  //               )
  //             }
  //             secureTextEntry={passwordVisible}
  //             onPressIcon={() => setPasswordVisible(!passwordVisible)}
  //           />
  //           <View style={styles.checkboxView}>
  //             <View style={styles.rememberMeView}>
  //               <AnimatedCheckbox
  //                 checked={isChecked}
  //                 onChange={saveCredHandler}
  //               />
  //               <Text style={[Fonts.rememberText, styles.ml10]}>
  //                 Remember me
  //               </Text>
  //             </View>
  //             <Pressable
  //               onPress={() => navigation.navigate('ResetPasswordScreen')}>
  //               <Text style={[Fonts.rememberText, styles.redText]}>
  //                 Forgot Password?
  //               </Text>
  //             </Pressable>
  //           </View>
  //           <ButtonComponent
  //             text="Sign in"
  //             buttonPressed={loginHandler}
  //             extraStyle={{
  //               ...styles.mt30,
  //               opacity: loginRes.status === ApiStatus.loading ? 0.5 : 1,
  //             }}
  //             isDisabled={loginRes.status === ApiStatus.loading}
  //             loading={loginRes.status === ApiStatus.loading}
  //           />
  //         </ScrollView>
  //       </KeyboardAvoidingView>
  //     </View>
  //     <Pressable
  //       style={styles.bottomView}
  //       onPress={() => navigation.navigate('SignUpScreen')}>
  //       <Text style={Fonts.bottomText}>
  //         Don't You have any account?{' '}
  //         <Text style={styles.redText}>Sign up</Text>
  //       </Text>
  //     </Pressable>
  //   </ImageBackground>
  // );

  return (
    <Pressable onPress={() => navigation.navigate('ResetPasswordScreen')}>
      <Text style={[Fonts.rememberText, styles.redText]}>Forgot Password?</Text>
    </Pressable>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
    width: Dimensions.get('screen').width,
    backgroundColor: Colors.whiteColor,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  imagebackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerView: {
    flex: 0.8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 100,
    alignItems: 'center',
  },
  logoView: {
    position: 'absolute',
    zIndex: 0,
    top: -45,
    alignSelf: 'center',
  },
  logoImage: {
    height: 135,
    width: 128,
  },
  mt80: {
    marginTop: 80,
  },
  mt30: {marginTop: 30},
  ml10: {marginLeft: 10},
  checkboxView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rememberMeView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  redText: {
    color: Colors.redTextColor,
  },
  bottomView: {
    width: '100%',
    height: 53,
    backgroundColor: Colors.bottomViewColor,
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: 110,
    justifyContent: 'center',
  },
});
