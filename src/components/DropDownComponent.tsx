import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts} from '../theme';
import {Dropdown} from 'react-native-element-dropdown';
import {IDropDownProps} from './types';

const DropDownComponent: React.FC<IDropDownProps> = props => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.mb15}>
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholder}>{props.label}</Text>
      </View>
      <Dropdown
        style={styles.dropDownContainer}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={props.dataList}
        autoScroll
        search
        maxHeight={300}
        minHeight={100}
        labelField="label"
        valueField="value"
        searchField="search"
        placeholder={!isFocus ? '' : props.placeholder}
        searchPlaceholder="Search..."
        value={props.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          props.onValue(item.value);
          setIsFocus(false);
        }}
        fontFamily={Fonts.regular}
      />
    </View>
  );
};

export default DropDownComponent;

const styles = StyleSheet.create({
  mb15: {marginBottom: 15},
  placeholderContainer: {
    justifyContent: 'center',
  },
  placeholder: {
    fontFamily: Fonts.regular,
    backgroundColor: '#fff',
    color: Colors.appTextColor,
    fontSize: 14,
  },
  dropDownContainer: {
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 50,
    borderColor: Colors.textinputBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.blackColor,
  },
  selectedTextStyle: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.blackColor,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.blackColor,
    borderRadius: 10,
  },
});
