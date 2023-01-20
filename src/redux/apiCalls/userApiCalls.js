import * as actions from '../user/userSlice';
import * as userService from 'services/userService';

export const fetchUsers = async (dispatch) => {
  dispatch(actions.getUserStart());

  try {
    const {
      data: { users },
    } = await userService.getAllUsers();
    dispatch(actions.getUserSuccess(users));
  } catch (err) {
    dispatch(actions.getUserFailure());
    console.log(err.response);
  }
};

export const removeUser = async (userId, dispatch) => {
  dispatch(actions.deleteUserStart());

  try {
    await userService.deleteUser(userId);
    dispatch(actions.deleteUserSuccess(userId));
  } catch (err) {
    dispatch(actions.deleteUserFailure());
    console.log(err.response);
  }
};
