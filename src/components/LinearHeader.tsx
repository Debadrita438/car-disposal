/* eslint-disable react-native/no-inline-styles */
import LinearGradient from 'react-native-linear-gradient';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../theme';
import {Back, UserIcon} from '../assets';
import {useAppSelector} from '../redux/store';

const LinearHeader = ({
  centerText = false,
  isBack = false,
  onPressBack = () => {},
  centerTextValue = '',
  onPressProfile = () => {},
}) => {
  const userDetailsRes = useAppSelector(state => state.userDetails);

  return (
    <LinearGradient
      colors={['#333C99', '#111433']}
      style={centerText ? styles.linearGradientCenter : styles.linearGradient}>
      {centerText ? (
        <View style={styles.w100}>
          <Text style={styles.boldText}>{centerTextValue}</Text>
          {isBack && (
            <Pressable style={styles.backView} onPress={onPressBack}>
              <Back fill={Colors.whiteColor} />
            </Pressable>
          )}
        </View>
      ) : (
        <>
          <Text style={styles.buttonText}>
            Hello!{'\n'}
            <Text style={styles.nameText}>
              {userDetailsRes.userDetails.name?.split(' ')[0]}
            </Text>
          </Text>
          <Pressable
            style={styles.profileImageContainer}
            onPress={onPressProfile}>
            {userDetailsRes.userDetails.image?.length > 0 ? (
              <Image
                source={{
                  uri: userDetailsRes.userDetails.image[0]?.thumbnil_url,
                }}
                style={{width: '100%', height: '100%'}}
              />
            ) : (
              <UserIcon height={40} width={40} />
            )}
          </Pressable>
        </>
      )}
    </LinearGradient>
  );
};

export default LinearHeader;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 0.21,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linearGradientCenter: {
    flex: 0.21,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    textAlign: 'auto',
    color: Colors.whiteColor,
  },
  nameText: {
    fontSize: 26,
    fontFamily: Fonts.semiBold,
    textAlign: 'auto',
    color: Colors.whiteColor,
  },
  boldText: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    textAlign: 'center',
    color: Colors.whiteColor,
  },
  w100: {width: '100%', paddingVertical: 10, justifyContent: 'center'},
  backView: {
    position: 'absolute',
    padding: 10,
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
