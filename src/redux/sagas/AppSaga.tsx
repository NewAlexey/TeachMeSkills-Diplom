import { put, takeEvery } from 'redux-saga/effects';
import { getOrderDataForTg } from '../../utils/get-order-data';

import { ACTIONS_APP } from '../constants';
import { IActionInterface } from '../reducers';

function* sendInfoTg(action: IActionInterface): any {
  try {
    const { userInfo } = yield action;
    const userData = yield getOrderDataForTg(userInfo);
    const data = yield { text: userData, chat_id: 366595308, parse_mode: 'HTML' };
    const JSONdata = yield JSON.stringify(data);
    const request = yield fetch(
      'https://api.telegram.org/bot1740168231:AAEeiWra1eNXSBh0zSkspHL2bAhvgZWNXLc/sendMessage',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }
    );
    const answer = yield request.json();
    const orderStatus = answer.ok;
    if (!orderStatus) {
      throw Error('Chto-to ne to..')
    }
    yield put({
      type: ACTIONS_APP.SEND_INFO_TG_SUCCESS,
      orderStatus,
    });
  } catch (error) {
    console.log(error.message);
    yield put({
      type: ACTIONS_APP.SEND_INFO_TG_FAILURE,
      orderError: error.message,
    });
  }
}

export function* sendOrderInfoTg() {
  yield takeEvery(ACTIONS_APP.SEND_INFO_TG_REQUEST, sendInfoTg);
}
