import { put, takeEvery } from 'redux-saga/effects';

import { ACTIONS_APP } from '../constants';
import { IActionInterface } from '../reducers';

function* sendMessageToAuthor(action: IActionInterface): any {
  try {
    const { sendMessageAuthor } = yield action;
    const data = yield { text: sendMessageAuthor, chat_id: 366595308 };
    const request = yield fetch(
      'https://api.telegram.org/bot1740168231:AAEeiWra1eNXSBh0zSkspHL2bAhvgZWNXLc/sendMessage',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const answer = yield request.json();
    const orderStatus = answer.ok;

    if (!orderStatus) {
      throw Error('Chto-to ne to... Sorry');
    }

    yield put({
      type: ACTIONS_APP.SEND_MESSAGE_TO_AUTHOR_SUCCESS,
      information: 'Thanks for messaging :)',
    });
  } catch (error) {
    yield put({
      type: ACTIONS_APP.SEND_INFO_TG_FAILURE,
      orderError: error.message,
    });
  }
}

export function* sendMessageToAuthorSaga() {
  yield takeEvery(ACTIONS_APP.SEND_MESSAGE_TO_AUTHOR, sendMessageToAuthor);
}
