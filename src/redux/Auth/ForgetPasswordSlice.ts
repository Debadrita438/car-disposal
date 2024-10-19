import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiStatus, IForgetPasswordProps, IForgetPasswordState} from '../Type';
import {axiosInstance} from '../axiosInstance';
import Constants from '../../utils/Constants';
import {displayToast} from '../../utils/DisplayToast';

const initialState: IForgetPasswordState = {
  status: ApiStatus.idle,
  userDetails: {},
};

export const forgetPassword = createAsyncThunk(
  'forgetPasswordSlice/forgetPassword',
  async (options: IForgetPasswordProps) => {
    try {
      const response = await axiosInstance.post(
        Constants.forgetPassword,
        options,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

const ForgetPasswordSlice = createSlice({
  name: 'forgetPasswordSlice',
  initialState,
  reducers: {
    resetForgetPassword: state => {
      state.status = ApiStatus.idle;
      state.userDetails = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(forgetPassword.pending, state => {
        state.status = ApiStatus.loading;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = ApiStatus.success;
          state.userDetails = action.payload.user;
          displayToast('Otp has been sent to your email.', 'success');
        } else {
          state.status = ApiStatus.failed;
          displayToast(action.payload.message, 'error');
        }
      })
      .addCase(forgetPassword.rejected, (state, action) => {
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
export const {resetForgetPassword} = ForgetPasswordSlice.actions;

export default ForgetPasswordSlice.reducer;
