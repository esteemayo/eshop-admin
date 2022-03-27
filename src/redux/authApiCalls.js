import * as actions from './user';
import { login } from 'services/authService';

const tokenKey = 'jwtToken';

export const loginUser = async (userData, dispatch) => {
  dispatch(actions.loginStart());

  try {
    const { data } = await login(userData);
    localStorage.setItem(tokenKey, data.accessToken);
    dispatch(actions.loginSuccess(data.user));
  } catch (err) {
    dispatch(actions.loginFailure());
    console.log(err);
  }
};

export const logourUser = (dispatch) => {
  localStorage.removeItem(tokenKey);
  dispatch(actions.logout());
};
