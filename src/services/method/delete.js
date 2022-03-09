import axios from 'axios';

import { API_DOMAIN, CONFIG_DATA_RESPONSE, ERROR_DATA, DELETE, GET_ACCESS_TOKEN } from '../config';
import { COMMENT_URL, LOGOUT_URL, MESSAGE_URL, PROBLEM_URL } from '../api_url';

export const logoutResponse = async email => {
    try {
        const res = await axios({
            method: DELETE,
            url: `${API_DOMAIN}${LOGOUT_URL}`,
            data: { email },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// comment
export const deleteCommentResponse = async (idObjectComment, type) => {
    try {
        const res = await axios({
            method: DELETE,
            url: `${API_DOMAIN}${COMMENT_URL}/${type}/${idObjectComment}`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// Message
export const deleteMessageResponse = async messageId => {
    try {
        const res = await axios({
            method: DELETE,
            url: `${API_DOMAIN}${MESSAGE_URL}/${messageId}`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// Problem
export const deleteProblemResponse = async idProblem => {
    try {
        const res = await axios({
            method: DELETE,
            url: `${API_DOMAIN}${PROBLEM_URL}/${idProblem}`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
