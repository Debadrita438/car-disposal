import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiStatus, IUpdateProfileProps, ILogoutState} from '../../Type';
import {axiosInstance} from '../../axiosInstance';
import Constants from '../../../utils/Constants';
import {displayToast} from '../../../utils/DisplayToast';

const initialState: ILogoutState = {
  status: ApiStatus.idle,
  needToLogout: false,
};

export const updateProfile = createAsyncThunk(
  'editProfileSlice/updateProfile',
  async (options: IUpdateProfileProps) => {
    try {
      const response = await axiosInstance.post(
        `${Constants.updateProfile}${options.userId}`,
        options.reqBody,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

const EditProfileSlice = createSlice({
  name: 'editProfileSlice',
  initialState,
  reducers: {
    resetUpdateProfile: state => {
      state.status = ApiStatus.idle;
      state.needToLogout = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateProfile.pending, state => {
        state.status = ApiStatus.loading;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = ApiStatus.success;
        if (action.payload.status === 200) {
          state.status = ApiStatus.success;
          displayToast('Profile updated successfully.', 'success');
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
      .addCase(updateProfile.rejected, (state, action) => {
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
export const {resetUpdateProfile} = EditProfileSlice.actions;

export default EditProfileSlice.reducer;
