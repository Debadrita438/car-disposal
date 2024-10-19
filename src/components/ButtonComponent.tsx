import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../theme';
import {regular} from '../theme/Fonts';
import {IButtonProps} from './types';

const ButtonComponent = ({
  text = '',
  buttonPressed,
  extraStyle = {},
  isDisabled,
  loading,
  loaderColor,
}: IButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, extraStyle]}
      onPress={buttonPressed}
      disabled={isDisabled}>
      {loading ? (
        <ActivityIndicator color={loaderColor ?? Colors.whiteColor} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: 55,
    backgroundColor: Colors.baseColor,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: regular,
    fontSize: 14,
    color: Colors.whiteColor,
  },
});
