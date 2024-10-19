import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors, Fonts} from '../../theme';
import AnimatedInput from '../AnimatedInput';
import {Location, Phone, PickLocation, User} from '../../assets';
import DropDownComponent from '../DropDownComponent';
import ButtonComponent from '../ButtonComponent';
import {IUserInfoProps} from '../types';

const UserInfoComponent: React.FC<IUserInfoProps> = props => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [carPickup, setCarPickup] = useState('');

  const fullNameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const zipCodeRef = useRef<TextInput>(null);
  const carPickupRef = useRef<TextInput>(null);

  const data = [
    {label: 'Item 1', value: '1', search: 'Item 1'},
    {label: 'Item 2', value: '2', search: 'Item 2'},
    {label: 'Item 3', value: '3', search: 'Item 3'},
    {label: 'Item 4', value: '4', search: 'Item 4'},
    {label: 'Item 5', value: '5', search: 'Item 5'},
    {label: 'Item 6', value: '6', search: 'Item 6'},
    {label: 'Item 7', value: '7', search: 'Item 7'},
    {label: 'Item 8', value: '8', search: 'Item 8'},
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.mainText}>Member Info</Text>
        <View style={styles.container}>
          <AnimatedInput
            ref={fullNameRef}
            value={fullName}
            onChange={setFullName}
            placeholder="Full Name"
            logo={<User />}
            onSubmitEditing={() => phoneRef.current?.focus()}
          />
          <AnimatedInput
            ref={phoneRef}
            value={phone}
            onChange={setPhone}
            keyboardType="number-pad"
            placeholder="Phone Number"
            logo={<Phone />}
            maxLength={10}
            onSubmitEditing={() => addressRef.current?.focus()}
          />
          <AnimatedInput
            ref={addressRef}
            value={address}
            onChange={setAddress}
            placeholder="Address"
            logo={<Location />}
            onSubmitEditing={() => cityRef.current?.focus()}
          />
          <AnimatedInput
            ref={cityRef}
            value={city}
            onChange={setCity}
            placeholder="City"
            logo={<Location />}
            onSubmitEditing={() => stateRef.current?.focus()}
          />
          <DropDownComponent
            label={'State'}
            dataList={data}
            onValue={setState}
            value={state}
            placeholder={'Select State'}
          />
          <AnimatedInput
            ref={zipCodeRef}
            value={zipCode}
            onChange={setZipCode}
            placeholder="Zip Code"
            logo={<Location />}
            keyboardType="number-pad"
            onSubmitEditing={() => carPickupRef.current?.focus()}
          />
          <AnimatedInput
            ref={carPickupRef}
            value={carPickup}
            onChange={setCarPickup}
            placeholder="Car Pickup Location"
            logo={<PickLocation />}
          />
        </View>
        <ButtonComponent
          text="Next"
          buttonPressed={props.onNext}
          extraStyle={{
            ...styles.buttonContainer,
            // opacity:
            //   changePasswordRes.status === ApiStatus.loading ? 0.5 : 1,
          }}
          isDisabled={false}
          loading={false}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserInfoComponent;

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  scrollView: {
    width: Dimensions.get('screen').width,
    backgroundColor: Colors.whiteColor,
  },
  mainText: {
    textAlign: 'center',
    marginVertical: 10,
    color: Colors.blackColor,
    fontFamily: Fonts.medium,
    fontSize: 22,
  },
  container: {
    width: '100%',
    paddingHorizontal: 16,
  },

  buttonContainer: {marginVertical: 20, width: '90%', alignSelf: 'center'},
});
