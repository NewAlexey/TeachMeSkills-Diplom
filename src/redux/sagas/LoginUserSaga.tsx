import { put, takeEvery } from 'redux-saga/effects';
import { urlNow } from '../../utils/settings-file';

import { ACTIONS_LOGIN } from '../constants';
import { IUserLogin } from '../../utils/interfaces';
import { ILoginActionInterface } from '../reducers/LoginReducer';

function* loginSaga(action: ILoginActionInterface): any {
  const { existUserInfo } = action;
  try {
    const serverResponse = yield fetch(`${urlNow}login`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(existUserInfo),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = (yield serverResponse.json()) as IUserLogin;

    if (responseData.isAdminLogin) {
      const { isAdminLogin } = responseData;
      yield put({
        type: ACTIONS_LOGIN.ADMIN_LOGIN_SUCCESS,
        isAdminLogin,
      });
    } else if (responseData.userEmail) {
      const userData = { ...responseData };
      yield put({
        type: ACTIONS_LOGIN.USER_LOGIN_SUCCESS,
        userData,
      });
    } else {
      throw Error(`${responseData.loginInfoData}`);
    }
  } catch (error) {
    yield put({
      type: ACTIONS_LOGIN.APP_LOGIN_FAILURE,
      error: error.message,
    });
  }
}

export function* loginUserSaga() {
  yield takeEvery(ACTIONS_LOGIN.APP_LOGIN_EXIST_USER, loginSaga);
}
