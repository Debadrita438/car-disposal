/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LinearHeader, LoaderComponent} from '../../components';
import {Colors} from '../../theme';
import {Bell, Mail, PadLock, Phone, UserIcon} from '../../assets';
import {bold, regular, semiBold} from '../../theme/Fonts';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {logout} from '../../redux/App/LogoutSlice';
import {ApiStatus} from '../../redux/Type';
import {handleLogout} from '../../utils/LogoutHandler';

const ProfileScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const dispatch = useAppDispatch();

  const logoutRes = useAppSelector(state => state.logout);
  const userDetailsRes = useAppSelector(state => state.userDetails);

  useEffect(() => {
    if (logoutRes.status === ApiStatus.success) {
      handleLogout(dispatch, navigation);
    } else if (
      logoutRes.status === ApiStatus.failed &&
      logoutRes.needToLogout
    ) {
      handleLogout(dispatch, navigation);
    }
  }, [logoutRes.status]);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const formatPhoneNumber = (value: string) => {
    if (value != null) {
      let num = value.replace('+1', '');
      let x = num.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,10})/);
      if (x != null) {
        num = !x[2]
          ? x[1]
          : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        return num;
      }
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: Colors.baseColor}}
      pointerEvents={logoutRes.status === ApiStatus.loading ? 'none' : 'auto'}>
      <LinearHeader
        centerText={true}
        centerTextValue="My Account"
        isBack={false}
      />
      <View style={styles.container}>
        <View style={styles.popupView}>
          {userDetailsRes.userDetails.image?.length > 0 ? (
            <Image
              source={{
                uri: userDetailsRes.userDetails.image[0]?.thumbnil_url,
              }}
              style={{width: '100%', height: '100%'}}
            />
          ) : (
            <UserIcon height={134} width={134} />
          )}
        </View>
        <Text style={styles.nameText}>{userDetailsRes.userDetails.name}</Text>
        <Text style={styles.emailText}>{userDetailsRes.userDetails.email}</Text>
        <View style={{width: '90%'}}>
          <View
            style={{
              ...styles.rowView,
              borderBottomWidth: 0,
              justifyContent: 'space-between',
            }}>
            <Text style={{...styles.headerText, marginTop: 0}}>
              Basic Information
            </Text>
            <Pressable onPress={() => navigation.navigate('EditProfileScreen')}>
              <Text style={styles.editText}>Edit</Text>
            </Pressable>
          </View>
          <View style={styles.rowView}>
            <Phone />
            <Text style={styles.valueText}>
              {formatPhoneNumber(userDetailsRes.userDetails.phone)}
            </Text>
          </View>
          <View style={{...styles.rowView, borderBottomWidth: 0}}>
            <Mail />
            <Text style={styles.valueText}>
              {userDetailsRes.userDetails.email}
            </Text>
          </View>
        </View>
        <Pressable
          style={styles.extraButton}
          onPress={() => navigation.navigate('ChangePasswordScreen')}>
          <PadLock />
          <Text style={styles.valueText}>Change Password</Text>
        </Pressable>
        <View style={styles.extraButton}>
          <Bell />
          <Text style={{...styles.valueText, width: '72%'}}>Notifications</Text>
          <Switch
            trackColor={{false: '#767577', true: Colors.baseColor}}
            thumbColor={isEnabled ? Colors.whiteColor : Colors.whiteColor}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Pressable style={styles.extraButton} onPress={logoutHandler}>
          <Text style={styles.valueText}>Logout</Text>
        </Pressable>
      </View>
      {logoutRes.status === ApiStatus.loading && <LoaderComponent />}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
  },
  popupView: {
    width: 134,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 134,
    borderRadius: 67,
    backgroundColor: Colors.whiteColor,
    top: -67,
    elevation: 4,
    borderColor: Colors.blackColor,
    borderWidth: 3,
    overflow: 'hidden',
  },
  nameText: {
    fontFamily: bold,
    fontSize: 22,
    color: Colors.blackColor,
    marginTop: 80,
  },
  editText: {
    fontFamily: bold,
    fontSize: 14,
    color: Colors.baseColor,
    lineHeight: 17,
  },
  emailText: {
    fontFamily: regular,
    fontSize: 14,
    color: Colors.blackColor,
  },
  headerText: {
    fontFamily: bold,
    fontSize: 18,
    color: Colors.blackColor,
    marginTop: 16,
  },
  rowView: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1,
    marginTop: 10,
    paddingVertical: 10,
  },
  valueText: {
    fontFamily: semiBold,
    fontSize: 14,
    color: Colors.blackColor,
    marginLeft: 10,
  },
  extraButton: {
    width: '90%',
    marginTop: 16,
    borderRadius: 5,
    borderColor: '#DADADA',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 12,
  },
});
