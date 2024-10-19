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
import {bold, regular} from '../../theme/Fonts';
import {Mail} from '../../assets';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {ApiStatus} from '../../redux/Type';
import {forgetPassword} from '../../redux/Auth/ForgetPasswordSlice';
import {storeEmail, storeFromScreen} from '../../redux/Auth/OtpSlice';
import {displayToast} from '../../utils/DisplayToast';

const ResetPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const dispatch = useAppDispatch();

  const forgetPassRes = useAppSelector(state => state.forgotPassword);

  useEffect(() => {
    if (forgetPassRes.status === ApiStatus.success) {
      dispatch(storeFromScreen('ResetPassword'));
      setEmail('');
      navigation.navigate('OtpScreen');
    }
  }, [forgetPassRes.status]);

  const resetPasswordHandler = () => {
    const mailFormat =
      /^(?!.*\+@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.trim().length === 0) {
      displayToast('Please enter your email.', 'error');
    } else if (!email.match(mailFormat)) {
      displayToast('Please enter valid email.', 'error');
    } else {
      let apiReqBody = {
        email,
      };

      dispatch(forgetPassword(apiReqBody));
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
        <Text style={styles.decText}>
          Enter the email associated with your account and we’ll send an
          verification code to reset your password
        </Text>
        <View style={styles.container}>
          <AnimatedInput
            value={email}
            onChange={setEmail}
            placeholder="Email"
            logo={<Mail />}
          />
          <ButtonComponent
            text="Verify"
            buttonPressed={resetPasswordHandler}
            extraStyle={{
              ...styles.mt30,
              opacity: forgetPassRes.status === ApiStatus.loading ? 0.5 : 1,
            }}
            isDisabled={forgetPassRes.status === ApiStatus.loading}
            loading={forgetPassRes.status === ApiStatus.loading}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default ResetPasswordScreen;

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
  decText: {
    width: '80%',
    fontFamily: regular,
    fontSize: 14,
    color: Colors.baseColor,
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
});
