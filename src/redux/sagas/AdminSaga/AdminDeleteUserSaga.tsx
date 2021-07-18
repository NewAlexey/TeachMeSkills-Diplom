import { put, takeEvery } from 'redux-saga/effects';
import { IDeletedUser } from '../../../utils/interfaces';
import { urlNow } from '../../../utils/settings-file';
import { ACTIONS_ADMIN_DATA } from '../../constants';
import { IAdminReducerAction } from '../../reducers';

function* deleteUserAdmin(action: IAdminReducerAction): any {
  const { idDeletedUser } = action;
  try {
    const serverResponse = yield fetch(`${urlNow}users/${idDeletedUser}`, {
      method: 'DELETE',
      mode: 'cors',
    });

    const responseJson = (yield serverResponse.json()) as IDeletedUser;
    const { information } = responseJson;
    const { usersList } = responseJson;

    yield put({
      type: ACTIONS_ADMIN_DATA.DELETE_USER_SUCCESS,
      information,
      usersList,
    });
  } catch (error) {
    yield put({
      type: ACTIONS_ADMIN_DATA.DELETE_USER_FAILURE,
      error: error.message,
    });
  }
}

export function* deleteUserAdminSaga() {
  yield takeEvery(ACTIONS_ADMIN_DATA.DELETE_USER, deleteUserAdmin);
}
