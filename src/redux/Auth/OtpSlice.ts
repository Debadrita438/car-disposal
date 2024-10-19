import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiStatus, IOtpProps, IOtpState} from '../Type';
import {axiosInstance} from '../axiosInstance';
import Constants from '../../utils/Constants';
import {displayToast} from '../../utils/DisplayToast';
import {storage} from '../../utils/Storage';

const initialState: IOtpState = {
  status: ApiStatus.idle,
  storedEmail: '',
  fromScreen: '',
  verifyOtpRes: {},
};

export const verifyOtp = createAsyncThunk(
  'otpSlice/verifyOtp',
  async (options: IOtpProps) => {
    try {
      const response = await axiosInstance.post(Constants.verifyOtp, options);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

const OtpSlice = createSlice({
  name: 'otpSlice',
  initialState,
  reducers: {
    resetOtp: state => {
      state.status = ApiStatus.idle;
      state.storedEmail = '';
      state.fromScreen = '';
      state.verifyOtpRes = {};
    },
    storeEmail: (state, action) => {
      state.storedEmail = action.payload;
    },
    storeFromScreen: (state, action) => {
      state.fromScreen = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(verifyOtp.pending, state => {
        state.status = ApiStatus.loading;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = ApiStatus.success;
          state.verifyOtpRes = action.payload.user;
          displayToast('Otp verified successfully.', 'success');
          storage.set('token', action.payload.access_token);
          storage.set('userId', action.payload.user.id.toString());
        } else {
          state.status = ApiStatus.failed;
          displayToast(action.payload.message, 'error');
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
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
export const {resetOtp, storeEmail, storeFromScreen} = OtpSlice.actions;

export default OtpSlice.reducer;
