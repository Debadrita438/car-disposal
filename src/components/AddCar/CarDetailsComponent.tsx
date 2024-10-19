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
import ButtonComponent from '../ButtonComponent';
import {IUserInfoProps} from '../types';

const CarDetailsComponent: React.FC<IUserInfoProps> = props => {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [vin, setVin] = useState('');
  const [odoReading, setOdoReading] = useState('');
  const [moneyOwed, setMoneyOwed] = useState('');
  const [titleStatus, setTitleStatus] = useState('');
  const [keyVehicle, setKeyVehicle] = useState('');
  const [choices, setChoices] = useState('');
  const [dealershipKey, setDealershipKey] = useState('');
  const [details, setDetails] = useState('');

  const yearRef = useRef<TextInput>(null);
  const modelRef = useRef<TextInput>(null);
  const makeRef = useRef<TextInput>(null);
  const vinRef = useRef<TextInput>(null);
  const odoMeterRef = useRef<TextInput>(null);
  const moneyOwnedRef = useRef<TextInput>(null);
  const titleRef = useRef<TextInput>(null);
  const keyVehicleRef = useRef<TextInput>(null);
  const choicesRef = useRef<TextInput>(null);
  const seeDealshipRef = useRef<TextInput>(null);
  const detailsRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.mainText}>Car Details</Text>
        <View style={styles.container}>
          <AnimatedInput
            ref={yearRef}
            value={year}
            onChange={setYear}
            placeholder="Year"
            onSubmitEditing={() => makeRef.current?.focus()}
          />
          <AnimatedInput
            ref={makeRef}
            value={make}
            onChange={setMake}
            placeholder="Make"
            onSubmitEditing={() => modelRef.current?.focus()}
          />
          <AnimatedInput
            ref={modelRef}
            value={model}
            onChange={setModel}
            placeholder="Model"
            onSubmitEditing={() => vinRef.current?.focus()}
          />
          <AnimatedInput
            ref={vinRef}
            value={vin}
            onChange={setVin}
            placeholder="VIN #"
            onSubmitEditing={() => odoMeterRef.current?.focus()}
          />
          <AnimatedInput
            ref={odoMeterRef}
            value={odoReading}
            onChange={setOdoReading}
            placeholder="Odometer Reading"
            onSubmitEditing={() => moneyOwnedRef.current?.focus()}
            displayText={'Miles'}
          />
          <AnimatedInput
            ref={moneyOwnedRef}
            value={moneyOwed}
            onChange={setMoneyOwed}
            placeholder="Is money owed on vehicle"
            onSubmitEditing={() => titleRef.current?.focus()}
          />
          <AnimatedInput
            ref={titleRef}
            value={titleStatus}
            onChange={setTitleStatus}
            placeholder="Title Status"
            onSubmitEditing={() => keyVehicleRef.current?.focus()}
          />
          <AnimatedInput
            ref={keyVehicleRef}
            value={keyVehicle}
            onChange={setKeyVehicle}
            placeholder="Is there a key to vehicle"
            onSubmitEditing={() => choicesRef.current?.focus()}
          />
          <AnimatedInput
            ref={choicesRef}
            value={choices}
            onChange={setChoices}
            placeholder="Choices"
            onSubmitEditing={() => seeDealshipRef.current?.focus()}
          />
          <AnimatedInput
            ref={seeDealshipRef}
            value={dealershipKey}
            onChange={setDealershipKey}
            placeholder="Who do we see at dealership for key?"
            onSubmitEditing={() => detailsRef.current?.focus()}
          />
          <AnimatedInput
            ref={detailsRef}
            value={details}
            onChange={setDetails}
            placeholder="Aditional Details"
            multiline
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

export default CarDetailsComponent;

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
    fontFamily: Fonts.semiBold,
    fontSize: 22,
  },
  container: {
    width: '100%',
    paddingHorizontal: 16,
  },

  buttonContainer: {marginVertical: 20, width: '90%', alignSelf: 'center'},
});
