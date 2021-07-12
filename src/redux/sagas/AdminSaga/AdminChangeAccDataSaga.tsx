import { put, takeEvery } from 'redux-saga/effects';
import { IChangeAccAdmin } from '../../../utils/interfaces';
import { urlNow } from '../../../utils/settings-file';
import { ACTIONS_ADMIN_DATA } from '../../constants';
import { IAdminReducerAction } from '../../reducers';

function* changeAccAdminData(action: IAdminReducerAction): any {
  const { newAccAdmin } = action;
  try {
    const response = yield fetch(`${urlNow}login/change-admin-account`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(newAccAdmin),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const serverResponse = (yield response.json()) as IChangeAccAdmin;
    const { operationStatus } = yield serverResponse;

    if (operationStatus) {
      const changeAccAdminInfo = serverResponse.infoMessage;
      yield put({
        type: ACTIONS_ADMIN_DATA.CHANGE_ACCOUNT_DATA_SUCCESS,
        changeAccAdminInfo,
      });
    } else {
      const errMessage = serverResponse.errMessage;
      yield put({
        type: ACTIONS_ADMIN_DATA.CHANGE_ACCOUNT_DATA_FAILURE,
        error: errMessage,
      });
    }
  } catch (error) {
    yield put({
      type: ACTIONS_ADMIN_DATA.CHANGE_ACCOUNT_DATA_FAILURE,
      error: error.message,
    });
  }
}

export function* changeAccAdminDataSaga() {
  yield takeEvery(ACTIONS_ADMIN_DATA.CHANGE_ACCOUNT_DATA, changeAccAdminData);
}
