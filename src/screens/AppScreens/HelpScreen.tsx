import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CollapsableTable from '../../components/CollapsableTable';
import {bold, semiBold} from '../../theme/Fonts';
import {Colors} from '../../theme';
import {Mail, Phone} from '../../assets';

const HelpScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <CollapsableTable>
          <Text style={styles.headerText}>Support</Text>
          <View style={styles.rowView}>
            <Phone />
            <Text style={styles.valueText}>(330) 283-1436</Text>
          </View>
          <View style={{...styles.rowView, borderBottomWidth: 0}}>
            <Mail />
            <Text style={styles.valueText}>Interstaterecoveries@gmail.com</Text>
          </View>
        </CollapsableTable>
      </View>
    </SafeAreaView>
  );
};

export default HelpScreen;

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
    marginTop: 16,
  },
  rowView: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1,
    marginTop: 10,
    paddingVertical: 10,
  },
  valueText: {
    fontFamily: semiBold,
    fontSize: 14,
    color: Colors.blackColor,
    marginLeft: 10,
  },
});
