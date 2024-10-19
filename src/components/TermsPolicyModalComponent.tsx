import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {ITermsPolicyProps} from './types';
import {Colors, Fonts} from '../theme';
import ButtonComponent from './ButtonComponent';

const TermsPolicyModalComponent: React.FC<ITermsPolicyProps> = props => {
  return (
    <ReactNativeModal isVisible={props.isVisible} style={styles.modalStyle}>
      <View style={styles.container}>
        <ScrollView style={styles.p20}>
          <Text style={styles.headerText}>{props.modalTitle}</Text>
          <Text style={styles.subText}>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </Text>
        </ScrollView>

        <ButtonComponent
          text="Close"
          buttonPressed={props.onClose}
          extraStyle={styles.buttonStyle}
          isDisabled={false}
          loading={false}
        />
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {margin: 0, justifyContent: 'flex-end'},
  container: {
    backgroundColor: Colors.whiteColor,
    height: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  p20: {padding: 20},
  headerText: {
    fontFamily: Fonts.bold,
    color: Colors.blackColor,
    fontSize: 20,
  },
  subText: {
    fontFamily: Fonts.regular,
    color: Colors.blackColor,
    fontSize: 14,
  },
  buttonStyle: {
    marginVertical: 30,
    width: '90%',
    alignSelf: 'center',
  },
});

export default TermsPolicyModalComponent;
