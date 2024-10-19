import React, {forwardRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  Text,
  Pressable,
} from 'react-native';
import {Colors, Fonts} from '../theme';

interface AnimatedInputProps extends TextInputProps {
  value: string;
  onChange: (text: string) => void;
  onSubmitEditing?: () => void;
  placeholder: string;
  multiline?: boolean;
  logo?: JSX.Element;
  secureTextEntry?: boolean;
  displayText?: string;
  onPressIcon?: () => void;
  editable?: boolean;
}

const AnimatedInput = forwardRef<any, AnimatedInputProps>(
  (
    {
      value,
      onChange,
      placeholder,
      onSubmitEditing,
      multiline = false,
      logo,
      secureTextEntry = false,
      displayText,
      onPressIcon,
      editable,
      ...props
    },
    ref,
  ) => {
    return (
      <View style={{marginBottom: 15}}>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholder}>{placeholder}</Text>
        </View>
        <View
          style={[
            styles.inputContainer,
            editable != null &&
              !editable && {backgroundColor: Colors.grayAddCarStatusColor},
          ]}>
          <TextInput
            ref={ref}
            style={[
              styles.input,
              multiline && {height: 100, textAlignVertical: 'top'},
            ]}
            onSubmitEditing={onSubmitEditing}
            secureTextEntry={secureTextEntry}
            onChangeText={onChange}
            multiline={multiline}
            value={value}
            editable={editable}
            {...props}
          />
          {logo && (
            <Pressable style={styles.logoContainer} onPress={onPressIcon}>
              {logo}
            </Pressable>
          )}
          {displayText && (
            <View style={styles.displayTextContainer}>
              <Text style={styles.displayTextStyle}>{displayText}</Text>
            </View>
          )}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 50,
    borderColor: Colors.textinputBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    // padding: 10, // Added padding for iOS to ensure visibility
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.appTextColor,
    paddingVertical: 5, // Adjust padding for iOS
  },
  placeholderContainer: {
    justifyContent: 'center',
  },
  placeholder: {
    fontFamily: Fonts.regular,
    backgroundColor: '#fff',
    color: Colors.appTextColor,
    fontSize: 14,
  },
  displayTextContainer: {
    minHeight: 40,
    padding: 10,
    backgroundColor: Colors.lightBlueColor,
    borderRadius: 9,
  },
  displayTextStyle: {
    fontFamily: Fonts.regular,
    color: Colors.blackColor,
    fontSize: 14,
  },
  logoContainer: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedInput;
