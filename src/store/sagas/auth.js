import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import * as actions from '../actions/index';

const TOKEN_KEY = 'token';
const EXPIRATION_DATE = 'expiration_date';
const USER_ID_KEY = 'user_id';


export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], TOKEN_KEY);
    yield call([localStorage, 'removeItem'], EXPIRATION_DATE);
    yield call([localStorage, 'removeItem'], USER_ID_KEY);
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCzn1Udu6rCWLvKWcfC4H0wR1MVMiEbyJo';
    if (!action.isSignup) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCzn1Udu6rCWLvKWcfC4H0wR1MVMiEbyJo';
    }
    try {
        const response = yield axios.post(url, authData);

        const expirationDay = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem(TOKEN_KEY, response.data.idToken);
        yield localStorage.setItem(EXPIRATION_DATE, expirationDay);
        yield localStorage.setItem(USER_ID_KEY, response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId, response.data.email));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }

}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem(TOKEN_KEY);
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem(EXPIRATION_DATE));
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem(USER_ID_KEY);
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}