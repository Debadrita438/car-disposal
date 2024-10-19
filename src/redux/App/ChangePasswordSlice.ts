import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiStatus, IChangePasswordProps, ILogoutState} from '../Type';
import {axiosInstance} from '../axiosInstance';
import Constants from '../../utils/Constants';
import {displayToast} from '../../utils/DisplayToast';

const initialState: ILogoutState = {
  status: ApiStatus.idle,
  needToLogout: false,
};

export const changePassword = createAsyncThunk(
  'changePasswordSlice/changePassword',
  async (options: IChangePasswordProps) => {
    try {
      const response = await axiosInstance.post(
        `${Constants.changePassword}${options.id}`,
        options.reqBody,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

const ChangePasswordSlice = createSlice({
  name: 'changePasswordSlice',
  initialState,
  reducers: {
    resetChangePassword: state => {
      state.status = ApiStatus.idle;
      state.needToLogout = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(changePassword.pending, state => {
        state.status = ApiStatus.loading;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = ApiStatus.success;
          displayToast('Password updated successfully', 'success');
        } else {
          state.status = ApiStatus.failed;
          displayToast(action.payload.message, 'error');
        }
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = ApiStatus.failed;
        if (action.error.message) {
          if (action.error.message.includes('401')) {
            state.needToLogout = true;
          }
          displayToast(action.error.message, 'error');
        } else {
          displayToast('Something went wrong, please try again later', 'error');
        }
      });
  },
});

// Action creators are generated for each case reducer function
export const {resetChangePassword} = ChangePasswordSlice.actions;

export default ChangePasswordSlice.reducer;
