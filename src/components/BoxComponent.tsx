import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../theme';
import { bold, regular, semiBold } from '../theme/Fonts';
import { Location } from '../assets';

const BoxComponent = ({ bgColor = Colors.whiteColor }) => {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.firstRow}>
        <Text style={styles.headerLeftText}>BMW X3</Text>
        <View style={{ ...styles.headerRightView, backgroundColor: bgColor }}>
          <Text style={styles.headerRightText}>booked-pickup schedule</Text>
        </View>
      </View>
      <View style={styles.imageView}>
        <Image style={styles.image} source={require('../assets/images/demoCar.jpg')} resizeMode='cover' />
      </View>
      <View style={{ ...styles.firstRow, justifyContent: 'flex-start', marginTop: 10 }}>
        <Location />
        <Text style={styles.addressText} numberOfLines={1}>33, rue Gouin de Beahsne, 91240 SINT</Text>
      </View>
    </View>
  );
};

export default BoxComponent;

const styles = StyleSheet.create({
  boxContainer: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    borderColor: '#E9E9E9',
    borderWidth: 1,
  },
  firstRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeftText: {
    fontFamily: bold,
    fontSize: 18,
    color: Colors.blackColor,
  },
  headerRightText: {
    fontFamily: regular,
    fontSize: 12,
    color: Colors.whiteColor,
  },
  headerRightView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageView: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  addressText: {
    fontFamily: semiBold,
    fontSize: 14,
    color: Colors.blackColor,
    marginLeft: 5,
    lineHeight: 20,
    maxWidth: '90%',
  }
});
