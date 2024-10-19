import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts} from '../../theme';
import {RemovePhoto, UploadImage} from '../../assets';
import ButtonComponent from '../ButtonComponent';
import {IUserInfoProps} from '../types';

const UploadPhotoComponent: React.FC<IUserInfoProps> = props => {
  const [index, setIndex] = useState(0);
  const [imageList, setImageList] = useState<number[]>([]);

  const renderCarImage = ({item, index}) => {
    return (
      <View style={styles.imageContainer}>
        <View style={styles.carImageContainer}>
          <Text>Car Image</Text>
        </View>
        <Pressable
          style={styles.removeButtonContainer}
          onPress={() => {
            const newNumbers = imageList.slice(0, -1);
            setImageList(newNumbers); // Update state with the new array
          }}>
          <RemovePhoto />
          <Text style={styles.buttonTextStyle}>Remove Photo</Text>
        </Pressable>
      </View>
    );
  };

  const headerComponent = () => (
    <>
      <Text style={styles.mainText}>Upload Vehicle Photos and Vin Plate</Text>
      <Pressable
        style={styles.uploadImageContainer}
        onPress={() => {
          setIndex(pre => pre + 1);
          setImageList(pre => [...pre, index + 1]);
        }}>
        <UploadImage />
        <Text style={styles.uploadText}>Upload Vehicle Photos & Vin Plate</Text>
      </Pressable>
    </>
  );

  const footerComponent = () => (
    <ButtonComponent
      text="Submit Photos"
      buttonPressed={props.onNext}
      extraStyle={{
        ...styles.buttonContainer,
      }}
      isDisabled={false}
      loading={false}
    />
  );

  return (
    <FlatList
      data={imageList}
      renderItem={renderCarImage}
      ListHeaderComponent={headerComponent}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={footerComponent}
    />
  );
};

export default UploadPhotoComponent;

const styles = StyleSheet.create({
  mainText: {
    textAlign: 'center',
    marginVertical: 10,
    color: Colors.blackColor,
    fontFamily: Fonts.semiBold,
    fontSize: 22,
  },
  buttonContainer: {marginVertical: 20, width: '90%', alignSelf: 'center'},
  uploadImageContainer: {
    width: '100%',
    backgroundColor: Colors.lightBlueColor,
    height: 160,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.baseColor,
    borderStyle: 'dashed',
    marginBottom: 10,
  },
  uploadText: {
    fontFamily: Fonts.regular,
    color: Colors.baseColor,
    fontSize: 18,
  },
  imageContainer: {width: '50%', padding: 5, alignItems: 'center'},
  carImageContainer: {
    height: 150,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: Colors.grayRemovePhotoBorderColor,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    borderColor: Colors.grayRemovePhotoBorderColor,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    marginLeft: 10,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.grayTextColor,
  },
});
