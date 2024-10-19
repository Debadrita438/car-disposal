import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  CheckIcon,
  FirstIntro,
  FourthIntro,
  RightArrow,
  SecondIntro,
  ThirdIntro,
} from '../../assets';
import {Colors, Fonts} from '../../theme';

const {width, height} = Dimensions.get('window');
const data = [
  {
    title: 'Schedule Vehicle Pick Up',
    description:
      'I would like to dispose of my car and need information on the process. Please provide details on the available options.',
    image: (
      <FirstIntro
        height={height / 1.5}
        width={width}
        style={{marginTop: -30}}
      />
    ),
  },
  {
    title: 'Vehicle Details',
    description:
      'Please share the key details of your vehicle. We need the Vehicle Identification Number (VIN), Year, Make, and Model to ensure everything is processed correctly and responsibly.',
    image: (
      <Image
        source={require('../../assets/images/intro2.png')}
        style={{width: '100%', height: '66%'}}
        resizeMode="contain"
      />
    ),
  },
  {
    title: 'Your Car will be Picked up in \n the Schedule Time',
    description:
      "Your car will be picked up at the scheduled time.\n Please ensure it's ready for Pick Up.",
    image: (
      <Image
        source={require('../../assets/images/intro3.png')}
        style={{width: '100%', height: '66%'}}
        resizeMode="contain"
      />
    ),
  },
  {
    title: 'Vehicle Has Been Picked Up',
    description:
      'Your car has been successfully Picked Up and Transported to a Secured Facility',
    image: (
      <FourthIntro
        height={height / 1.5}
        width={width}
        style={{marginTop: -30}}
      />
    ),
  },
];

const IntroScreen = ({navigation}) => {
  const scrollValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = scrollValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, 6.7 * (data.length - 1)],
  });

  const handleArrowPress = () => {
    if (currentIndex < data.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef?.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      // Navigate to the next screen when on the last index
      navigation.navigate('LoginScreen'); // Replace with your target screen
    }
  };

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollValue}}}],
          {useNativeDriver: false, listener: handleScroll},
        )}>
        {data.map((item, index) => (
          <View style={styles.card} key={index}>
            {item.image}
            <Text style={Fonts.infoHeaderText}>{item.title}</Text>
            <Text style={Fonts.infoDescText}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer} pointerEvents="none">
        {data.map((_, index) => (
          <View style={styles.indicator} key={index} />
        ))}
        <Animated.View
          style={[
            styles.activeIndicator,
            {position: 'absolute', transform: [{translateX}]},
          ]}
        />
      </View>
      <View
        style={[
          styles.bottomContainer,
          {
            justifyContent:
              currentIndex < data.length - 1 ? 'space-between' : 'flex-end',
          },
        ]}>
        {currentIndex < data.length - 1 && (
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.arrowButton,
            currentIndex === data.length - 1 && styles.leftArrow,
          ]}
          onPress={handleArrowPress}>
          {currentIndex < data.length - 1 ? <RightArrow /> : <CheckIcon />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  card: {
    width,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textColor,
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: Colors.textColor,
    marginTop: 10,
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 50,
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.inactiveDot,
    marginHorizontal: 5,
  },
  activeIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.baseColor,
    marginHorizontal: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  skipText: {
    fontSize: 16,
    color: Colors.textColor,
    fontFamily: Fonts.regular,
  },
  arrowButton: {
    backgroundColor: Colors.baseColor,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftArrow: {
    alignSelf: 'flex-start', // Align to the left when on the last index
  },
});

export default IntroScreen;
