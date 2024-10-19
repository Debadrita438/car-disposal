import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {bold} from '../../theme/Fonts';
import {Colors} from '../../theme';
import {
  BoxComponent,
  FloatingButton,
  HorizontalScroll,
  HorizontalScrollTabs,
} from '../../components';

const CarListingScreen = () => {
  const headerComponent = () => (
    <View style={{width: '100%', paddingVertical: 10}}>
      <Text style={styles.headerText}>All Cars</Text>
    </View>
  );
  const footerComponent = () => <View style={{width: '100%', height: 100}} />;
  const renderSeparator = () => {
    return <View style={{height: 12}} />;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <HorizontalScrollTabs />
        <FlatList
          data={[1, 2, 4, 5, 6, 7, 8, 3, 9, 10]}
          renderItem={({item}) => <BoxComponent bgColor={Colors.greenColor} />}
          keyExtractor={item => item.toString()}
          ItemSeparatorComponent={renderSeparator}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={headerComponent}
          ListFooterComponent={footerComponent}
        />
      </View>
      <FloatingButton />
    </SafeAreaView>
  );
};

export default CarListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 16,
  },
  headerText: {
    fontFamily: bold,
    fontSize: 18,
    color: Colors.blackColor,
  },
});
