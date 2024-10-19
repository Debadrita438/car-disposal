/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../theme';
import {ButtonComponent, OTPInputComponent} from '../../components';
import {Authentication} from '../../assets';
import {bold, regular} from '../../theme/Fonts';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {ApiStatus} from '../../redux/Type';
import {resetOtp, verifyOtp} from '../../redux/Auth/OtpSlice';
import {
  forgotPasswordVerifyEmail,
  resetForgotPassEmailVerify,
} from '../../redux/Auth/ForgotPassEmailVerifySlice';
import {displayToast} from '../../utils/DisplayToast';
import {resendOtp} from '../../redux/Auth/ResendOtpSlice';

const OtpScreen = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(60);

  const dispatch = useAppDispatch();

  const otpRes = useAppSelector(state => state.verifyOtp);
  const forgotPassEmailVerifyRes = useAppSelector(
    state => state.forgotPassEmailVerify,
  );
  const registrationRes = useAppSelector(state => state.registration);
  const forgetPassRes = useAppSelector(state => state.forgotPassword);
  const loginRes = useAppSelector(state => state.login);
  const resendOtpRes = useAppSelector(state => state.resendOtp);

  useEffect(() => {
    if (secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [secondsLeft]);

  useEffect(() => {
    if (
      otpRes.status === ApiStatus.success ||
      forgotPassEmailVerifyRes.status === ApiStatus.success
    ) {
      dispatch(resetForgotPassEmailVerify());
      if (otpRes.fromScreen !== '' && otpRes.fromScreen === 'ResetPassword') {
        navigation.navigate('NewPasswordScreen');
      } else {
        dispatch(resetOtp());
        setSecondsLeft(60);
        navigation.navigate('AppScreen');
      }
    }
  }, [otpRes.status, forgotPassEmailVerifyRes.status]);

  // Function to format time in MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;
  };

  const handleOtpComplete = (otp: string) => {
    setOtp(otp);
    let apiReqBody = {
      email:
        forgetPassRes.userDetails.email ||
        registrationRes.registartionDetails.email ||
        loginRes.loginDetails.email,
      otp,
    };

    if (otpRes.fromScreen !== '' && otpRes.fromScreen === 'ResetPassword') {
      dispatch(forgotPasswordVerifyEmail(apiReqBody));
    } else {
      dispatch(verifyOtp(apiReqBody));
    }
  };

  const handleResendOtp = () => {
    setSecondsLeft(60);
    let apiReqBody = {
      email:
        forgetPassRes.userDetails.email ||
        registrationRes.registartionDetails.email ||
        loginRes.loginDetails.email,
      type: otpRes.fromScreen === 'ResetPassword' ? 'forget' : 'register',
    };

    dispatch(resendOtp(apiReqBody));
  };

  const maskEmail = () => {
    const [localPart, domain] = otpRes.storedEmail.split('@');

    if (localPart.length <= 2) {
      return otpRes.storedEmail;
    }

    const obfuscatedLocal = `${localPart[0]}*****${
      localPart[localPart.length - 1]
    }`;
    return `${obfuscatedLocal}@${domain}`;
  };

  const verifyOtpHandler = () => {
    if (otp.trim().length === 0) {
      displayToast('Please enter the OTP.', 'error');
    } else {
      let apiReqBody = {
        email:
          forgetPassRes.userDetails.email ||
          registrationRes.registartionDetails.email ||
          loginRes.loginDetails.email,
        otp,
      };

      if (otpRes.fromScreen !== '' && otpRes.fromScreen === 'ResetPassword') {
        dispatch(forgotPasswordVerifyEmail(apiReqBody));
      } else {
        dispatch(verifyOtp(apiReqBody));
      }
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/loginBackground.png')}
      style={styles.imagebackground}
      resizeMode="stretch">
      <View style={styles.containerView}>
        <View style={styles.logoView}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
          />
        </View>
        <Text style={{...Fonts.headerText, ...styles.mt80}}>
          Enter verification Code
        </Text>
        <ScrollView contentContainerStyle={styles.container}>
          <Authentication style={{alignSelf: 'center'}} />
          <Text style={styles.decText}>
            Enter the Verification code sent to {'\n'}
            <Text style={styles.semiBoldText}>{maskEmail()}</Text>
          </Text>
          <OTPInputComponent
            otpLength={5} // you can change the length here
            onOtpComplete={handleOtpComplete}
            onResend={handleResendOtp}
            isResendOtpDisabled={
              secondsLeft > 0 || resendOtpRes.status === ApiStatus.loading
            }
          />
          {secondsLeft > 0 && (
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.decText}>{formatTime(secondsLeft)}</Text>
            </View>
          )}
          <ButtonComponent
            text="Verify"
            buttonPressed={verifyOtpHandler}
            extraStyle={{
              ...styles.mt30,
              opacity:
                secondsLeft > 0 ||
                otpRes.status === ApiStatus.loading ||
                forgotPassEmailVerifyRes.status === ApiStatus.loading ||
                otp.length === 0
                  ? 0.5
                  : 1,
            }}
            isDisabled={
              secondsLeft > 0 ||
              otpRes.status === ApiStatus.loading ||
              forgotPassEmailVerifyRes.status === ApiStatus.loading ||
              otp.length === 0
            }
            loading={
              otpRes.status === ApiStatus.loading ||
              forgotPassEmailVerifyRes.status === ApiStatus.loading
            }
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
    width: Dimensions.get('screen').width,
    backgroundColor: Colors.whiteColor,
  },
  imagebackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  decText: {
    fontFamily: regular,
    fontSize: 14,
    color: Colors.appTextColor,
    textAlign: 'center',
  },
  semiBoldText: {
    fontFamily: bold,
  },
  containerView: {
    flex: 0.9,
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
    width: '120%',
    height: 53,
    backgroundColor: Colors.bottomViewColor,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 110,
    justifyContent: 'center',
  },
});
