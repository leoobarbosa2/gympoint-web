import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '../../../services/history';
import api from '../../../services/api';

import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));

    history.push('/students');
  } catch (err) {
    console.tron.log(err.response.data.error);
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
