import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiStatus, ILogoutState} from '../Type';
import {axiosInstance} from '../axiosInstance';
import Constants from '../../utils/Constants';
import {displayToast} from '../../utils/DisplayToast';

const initialState: ILogoutState = {
  status: ApiStatus.idle,
  needToLogout: false,
};

export const logout = createAsyncThunk('logoutSlice/logout', async () => {
  try {
    const response = await axiosInstance.post(Constants.logout);
    return response.data;
  } catch (err) {
    throw err;
  }
});

const LogoutSlice = createSlice({
  name: 'logoutSlice',
  initialState,
  reducers: {
    resetLogout: state => {
      state.status = ApiStatus.idle;
      state.needToLogout = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logout.pending, state => {
        state.status = ApiStatus.loading;
      })
      .addCase(logout.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = ApiStatus.success;
        } else {
          state.status = ApiStatus.failed;
          displayToast(action.payload.message, 'error');
        }
      })
      .addCase(logout.rejected, (state, action) => {
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
export const {resetLogout} = LogoutSlice.actions;

export default LogoutSlice.reducer;
