import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiStatus, IOtpProps, IForgotPassEmailVerifyState} from '../Type';
import {axiosInstance} from '../axiosInstance';
import Constants from '../../utils/Constants';
import {displayToast} from '../../utils/DisplayToast';

const initialState: IForgotPassEmailVerifyState = {
  status: ApiStatus.idle,
  verifyEmailRes: {},
};

export const forgotPasswordVerifyEmail = createAsyncThunk(
  'forgotPasswordEmailVerifySlice/forgotPasswordVerifyEmail',
  async (options: IOtpProps) => {
    try {
      const response = await axiosInstance.post(
        Constants.forgotPassEmailVerify,
        options,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

const ForgotPasswordEmailVerifySlice = createSlice({
  name: 'forgotPasswordEmailVerifySlice',
  initialState,
  reducers: {
    resetForgotPassEmailVerify: state => {
      state.status = ApiStatus.idle;
      state.verifyEmailRes = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(forgotPasswordVerifyEmail.pending, state => {
        state.status = ApiStatus.loading;
      })
      .addCase(forgotPasswordVerifyEmail.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = ApiStatus.success;
          state.verifyEmailRes = action.payload.user;
          displayToast('Otp verified successfully.', 'success');
        } else {
          state.status = ApiStatus.failed;
          displayToast(action.payload.message, 'error');
        }
      })
      .addCase(forgotPasswordVerifyEmail.rejected, (state, action) => {
        state.status = ApiStatus.failed;
        if (action.error.message) {
          displayToast(action.error.message, 'error');
        } else {
          displayToast(
            'Something went wrong, please try again later.',
            'error',
          );
        }
      });
  },
});

// Action creators are generated for each case reducer function
export const {resetForgotPassEmailVerify} =
  ForgotPasswordEmailVerifySlice.actions;

export default ForgotPasswordEmailVerifySlice.reducer;
