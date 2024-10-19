import React, {useState} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {Colors} from '../theme';
import {Tick} from '../assets';

const AnimatedCheckbox = ({checked, onChange}) => {
  const scale = useSharedValue(1);

  const handlePress = () => {
    const newChecked = !checked;
    onChange(newChecked);
    scale.value = newChecked ? 1.1 : 1;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(scale.value)}],
    };
  });

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Animated.View style={[styles.checkbox, animatedStyle]}>
        {checked && <Tick height={15} width={15} />}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: Colors.grayTextColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkmark: {
    width: 15,
    height: 15,
    backgroundColor: Colors.baseColor,
  },
});

export default AnimatedCheckbox;
