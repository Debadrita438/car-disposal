import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {storage} from '../../utils/Storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    // Simulate an async action like fetching data
    const timeout = setTimeout(() => {
      // Navigate to the main screen after 3 seconds
      if (storage.contains('token')) {
        navigation.replace('AppScreen');
      } else {
        navigation.replace('IntroScreen'); // or your main app screen
      }
    }, 3000);

    return () => clearTimeout(timeout); // Clean up the timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/splashScreen.png')}
        style={styles.logo}
        resizeMode="stretch"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Add your background color here
  },
  logo: {
    width: '100%',
    height: '100%', // Adjust the size of your logo
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
