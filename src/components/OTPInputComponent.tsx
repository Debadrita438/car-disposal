import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {regular} from '../theme/Fonts';
import {Colors, Fonts} from '../theme';

const OTPInputComponent = ({
  otpLength = 5,
  onOtpComplete,
  onResend,
  isResendOtpDisabled,
}) => {
  const [otp, setOtp] = useState(Array(otpLength).fill(''));
  const inputs = useRef([]);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input box if text is entered and not at the end
    if (text && index < otpLength - 1) {
      inputs.current[index + 1].focus();
    }

    // Move back to previous input if text is removed
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }

    // Check if OTP is complete
    if (newOtp.every(digit => digit !== '')) {
      onOtpComplete(newOtp.join(''));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {otp.map((_, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => handleChangeText(text, index)}
            value={otp[index]}
            ref={ref => (inputs.current[index] = ref)}
          />
        ))}
      </View>
      <View style={styles.resendContainer}>
        <Text style={styles.otpText}>Didn’t you receive the OTP?</Text>
        <TouchableOpacity onPress={onResend} disabled={isResendOtpDisabled}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 5,
    backgroundColor: '#F5F5F5',
    color: Colors.blackColor,
    fontFamily: Fonts.medium,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  otpText: {
    fontFamily: regular,
    fontSize: 14,
    color: Colors.appTextColor,
  },
  resendText: {
    fontFamily: regular,
    fontSize: 14,
    color: Colors.redTextColor,
    marginLeft: 5,
  },
});

export default OTPInputComponent;
