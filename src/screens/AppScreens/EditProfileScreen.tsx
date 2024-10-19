/* eslint-disable react-native/no-inline-styles */
import {
  View,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AnimatedInput,
  ButtonComponent,
  LinearHeader,
  LoaderComponent,
} from '../../components';
import {Colors} from '../../theme';
import {Mail, Phone, User, UserIcon} from '../../assets';
import {ApiStatus} from '../../redux/Type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  resetUpdateProfile,
  updateProfile,
} from '../../redux/App/EditAccount/EditProfileSlice';
import {
  fetchUserDetails,
  resetUserDetails,
} from '../../redux/App/UserDetailsSlice';
import {storage} from '../../utils/Storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  resetUpdateProfileImage,
  updateProfileImage,
} from '../../redux/App/EditAccount/UpdateProfileImageSlice';
import {displayToast} from '../../utils/DisplayToast';
import {handleLogout} from '../../utils/LogoutHandler';

const EditProfileScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [empid, setEmpid] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const empIdRef = useRef<TextInput>(null);
  const fullNameRef = useRef<TextInput>(null);
  const nameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const userDetailsRes = useAppSelector(state => state.userDetails);
  const editProfileRes = useAppSelector(state => state.updateProfile);
  const updateImageRes = useAppSelector(state => state.updateProfileImage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Object.keys(userDetailsRes.userDetails).length > 0) {
      setEmpid(userDetailsRes.userDetails.member_id ?? '');
      setFullName(userDetailsRes.userDetails.name ?? '');
      setEmail(userDetailsRes.userDetails.email ?? '');
      setPhone(userDetailsRes.userDetails.phone?.replace('+1', '') ?? '');
    }
  }, [userDetailsRes.userDetails]);

  useEffect(() => {
    if (editProfileRes.status === ApiStatus.success) {
      dispatch(resetUpdateProfile());
      dispatch(resetUserDetails());
      dispatch(fetchUserDetails({id: storage.getString('userId')!}));
      navigation.goBack();
    } else if (
      editProfileRes.status === ApiStatus.failed &&
      editProfileRes.needToLogout
    ) {
      handleLogout(dispatch, navigation);
    }

    if (updateImageRes.status === ApiStatus.success) {
      setSelectedImage('');
      dispatch(resetUpdateProfileImage());
      dispatch(fetchUserDetails({id: storage.getString('userId')!}));
    } else if (
      updateImageRes.status === ApiStatus.failed &&
      updateImageRes.needToLogout
    ) {
      handleLogout(dispatch, navigation);
    }
  }, [editProfileRes.status, updateImageRes.status]);

  const pickerHandler = () => {
    Alert.alert('Select image or document', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Choose from library', onPress: () => openLibrary()},
      {
        text: 'Take a photo',
        onPress: () => openCamera(),
      },
    ]);
  };

  const openLibrary = () => {
    const options: any = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 650,
      maxWidth: 650,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        displayToast('You cancelled the picker.', 'info');
      } else if (response.error) {
        displayToast(
          response.errorMessage ??
            'Something went wrong, please try again later.',
          'error',
        );
      } else {
        const imageUpload = new FormData();
        const imageUri = response?.uri || response?.assets[0]?.uri;
        const uploadUri =
          Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
        setSelectedImage(uploadUri);

        let obj = {
          name: response?.assets[0]?.fileName,
          uri: imageUri,
          type: response?.assets[0]?.type,
        };
        imageUpload.append('image', obj);

        let apiReqBody = {
          userId: userDetailsRes.userDetails.id.toString(),
          image: imageUpload,
        };

        dispatch(updateProfileImage(apiReqBody));
      }
    });
  };

  const openCamera = () => {
    const options: any = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 650,
      maxWidth: 650,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        displayToast('You cancelled the picker.', 'info');
      } else if (response.error) {
        displayToast(
          response.errorMessage ??
            'Something went wrong, please try again later.',
          'error',
        );
      } else {
        const imageUpload = new FormData();
        const imageUri = response?.uri || response?.assets[0]?.uri;
        const uploadUri =
          Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
        setSelectedImage(uploadUri);

        let obj = {
          name: response?.assets[0]?.fileName,
          uri: imageUri,
          type: response?.assets[0]?.type,
        };
        imageUpload.append('image', obj);

        let apiReqBody = {
          userId: userDetailsRes.userDetails.id.toString(),
          image: imageUpload,
        };

        dispatch(updateProfileImage(apiReqBody));
      }
    });
  };

  const editProfileHandler = () => {
    if (fullName.trim().length === 0) {
      displayToast('Please enter your full name.', 'error');
    } else if (phone.trim().length === 0) {
      displayToast('Please enter your phone number.', 'error');
    } else if (phone.length < 10) {
      displayToast('Phone number must be of length 10.', 'error');
    } else {
      let apiReqBody = {
        userId: userDetailsRes.userDetails.id.toString(),
        reqBody: {
          name: fullName,
          email,
          phone: `+1${phone}`,
          member_id: empid,
        },
      };

      dispatch(updateProfile(apiReqBody));
    }
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      pointerEvents={
        editProfileRes.status === ApiStatus.loading ||
        updateImageRes.status === ApiStatus.loading
          ? 'none'
          : 'auto'
      }>
      <LinearHeader
        centerText={true}
        centerTextValue="Edit Account"
        isBack={true}
        onPressBack={navigation.goBack}
      />
      <View style={styles.container}>
        <View style={styles.popupView}>
          {userDetailsRes.userDetails.image?.length > 0 || selectedImage ? (
            <Image
              source={{
                uri:
                  selectedImage !== ''
                    ? selectedImage
                    : userDetailsRes.userDetails.image[0]?.thumbnil_url,
              }}
              style={{width: '100%', height: '100%'}}
            />
          ) : (
            <UserIcon height={134} width={134} />
          )}
        </View>
        <ButtonComponent
          text="Change Picture"
          buttonPressed={pickerHandler}
          extraStyle={styles.changePictureContainer}
          isDisabled={false}
          loading={false}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {userDetailsRes.userDetails.member_id != null &&
              userDetailsRes.userDetails.member_id !== '' && (
                <AnimatedInput
                  ref={empIdRef}
                  value={empid}
                  onChange={setEmpid}
                  placeholder="Employee ID"
                  logo={<User />}
                  onSubmitEditing={() => fullNameRef.current?.focus()}
                  editable={false}
                />
              )}
            <AnimatedInput
              ref={nameRef}
              value={fullName}
              onChange={setFullName}
              placeholder="Full Name"
              keyboardType="default"
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
              onSubmitEditing={() => emailRef.current?.focus()}
            />
            <AnimatedInput
              ref={emailRef}
              value={email}
              onChange={setEmail}
              keyboardType="email-address"
              placeholder="Email"
              logo={<Mail />}
              editable={false}
            />

            <ButtonComponent
              text="Save Changes"
              buttonPressed={editProfileHandler}
              extraStyle={{
                ...styles.mt30,
                opacity: editProfileRes.status === ApiStatus.loading ? 0.5 : 1,
              }}
              isDisabled={editProfileRes.status === ApiStatus.loading}
              loading={editProfileRes.status === ApiStatus.loading}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {updateImageRes.status === ApiStatus.loading && <LoaderComponent />}
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: Colors.baseColor},
  container: {
    flex: 0.8,
    backgroundColor: Colors.whiteColor,
    alignItems: 'center',
  },
  popupView: {
    width: 134,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 134,
    borderRadius: 67,
    backgroundColor: Colors.whiteColor,
    top: -67,
    elevation: 4,
    borderColor: Colors.blackColor,
    borderWidth: 3,
    overflow: 'hidden',
  },
  changePictureContainer: {
    width: '42%',
    marginTop: 80,
    height: 38,
    backgroundColor: Colors.deepBlueColor,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContainer: {
    padding: 20,
    paddingBottom: 0,
    width: Dimensions.get('screen').width,
    backgroundColor: Colors.whiteColor,
  },
  mt30: {marginTop: 30},
});
