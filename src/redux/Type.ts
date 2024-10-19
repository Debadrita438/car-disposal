export enum ApiStatus {
  idle,
  loading,
  success,
  failed,
}

export interface IRegistrationState {
  status: ApiStatus;
  registartionDetails: {[key: string]: any};
}

export interface IRegistrationProps {
  name: string;
  email: string;
  phone: string;
  member_id: string;
  password: string;
  confirm_password: string;
  user_type: string;
}

export interface IOtpState {
  status: ApiStatus;
  storedEmail: string;
  fromScreen: string;
  verifyOtpRes: {[key: string]: any};
}

export interface IOtpProps {
  email: string;
  otp: string;
}

export interface ILoginState {
  status: ApiStatus;
  navigateTo: string;
  loginDetails: {[key: string]: any};
}

export interface ILoginProps {
  email: string;
  password: string;
}

export interface IForgetPasswordState {
  status: ApiStatus;
  userDetails: {[key: string]: any};
}

export interface IForgetPasswordProps {
  email: string;
}

export interface ICreateNewPasswordState {
  status: ApiStatus;
}

export interface ICreateNewPasswordProps {
  email: string;
  password: string;
  confirm_password: string;
}

export interface IForgotPassEmailVerifyState {
  status: ApiStatus;
  verifyEmailRes: {[key: string]: any};
}

export interface IResendOtpState {
  status: ApiStatus;
}

export interface IResendOtpProps {
  email: string;
}

// App
export interface ILogoutState {
  status: ApiStatus;
  needToLogout: boolean;
}

export interface IUserDetailsState {
  status: ApiStatus;
  userDetails: {[key: string]: any};
  needToLogout: boolean;
}

export interface IUserDetailsProps {
  id: string;
}

export interface IUpdateProfileProps {
  userId: string;
  reqBody: {
    name: string;
    email: string;
    phone: string;
    member_id: string;
  };
}

export interface IUpdateProfileImageProps {
  userId: string;
  image: FormData;
}

export interface IChangePasswordProps {
  id: string;
  reqBody: {
    old_password: string;
    password: string;
    password_confirmation: string;
  };
}
