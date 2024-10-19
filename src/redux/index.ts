import LoginSlice from './Auth/LoginSlice';
import ForgetPasswordSlice from './Auth/ForgetPasswordSlice';
import OtpSlice from './Auth/OtpSlice';
import RegistrationSlice from './Auth/RegistrationSlice';
import CreateNewPasswordSlice from './Auth/CreateNewPasswordSlice';
import ForgotPassEmailVerifySlice from './Auth/ForgotPassEmailVerifySlice';
import ResendOtpSlice from './Auth/ResendOtpSlice';

// App
import LogoutSlice from './App/LogoutSlice';
import UserDetailsSlice from './App/UserDetailsSlice';
import EditProfileSlice from './App/EditAccount/EditProfileSlice';
import UpdateProfileImageSlice from './App/EditAccount/UpdateProfileImageSlice';
import ChangePasswordSlice from './App/ChangePasswordSlice';

export {
  ForgetPasswordSlice,
  LoginSlice,
  OtpSlice,
  RegistrationSlice,
  CreateNewPasswordSlice,
  ForgotPassEmailVerifySlice,
  ResendOtpSlice,
  LogoutSlice,
  UserDetailsSlice,
  EditProfileSlice,
  UpdateProfileImageSlice,
  ChangePasswordSlice,
};
