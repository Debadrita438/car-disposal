import {resetChangePassword} from '../redux/App/ChangePasswordSlice';
import {resetUpdateProfile} from '../redux/App/EditAccount/EditProfileSlice';
import {resetUpdateProfileImage} from '../redux/App/EditAccount/UpdateProfileImageSlice';
import {resetLogout} from '../redux/App/LogoutSlice';
import {resetUserDetails} from '../redux/App/UserDetailsSlice';
import {AppDispatch} from '../redux/store';
import {storage} from './Storage';

export const handleLogout = (dispatch: AppDispatch, navigation: any) => {
  // Dispatch reset actions
  dispatch(resetLogout());
  dispatch(resetUserDetails());
  dispatch(resetChangePassword());
  dispatch(resetUpdateProfile());
  dispatch(resetUpdateProfileImage());

  // Delete storage items
  storage.delete('token');
  storage.delete('userId');
  storage.delete('remember');
  storage.delete('email');
  storage.delete('password');

  // Navigate to login screen
  navigation.replace('LoginScreen');
};
