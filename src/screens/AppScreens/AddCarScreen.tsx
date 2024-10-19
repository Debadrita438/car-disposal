import {View, SafeAreaView, StyleSheet, LayoutAnimation} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../theme';
import {
  CarDetailsComponent,
  HeaderTrackStatusComponent,
  UploadPhotoComponent,
  UserInfoComponent,
} from '../../components';

const AddCarScreen = () => {
  const [activeIndex, setActive] = useState(0);

  const setActiveIndex = (val: number) => {
    LayoutAnimation.easeInEaseOut();
    setActive(val);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderTrackStatusComponent activeIndex={activeIndex} />
        {activeIndex === 0 ? (
          <UserInfoComponent onNext={() => setActiveIndex(activeIndex + 1)} />
        ) : activeIndex === 1 ? (
          <CarDetailsComponent onNext={() => setActiveIndex(activeIndex + 1)} />
        ) : (
          <UploadPhotoComponent onNext={() => {}} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddCarScreen;

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});
