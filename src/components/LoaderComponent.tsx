import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../theme';

const LoaderComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.baseColor} size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoaderComponent;
