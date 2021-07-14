import { put, takeEvery } from 'redux-saga/effects';
import { IExistUserData } from '../../../utils/interfaces';
import { urlNow } from '../../../utils/settings-file';
import { ACTIONS_ADMIN_DATA } from '../../constants';

function* getUsersAdmin(): any {
  try {
    const response = yield fetch(`${urlNow}users/get-all-users-admin`);
    const usersList = yield response.json() as IExistUserData[];

    yield put({
      type: ACTIONS_ADMIN_DATA.GET_USERS_SUCCESS_ADMIN,
      usersList,
    });
  } catch (error) {
    yield put({
      type: ACTIONS_ADMIN_DATA.GET_USERS_FAILURE_ADMIN,
      error: error.message,
    });
  }
}

export function* getUsersAdminSaga() {
  yield takeEvery(ACTIONS_ADMIN_DATA.GET_USERS_ADMIN, getUsersAdmin);
}
