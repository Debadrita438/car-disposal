import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  ApiStatus,
  ICreateNewPasswordProps,
  ICreateNewPasswordState,
} from '../Type';
import {axiosInstance} from '../axiosInstance';
import Constants from '../../utils/Constants';
import {displayToast} from '../../utils/DisplayToast';

const initialState: ICreateNewPasswordState = {
  status: ApiStatus.idle,
};

export const createNewPassword = createAsyncThunk(
  'createNewPasswordSlice/createNewPassword',
  async (options: ICreateNewPasswordProps) => {
    try {
      const response = await axiosInstance.post(
        Constants.resetPassword,
        options,
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

const CreateNewPasswordSlice = createSlice({
  name: 'createNewPasswordSlice',
  initialState,
  reducers: {
    resetCreateNewPassword: state => {
      state.status = ApiStatus.idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewPassword.pending, state => {
        state.status = ApiStatus.loading;
      })
      .addCase(createNewPassword.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = ApiStatus.success;
          displayToast('Password has been updated successfully!', 'success');
        } else {
          state.status = ApiStatus.failed;
          displayToast(action.payload.message, 'error');
        }
      })
      .addCase(createNewPassword.rejected, (state, action) => {
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
export const {resetCreateNewPassword} = CreateNewPasswordSlice.actions;

export default CreateNewPasswordSlice.reducer;
