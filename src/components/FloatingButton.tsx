import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../theme';
import {FloatingBtnIcon} from '../assets';
import {IFloatinButtonProps} from './types';

const FloatingButton: React.FC<IFloatinButtonProps> = props => {
  return (
    <Pressable style={styles.container} onPress={props.onPressAction}>
      <FloatingBtnIcon />
    </Pressable>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: 55,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    bottom: 60,
    right: 20,
    borderRadius: 28,
    elevation: 10,
    backgroundColor: Colors.baseColor,
  },
});
