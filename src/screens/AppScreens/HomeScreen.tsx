import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  BoxComponent,
  FloatingButton,
  HorizontalScroll,
  LinearHeader,
  LoaderComponent,
} from '../../components';
import {Colors} from '../../theme';
import {bold, regular, semiBold} from '../../theme/Fonts';
import {Calendar} from '../../assets';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {fetchUserDetails} from '../../redux/App/UserDetailsSlice';
import {ApiStatus} from '../../redux/Type';
import {storage} from '../../utils/Storage';
import moment from 'moment';
import {logout} from '../../redux/App/LogoutSlice';
import {handleLogout} from '../../utils/LogoutHandler';

const HomeScreen = ({navigation}) => {
  const dispatch = useAppDispatch();

  const userDetailsRes = useAppSelector(state => state.userDetails);

  useEffect(() => {
    if (
      userDetailsRes.status === ApiStatus.idle &&
      storage.contains('userId')
    ) {
      dispatch(fetchUserDetails({id: storage.getString('userId')!}));
    }

    if (
      userDetailsRes.status === ApiStatus.failed &&
      userDetailsRes.needToLogout
    ) {
      handleLogout(dispatch, navigation);
    }
  }, [userDetailsRes.status]);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#333C99'}}
      pointerEvents={
        userDetailsRes.status === ApiStatus.loading ? 'none' : 'auto'
      }>
      <LinearHeader onPressProfile={() => navigation.navigate('Profile')} />
      <View style={styles.container}>
        <View style={styles.popupView}>
          <View style={styles.summaryView}>
            <Text style={styles.summeryText}>Summary</Text>
            <View style={styles.calenderView}>
              <Calendar />
              <Text style={styles.dateText}>
                {moment().format('DD MMM, YY')}
              </Text>
            </View>
          </View>
          <View style={styles.valueContainer}>
            {[1, 2, 3].map((item, index) => {
              return (
                <View style={styles.boxContainer} key={index}>
                  <Text style={styles.boxItemNumber}>{item}</Text>
                  <Text style={styles.boxItemText}>Cars</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.mt50}>{/* <HorizontalScroll /> */}</View>
        <View style={styles.centerContainer}>
          <ScrollView>
            <View style={styles.headerRow}>
              <Text style={styles.summeryText}>Current Cars</Text>
              <Text style={styles.viewAllText}>View all</Text>
            </View>
            <View style={styles.boxView}>
              <BoxComponent bgColor={Colors.baseColor} />
            </View>

            <View style={styles.headerRow}>
              <Text style={styles.summeryText}>Past History</Text>
              <Text style={styles.viewAllText}>View all</Text>
            </View>
            <View style={styles.boxView}>
              <BoxComponent bgColor={Colors.baseColor} />
            </View>
            <View style={styles.boxView}>
              <BoxComponent bgColor={Colors.baseColor} />
            </View>
          </ScrollView>
        </View>
        <FloatingButton
          onPressAction={() => navigation.navigate('AddCarScreen')}
        />
      </View>
      {userDetailsRes.status === ApiStatus.loading && <LoaderComponent />}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    backgroundColor: '#F8F8F8',
  },
  popupView: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    height: 130,
    borderRadius: 10,
    backgroundColor: Colors.whiteColor,
    top: -90,
    padding: 12,
    elevation: 4,
  },
  summaryView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summeryText: {
    fontFamily: bold,
    fontSize: 18,
    color: Colors.blackColor,
  },
  calenderView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D2DAEF',
    borderRadius: 20,
  },
  dateText: {
    fontFamily: regular,
    fontSize: 12,
    color: Colors.baseColor,
    marginLeft: 5,
    lineHeight: 18,
  },
  boxItemNumber: {
    fontFamily: semiBold,
    fontSize: 24,
    color: Colors.baseColor,
  },
  boxItemText: {
    fontFamily: regular,
    fontSize: 12,
    color: Colors.blackColor,
  },
  viewAllText: {
    fontFamily: regular,
    fontSize: 14,
    color: Colors.blackColor,
  },
  boxContainer: {
    width: '30%',
    height: '100%',
    borderRadius: 5,
    borderColor: '#E6E6E6',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '60%',
  },
  headerRow: {
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxView: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  mt50: {marginTop: 50},
  centerContainer: {flex: 0.9, paddingBottom: 0, paddingTop: 10},
});
