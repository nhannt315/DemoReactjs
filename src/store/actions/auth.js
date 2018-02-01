import axios from 'axios';

import * as actionTypes from './actionTypes';

const TOKEN_KEY = 'token';
const EXPIRATION_DATE = 'expiration_date';
const USER_ID_KEY = 'user_id';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
        email: email
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRATION_DATE);
    localStorage.removeItem(USER_ID_KEY);
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCzn1Udu6rCWLvKWcfC4H0wR1MVMiEbyJo';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCzn1Udu6rCWLvKWcfC4H0wR1MVMiEbyJo';
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDay = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem(TOKEN_KEY, response.data.idToken);
                localStorage.setItem(EXPIRATION_DATE, expirationDay);
                localStorage.setItem(USER_ID_KEY, response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.email));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem(EXPIRATION_DATE));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem(USER_ID_KEY);
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};