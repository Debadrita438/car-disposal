import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiStatus, ILoginState, ILoginProps} from '../Type';
import {axiosInstance} from '../axiosInstance';
import Constants from '../../utils/Constants';
import {storage} from '../../utils/Storage';
import {displayToast} from '../../utils/DisplayToast';

const initialState: ILoginState = {
  status: ApiStatus.idle,
  navigateTo: '',
  loginDetails: {},
};

export const userLogin = createAsyncThunk(
  'loginSlice/userLogin',
  async (options: ILoginProps, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(Constants.login, options);
      return response.data;
    } catch (error) {
      // Check if the error is a server-side error (axios specific)
      if (error.response) {
        const status = error.response.status;

        // Specifically check for 422 error
        if (status === 422) {
          return rejectWithValue(error.response.data); // This will be caught in the rejected case
        }
        // For other HTTP errors, also reject
        return rejectWithValue({
          message: error.response.data?.message || 'Something went wrong', // Fallback message if no message exists
          status: error.response.status,
        });
      } else {
        // If error is not from server response (e.g., network issues)
        return rejectWithValue({
          message: 'Network error, please try again',
        });
      }
    }
  },
);

const LoginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    resetLogin: state => {
      state.status = ApiStatus.idle;
      state.navigateTo = '';
      state.loginDetails = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, state => {
        state.status = ApiStatus.loading;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = ApiStatus.success;
          storage.set('token', action.payload.access_token);
          storage.set('userId', action.payload.user.id.toString());
        } else if (action.payload.status === 402) {
          state.status = ApiStatus.failed;
          displayToast(action.payload.message, 'error');
          state.navigateTo = 'Otp';
          state.loginDetails = action.payload.user;
        } else {
          state.status = ApiStatus.failed;
          displayToast(action.payload.message, 'error');
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = ApiStatus.failed;
        if (action.payload) {
          displayToast(action.payload.message, 'error');
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
export const {resetLogin} = LoginSlice.actions;

export default LoginSlice.reducer;
