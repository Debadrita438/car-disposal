/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Platform, UIManager, StyleSheet} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../theme';
import {IHeaderTrackStatusProps} from './types';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const status = ['Customer Info', 'Car Details', 'Car Photo'];
const activeColor = Colors.baseColor;

const HeaderTrackStatusComponent: React.FC<IHeaderTrackStatusProps> = props => {
  const marginLeft =
    (100 / (status.length - 1)) * props.activeIndex - 100 + '%';

  return (
    <View style={styles.container}>
      <View style={[styles.statusContainer, {width: '84%'}]}>
        <View style={styles.line}>
          <View style={[styles.activeLine, {marginLeft}]} />
        </View>
        {status.map((status, index) => (
          <View
            style={{
              ...styles.outerCircle,
              backgroundColor:
                index <= props.activeIndex
                  ? Colors.whiteColor
                  : Colors.grayAddCarStatusColor,
              borderWidth: index <= props.activeIndex ? 5 : 0,
            }}
            key={status}>
            <View
              style={[
                index <= props.activeIndex
                  ? {height: 8, width: 8}
                  : {height: 12, width: 12},
                {
                  backgroundColor:
                    index <= props.activeIndex
                      ? Colors.baseColor
                      : Colors.whiteColor,
                  borderRadius: 5,
                },
              ]}
            />
          </View>
        ))}
      </View>
      <View style={styles.labelContainer}>
        {status.map((status, index) => (
          <Text
            key={index}
            style={[
              {top: 25, marginLeft: index === 1 ? -20 : 0},
              styles.label,
            ]}>
            {status}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: 70,
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 70,
    justifyContent: 'space-between',
  },
  line: {
    height: 5,
    width: '100%',
    backgroundColor: Colors.grayAddCarStatusColor,
    position: 'absolute',
    borderRadius: 5,
    overflow: 'hidden',
  },
  activeLine: {
    height: '100%',
    width: '100%',
    backgroundColor: activeColor,
    borderRadius: 5,
  },
  outerCircle: {
    height: 25,
    width: 25,
    borderRadius: 13,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.baseColor,
  },
  labelContainer: {
    width: '94%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.blackColor,
  },
  prop: {
    marginBottom: 20,
    width: 100,
    textAlign: 'center',
  },
});

export default HeaderTrackStatusComponent;
