import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiStatus, IUserDetailsProps, IUserDetailsState} from '../Type';
import {axiosInstance} from '../axiosInstance';
import Constants from '../../utils/Constants';
import {displayToast} from '../../utils/DisplayToast';

const initialState: IUserDetailsState = {
  status: ApiStatus.idle,
  userDetails: {},
  needToLogout: false,
};

export const fetchUserDetails = createAsyncThunk(
  'userDetailsSlice/fetchUserDetails',
  async (options: IUserDetailsProps) => {
    try {
      const response = await axiosInstance.get(
        `${Constants.userDetails}${options.id}`,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

const UserDetailsSlice = createSlice({
  name: 'userDetailsSlice',
  initialState,
  reducers: {
    resetUserDetails: state => {
      state.status = ApiStatus.idle;
      state.userDetails = {};
      state.needToLogout = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserDetails.pending, state => {
        state.status = ApiStatus.loading;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = ApiStatus.success;
        if (action.payload.status === 200) {
          state.status = ApiStatus.success;
          state.userDetails = action.payload.data;
        } else {
          state.status = ApiStatus.failed;
          if (action.payload.message) {
            displayToast(action.payload.message, 'error');
          } else {
            displayToast(
              'Something went wrong, please try again later.',
              'error',
            );
          }
        }
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = ApiStatus.failed;
        if (action.error.message) {
          if (action.error.message.includes('401')) {
            state.needToLogout = true;
          }
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
export const {resetUserDetails} = UserDetailsSlice.actions;

export default UserDetailsSlice.reducer;
