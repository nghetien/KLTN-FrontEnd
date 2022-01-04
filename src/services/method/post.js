import axios from 'axios';

import { API_DOMAIN, CONFIG_DATA_RESPONSE, ERROR_DATA, POST } from '../config';
import { LOGIN_URL, LOGIN_GOOGLE_URL, LOGOUT_URL } from '../api_url';

export const loginResponse = async (email, password) => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${LOGIN_URL}`,
            data: {
                email,
                password,
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

export const loginGoogleResponse = async idToken => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${LOGIN_GOOGLE_URL}`,
            data: {
                token: idToken,
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

export const logoutResponse = async token => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${LOGOUT_URL}`,
            data: { token },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
