import * as actions from '../user/userSlice';
import { setToStorage, tokenKey } from 'utils';
import * as authService from 'services/authService';

export const loginUser = async (userData, dispatch) => {
  dispatch(actions.loginStart());

  try {
    const { data } = await authService.login(userData);
    setToStorage(tokenKey, data.details);
    data.role === 'admin' && dispatch(actions.loginSuccess(data.details));
  } catch (err) {
    dispatch(actions.loginFailure());
    console.log(err.response);
  }
};

export const registerUser = async (userData, dispatch) => {
  dispatch(actions.registerUserStart());

  try {
    const {
      data: { details },
    } = await authService.register(userData);
    dispatch(actions.registerUserSuccess(details));
  } catch (err) {
    dispatch(actions.registerUserFailure());
    console.log(err.response);
  }
};
