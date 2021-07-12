import { put, takeEvery } from 'redux-saga/effects';
import { urlNow } from '../../utils/settings-file';

import { ACTIONS_LOGIN } from '../constants';
import { IResponseCreateNewUser } from '../../utils/interfaces';
import { ILoginActionInterface } from '../reducers/LoginReducer';

function* registrationSaga(action: ILoginActionInterface): any {
  const { newUserInfo } = action;
  try {
    const responseServer = yield fetch(`${urlNow}login/create-new-user`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(newUserInfo),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = (yield responseServer.json()) as IResponseCreateNewUser;
    const { message } = responseData;
    if (message) {
      throw Error(message);
    } else {
      const userData = { ...responseData };
      yield put({
        type: ACTIONS_LOGIN.USER_LOGIN_SUCCESS,
        userData,
      });
    }
  } catch (err) {
    const error = err.message;
    yield put({
      type: ACTIONS_LOGIN.APP_LOGIN_FAILURE,
      error,
    });
  }
}

export function* registrationUserSaga() {
  yield takeEvery(ACTIONS_LOGIN.APP_LOGIN_NEW_USER, registrationSaga);
}
