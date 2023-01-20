import * as actions from '../user/userSlice';
import * as authService from 'services/authService';

const tokenKey = 'jwtToken';

export const loginUser = async (userData, dispatch) => {
  dispatch(actions.loginStart());

  try {
    const { data } = await authService.login(userData);
    localStorage.setItem(tokenKey, data.accessToken);
    data.user.role === 'admin' && dispatch(actions.loginSuccess(data));
  } catch (err) {
    dispatch(actions.loginFailure());
    console.log(err.response);
  }
};

export const registerUser = async (userData, dispatch) => {
  dispatch(actions.registerUserStart());

  try {
    const {
      data: { user },
    } = await authService.register(userData);
    dispatch(actions.registerUserSuccess(user));
  } catch (err) {
    dispatch(actions.registerUserFailure());
    console.log(err.response);
  }
};
