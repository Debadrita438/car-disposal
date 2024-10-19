import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Fonts} from '../theme';

const TabButton = ({title, isActive, onPress}) => {
  const borderRadius = useSharedValue(isActive ? 50 : 25);

  const animatedStyle = useAnimatedStyle(() => ({
    borderRadius: withTiming(borderRadius.value, {duration: 300}),
    backgroundColor: isActive ? '#392F87' : '#fff',
    borderWidth: 1,
    borderColor: '#392F87',
  }));

  return (
    <TouchableOpacity onPress={onPress} style={{marginHorizontal: 5}}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <Text
          style={[styles.buttonText, {color: isActive ? '#fff' : '#392F87'}]}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const HorizontalScrollTabs = () => {
  const [activeTab, setActiveTab] = React.useState('All Cars');

  const tabs = ['All Cars', 'Schedule', 'Complete', 'Out For Pickup'];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        bounces={false}>
        {tabs.map(tab => (
          <TabButton
            key={tab}
            title={tab}
            isActive={activeTab === tab}
            onPress={() => setActiveTab(tab)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
  },
  scrollContainer: {
    // paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
});

export default HorizontalScrollTabs;
