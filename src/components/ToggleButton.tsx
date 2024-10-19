import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Colors } from '../theme';
import { regular } from '../theme/Fonts';

const ToggleButton = ({ index = 0, onPressBtn }) => {
  const [selected, setSelected] = useState(index === 0 ? 'User' : 'Member');

  const getBackgroundColor = (option: string) => {
    return selected === option ? '#E9EAFF' : '#FFFFFF';
  };

  const getBorderColor = (option: string) => {
    return selected === option ? '#E9EAFF' : '#D9DADC';
  };

  const getRoundBorderColor = (option: string) => {
    return selected === option ? Colors.baseColor : '#D9DADC';
  };

  const animatedScaleStyle = (option: string) => {
    return useAnimatedStyle(() => {
      return {
        transform: [
          {
            scale: withTiming(selected === option ? 1.2 : 1),
          },
        ],
      };
    });
  };

  return (
    <View style={styles.container}>
      {/* User Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: getBackgroundColor('User'), borderColor: getBorderColor('User') }]}
        onPress={() => { setSelected('User'), onPressBtn(0); }}
      >
        <Animated.View style={[styles.radioButtonOuter, animatedScaleStyle('User'), { borderColor: getRoundBorderColor('User') }]}>
          {selected === 'User' && <View style={styles.radioButtonInner} />}
        </Animated.View>
        <Text style={styles.text}>User</Text>
      </TouchableOpacity>

      {/* Member Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: getBackgroundColor('Member'), borderColor: getBorderColor('Member') }]}
        onPress={() => { setSelected('Member'), onPressBtn(1); }}
      >
        <Animated.View style={[styles.radioButtonOuter, animatedScaleStyle('Member'), { borderColor: getRoundBorderColor('Member') }]}>
          {selected === 'Member' && <View style={styles.radioButtonInner} />}
        </Animated.View>
        <Text style={styles.text}>Member</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  button: {
    width: '45%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: regular,
    color: Colors.appTextColor,
    lineHeight: 21,
  },
  radioButtonOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.baseColor,
  },
});

export default ToggleButton;
