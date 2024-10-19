import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, Fonts} from '../../theme';
import {AnimatedInput, ButtonComponent} from '../../components';
import {PadLock} from '../../assets';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {ApiStatus} from '../../redux/Type';
import {
  createNewPassword,
  resetCreateNewPassword,
} from '../../redux/Auth/CreateNewPasswordSlice';
import {resetForgetPassword} from '../../redux/Auth/ForgetPasswordSlice';
import {displayToast} from '../../utils/DisplayToast';
import {resetForgotPassEmailVerify} from '../../redux/Auth/ForgotPassEmailVerifySlice';
import {resetOtp} from '../../redux/Auth/OtpSlice';

const NewPasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const dispatch = useAppDispatch();

  const forgetPassRes = useAppSelector(
    state => state.forgotPassword.userDetails,
  );
  const createNewPassRes = useAppSelector(state => state.newPassword);
  const forgotPassEmailVerifyRes = useAppSelector(
    state => state.forgotPassEmailVerify,
  );

  useEffect(() => {
    if (createNewPassRes.status === ApiStatus.success) {
      setPassword('');
      setConfPassword('');
      dispatch(resetCreateNewPassword());
      dispatch(resetForgetPassword());
      dispatch(resetForgotPassEmailVerify());
      dispatch(resetOtp());
      navigation.navigate('LoginScreen');
    }
  }, [createNewPassRes.status]);

  const newPasswordHandler = () => {
    if (password.trim().length === 0) {
      displayToast('Please enter password.', 'error');
    } else if (confPassword.trim().length === 0) {
      displayToast('Please enter confirm password.', 'error');
    } else if (password !== confPassword) {
      displayToast('Your password and confirm password do not match.', 'error');
    } else {
      let apiReqBody = {
        email:
          (forgetPassRes.email as string) ||
          (forgotPassEmailVerifyRes.verifyEmailRes.email as string),
        password,
        confirm_password: confPassword,
      };

      dispatch(createNewPassword(apiReqBody));
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
        <Text style={{...Fonts.headerText, ...styles.mt80}}>New password</Text>
        <View style={styles.container}>
          <AnimatedInput
            value={password}
            onChange={setPassword}
            placeholder="Password"
            logo={<PadLock />}
            secureTextEntry={true}
          />
          <AnimatedInput
            value={confPassword}
            onChange={setConfPassword}
            placeholder="Confirm Password"
            logo={<PadLock />}
            secureTextEntry={true}
          />

          <ButtonComponent
            text="Verify"
            buttonPressed={newPasswordHandler}
            extraStyle={{
              ...styles.mt30,
              opacity: createNewPassRes.status === ApiStatus.loading ? 0.5 : 1,
            }}
            isDisabled={createNewPassRes.status === ApiStatus.loading}
            loading={createNewPassRes.status === ApiStatus.loading}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default NewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
    width: Dimensions.get('screen').width,
    backgroundColor: Colors.whiteColor,
    marginTop: 20,
  },
  imagebackground: {
    flex: 1,
    justifyContent: 'flex-end',
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
});
