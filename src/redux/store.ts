import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  ChangePasswordSlice,
  CreateNewPasswordSlice,
  EditProfileSlice,
  ForgetPasswordSlice,
  ForgotPassEmailVerifySlice,
  LoginSlice,
  LogoutSlice,
  OtpSlice,
  RegistrationSlice,
  ResendOtpSlice,
  UpdateProfileImageSlice,
  UserDetailsSlice,
} from '.';

export const store = configureStore({
  reducer: {
    registration: RegistrationSlice,
    verifyOtp: OtpSlice,
    login: LoginSlice,
    forgotPassword: ForgetPasswordSlice,
    newPassword: CreateNewPasswordSlice,
    forgotPassEmailVerify: ForgotPassEmailVerifySlice,
    resendOtp: ResendOtpSlice,
    logout: LogoutSlice,
    userDetails: UserDetailsSlice,
    updateProfile: EditProfileSlice,
    updateProfileImage: UpdateProfileImageSlice,
    changePassword: ChangePasswordSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
