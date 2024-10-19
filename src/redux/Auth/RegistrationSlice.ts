import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiStatus, IRegistrationProps, IRegistrationState} from '../Type';
import {axiosInstance} from '../axiosInstance';
import Constants from '../../utils/Constants';
import {displayToast} from '../../utils/DisplayToast';

const initialState: IRegistrationState = {
  status: ApiStatus.idle,
  registartionDetails: {},
};

export const userSignup = createAsyncThunk(
  'registrationSlice/userSignup',
  async (options: IRegistrationProps) => {
    try {
      const response = await axiosInstance.post(Constants.register, options);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

const RegistartionSlice = createSlice({
  name: 'registrationSlice',
  initialState,
  reducers: {
    resetRegistration: state => {
      state.status = ApiStatus.idle;
      state.registartionDetails = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userSignup.pending, state => {
        state.status = ApiStatus.loading;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = ApiStatus.success;
          state.registartionDetails = action.payload.user;
          displayToast('Otp has been sent to the email.', 'success');
        } else {
          state.status = ApiStatus.failed;
          displayToast(action.payload.message, 'error');
        }
      })
      .addCase(userSignup.rejected, (state, action) => {
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
export const {resetRegistration} = RegistartionSlice.actions;

export default RegistartionSlice.reducer;
