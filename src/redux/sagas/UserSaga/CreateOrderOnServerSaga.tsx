import { takeEvery } from 'redux-saga/effects';
import { urlNow } from '../../../utils/settings-file';

import { ACTIONS_APP } from '../../constants';
import { IActionInterface } from '../../reducers';

function* createOrderOnSerer(action: IActionInterface): any {
  const userOrder = yield action.userOrders;
  try {
    yield fetch(`${urlNow}users/set-order`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(userOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {}
}

export function* createOrderOnServerSaga() {
  yield takeEvery(ACTIONS_APP.CREATE_ORDER_ON_SERVER, createOrderOnSerer);
}
