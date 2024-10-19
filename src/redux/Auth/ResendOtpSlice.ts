import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiStatus, IResendOtpProps, IResendOtpState} from '../Type';
import {axiosInstance} from '../axiosInstance';
import Constants from '../../utils/Constants';
import {displayToast} from '../../utils/DisplayToast';

const initialState: IResendOtpState = {
  status: ApiStatus.idle,
};

export const resendOtp = createAsyncThunk(
  'resendOtpSlice/resendOtp',
  async (options: IResendOtpProps) => {
    try {
      const response = await axiosInstance.post(Constants.resendOtp, options);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

const ResendOtpSlice = createSlice({
  name: 'resendOtpSlice',
  initialState,
  reducers: {
    resetResendOtp: state => {
      state.status = ApiStatus.idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(resendOtp.pending, state => {
        state.status = ApiStatus.loading;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = ApiStatus.success;
        } else {
          state.status = ApiStatus.failed;
          displayToast(action.payload.message, 'error');
        }
      })
      .addCase(resendOtp.rejected, (state, action) => {
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
export const {resetResendOtp} = ResendOtpSlice.actions;

export default ResendOtpSlice.reducer;
