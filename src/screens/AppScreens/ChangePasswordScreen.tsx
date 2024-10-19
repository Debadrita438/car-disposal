/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ChangePassword, PadLock} from '../../assets';
import {Colors} from '../../theme';
import {AnimatedInput, ButtonComponent} from '../../components';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  changePassword,
  resetChangePassword,
} from '../../redux/App/ChangePasswordSlice';
import {ApiStatus} from '../../redux/Type';
import {displayToast} from '../../utils/DisplayToast';
import {handleLogout} from '../../utils/LogoutHandler';

const ChangePasswordScreen = ({navigation}) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confimPass, setConfimPass] = useState('');

  const oldPasswordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const userDetailsRes = useAppSelector(state => state.userDetails);
  const changePasswordRes = useAppSelector(state => state.changePassword);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (changePasswordRes.status === ApiStatus.success) {
      dispatch(resetChangePassword());
      navigation.goBack();
    } else if (
      changePasswordRes.status === ApiStatus.failed &&
      changePasswordRes.needToLogout
    ) {
      handleLogout(dispatch, navigation);
    }
  }, [changePasswordRes.status]);

  const changePasswordHandler = () => {
    if (oldPass.trim().length === 0) {
      displayToast('Please enter your old password.', 'error');
    } else if (newPass.trim().length === 0) {
      displayToast('Please enter new password.', 'error');
    } else if (confimPass.trim().length === 0) {
      displayToast('Please enter confirm password.', 'error');
    } else if (newPass !== confimPass) {
      displayToast(
        'Your new password and confirm password do not match.',
        'error',
      );
    } else {
      let apiReqBody = {
        id: userDetailsRes.userDetails.id.toString(),
        reqBody: {
          old_password: oldPass,
          password: newPass,
          password_confirmation: confimPass,
        },
      };

      dispatch(changePassword(apiReqBody));
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1}}
      pointerEvents={
        changePasswordRes.status === ApiStatus.loading ? 'none' : 'auto'
      }>
      <View style={styles.container}>
        <ChangePassword />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <ScrollView contentContainerStyle={styles.scrollviewContainer}>
            <AnimatedInput
              ref={oldPasswordRef}
              value={oldPass}
              onChange={setOldPass}
              placeholder="Old Password"
              logo={<PadLock />}
              secureTextEntry={true}
              onSubmitEditing={() => newPasswordRef.current?.focus()}
            />
            <AnimatedInput
              ref={newPasswordRef}
              value={newPass}
              onChange={setNewPass}
              placeholder="New Password"
              logo={<PadLock />}
              secureTextEntry={true}
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />
            <AnimatedInput
              ref={confirmPasswordRef}
              value={confimPass}
              onChange={setConfimPass}
              placeholder="Confirm Password"
              logo={<PadLock />}
              secureTextEntry={true}
              onSubmitEditing={() => newPasswordRef.current?.focus()}
            />

            <ButtonComponent
              text="Change Password"
              buttonPressed={changePasswordHandler}
              extraStyle={{
                ...styles.mt30,
                opacity:
                  changePasswordRes.status === ApiStatus.loading ? 0.5 : 1,
              }}
              isDisabled={changePasswordRes.status === ApiStatus.loading}
              loading={changePasswordRes.status === ApiStatus.loading}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollviewContainer: {
    padding: 20,
    paddingBottom: 0,
    width: Dimensions.get('screen').width,
    backgroundColor: Colors.whiteColor,
    alignSelf: 'center',
  },
  mt30: {marginTop: 30},
});
