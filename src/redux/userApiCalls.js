import * as actions from './user';
import { deleteUser, getAllUsers } from 'services/userService';

export const fetchUsers = async (dispatch) => {
  dispatch(actions.getUserStart());

  try {
    const {
      data: { users },
    } = await getAllUsers();
    dispatch(actions.getUserSuccess(users));
  } catch (err) {
    dispatch(actions.getUserFailure());
    console.log(err);
  }
};

export const removeUser = async (userId, dispatch) => {
  dispatch(actions.deleteUserStart());

  try {
    await deleteUser(userId);
    dispatch(actions.deleteUserSuccess(userId));
  } catch (err) {
    dispatch(actions.deleteUserFailure());
    console.log(err);
  }
};
