import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiStatus, IUpdateProfileImageProps, ILogoutState} from '../../Type';
import {axiosInstance2} from '../../axiosInstance';
import Constants from '../../../utils/Constants';
import {displayToast} from '../../../utils/DisplayToast';

const initialState: ILogoutState = {
  status: ApiStatus.idle,
  needToLogout: false,
};

export const updateProfileImage = createAsyncThunk(
  'updateProfileImageSlice/updateProfileImage',
  async (options: IUpdateProfileImageProps) => {
    try {
      const response = await axiosInstance2.post(
        `${Constants.updateProfileImage}${options.userId}`,
        options.image,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

const UpdateProfileImageSlice = createSlice({
  name: 'updateProfileImageSlice',
  initialState,
  reducers: {
    resetUpdateProfileImage: state => {
      state.status = ApiStatus.idle;
      state.needToLogout = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateProfileImage.pending, state => {
        state.status = ApiStatus.loading;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.status = ApiStatus.success;
        if (action.payload.status === 200) {
          state.status = ApiStatus.success;
          displayToast('Profile image updated successfully.', 'success');
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
      .addCase(updateProfileImage.rejected, (state, action) => {
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
export const {resetUpdateProfileImage} = UpdateProfileImageSlice.actions;

export default UpdateProfileImageSlice.reducer;
