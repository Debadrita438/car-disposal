/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
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
  View,
} from 'react-native';
import {Colors, Fonts} from '../../theme';
import {
  AnimatedCheckbox,
  AnimatedInput,
  ButtonComponent,
  TermsPolicyModalComponent,
  ToggleButton,
} from '../../components';
import {CloseEye, Mail, OpenEye, PadLock, Phone, User} from '../../assets';
import {
  resetRegistration,
  userSignup,
} from '../../redux/Auth/RegistrationSlice';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {ApiStatus} from '../../redux/Type';
import {storeEmail} from '../../redux/Auth/OtpSlice';
import {TextInput} from 'react-native-gesture-handler';
import {displayToast} from '../../utils/DisplayToast';

const SignUpScreen = ({navigation}) => {
  const [empid, setEmpid] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [openTermsPolicy, setOpenTermsPolicy] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confPassVisible, setConfPassVisible] = useState(true);

  const empIdRef = useRef<TextInput>(null);
  const fullNameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confPasswordRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch();

  const registrationRes = useAppSelector(state => state.registration);

  useEffect(() => {
    if (registrationRes.status === ApiStatus.success) {
      navigation.navigate('OtpScreen');
    }
  }, [registrationRes.status]);

  const registrationHandler = () => {
    const mailFormat =
      /^(?!.*\+@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (fullName.trim().length === 0) {
      displayToast('Please enter your full name.', 'error');
    } else if (phone.trim().length === 0) {
      displayToast('Please enter your phone number.', 'error');
    } else if (phone.length < 10) {
      displayToast('Phone number must be of length 10.', 'error');
    } else if (email.trim().length === 0) {
      displayToast('Please enter your email.', 'error');
    } else if (!email.match(mailFormat)) {
      displayToast('Please enter valid email.', 'error');
    } else if (password.trim().length === 0) {
      displayToast('Please enter your password.', 'error');
    } else if (confirmPass.trim().length === 0) {
      displayToast('Please enter confirm password.', 'error');
    } else if (password !== confirmPass) {
      displayToast('Your password and confirm password do not match.', 'error');
    } else if (!isChecked) {
      displayToast('Please accept the terms and condition.', 'error');
    } else if (selectedItem === 1 && empid.trim().length === 0) {
      displayToast('Please enter your employee ID.', 'error');
    } else {
      dispatch(storeEmail(email));
      let apiReqBody = {
        name: fullName,
        email,
        phone: `+1${phone}`,
        member_id: empid,
        password,
        confirm_password: confirmPass,
        user_type: selectedItem === 0 ? 'user' : 'member',
      };
      dispatch(userSignup(apiReqBody));
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
        <Text style={{...Fonts.headerText, ...styles.mt80}}>Get Started</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <ScrollView contentContainerStyle={styles.container}>
            <ToggleButton
              index={selectedItem}
              onPressBtn={(index: number) => setSelectedItem(index)}
            />
            <View style={styles.innerContainer}>
              {selectedItem === 1 && (
                <AnimatedInput
                  ref={empIdRef}
                  value={empid}
                  onChange={setEmpid}
                  placeholder="Employee ID"
                  logo={<User />}
                  onSubmitEditing={() => fullNameRef.current?.focus()}
                />
              )}
              <AnimatedInput
                ref={fullNameRef}
                value={fullName}
                onChange={setFullName}
                placeholder="Full Name"
                logo={<User />}
                onSubmitEditing={() => phoneRef.current?.focus()}
              />
              <AnimatedInput
                ref={phoneRef}
                value={phone}
                onChange={setPhone}
                keyboardType="number-pad"
                placeholder="Phone Number"
                logo={<Phone />}
                maxLength={10}
                onSubmitEditing={() => emailRef.current?.focus()}
              />
              <AnimatedInput
                ref={emailRef}
                value={email}
                onChange={setEmail}
                keyboardType="email-address"
                placeholder="Email"
                logo={<Mail />}
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
              <AnimatedInput
                ref={passwordRef}
                value={password}
                onChange={setPassword}
                placeholder="Password"
                logo={
                  !passwordVisible ? (
                    <OpenEye fill={Colors.grayTextColor} />
                  ) : (
                    <CloseEye fill={Colors.grayTextColor} />
                  )
                }
                secureTextEntry={passwordVisible}
                onPressIcon={() => setPasswordVisible(!passwordVisible)}
                onSubmitEditing={() => confPasswordRef.current?.focus()}
              />
              <AnimatedInput
                ref={confPasswordRef}
                value={confirmPass}
                onChange={setConfirmPass}
                placeholder="Confirm Password"
                logo={
                  !confPassVisible ? (
                    <OpenEye fill={Colors.grayTextColor} />
                  ) : (
                    <CloseEye fill={Colors.grayTextColor} />
                  )
                }
                secureTextEntry={confPassVisible}
                onPressIcon={() => setConfPassVisible(!confPassVisible)}
              />
              <View style={styles.checkboxView}>
                <View style={styles.rememberMeView}>
                  <AnimatedCheckbox
                    checked={isChecked}
                    onChange={(e: any) => setIsChecked(e)}
                  />
                  <Text style={[Fonts.rememberText, styles.ml10]}>
                    I accept the{' '}
                    <Text
                      style={styles.redText}
                      onPress={() => setOpenTermsPolicy('terms')}>
                      Terms & Condition
                    </Text>{' '}
                    and{' '}
                    <Text
                      style={styles.redText}
                      onPress={() => setOpenTermsPolicy('policy')}>
                      Policy
                    </Text>
                  </Text>
                </View>
              </View>
              <ButtonComponent
                text="Sign Up"
                buttonPressed={registrationHandler}
                extraStyle={{
                  ...styles.mt30,
                  opacity:
                    registrationRes.status === ApiStatus.loading ? 0.5 : 1,
                }}
                isDisabled={registrationRes.status === ApiStatus.loading}
                loading={registrationRes.status === ApiStatus.loading}
              />
            </View>
            <Pressable
              style={styles.bottomView}
              onPress={() => navigation.goBack()}>
              <Text style={Fonts.bottomText}>
                Already have an account?{' '}
                <Text style={styles.redText}>Sign In</Text>
              </Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <TermsPolicyModalComponent
        isVisible={openTermsPolicy === 'terms' || openTermsPolicy === 'policy'}
        onClose={() => setOpenTermsPolicy('')}
        modalTitle={
          openTermsPolicy === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'
        }
      />
    </ImageBackground>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    backgroundColor: Colors.whiteColor,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  imagebackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerView: {
    flex: 0.88,
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
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 60,
  },
});
