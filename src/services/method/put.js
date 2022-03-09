import axios from 'axios';

import { API_DOMAIN, CONFIG_DATA_RESPONSE, ERROR_DATA, GET_ACCESS_TOKEN, PUT } from '../config';
import { COMMENT_URL, MESSAGE_URL, POST_URL, PROBLEM_URL, USER_URL } from '../api_url';

/// Comment
export const editCommentResponse = async data => {
    try {
        const res = await axios({
            method: PUT,
            url: `${API_DOMAIN}${COMMENT_URL}`,
            data: data,
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
export const editMessageResponse = async (messageId, text) => {
    try {
        const res = await axios({
            method: PUT,
            url: `${API_DOMAIN}${MESSAGE_URL}/${messageId}`,
            data: {
                text,
            },
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// User
export const editProfileResponse = async data => {
    try {
        const res = await axios({
            method: PUT,
            url: `${API_DOMAIN}${USER_URL}`,
            data: data,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const editAvatarResponse = async data => {
    try {
        const res = await axios({
            method: PUT,
            url: `${API_DOMAIN}${USER_URL}/avatar`,
            data: data,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// Post
export const editPostResponse = async (data, idPost) => {
    try {
        const res = await axios({
            method: PUT,
            url: `${API_DOMAIN}${POST_URL}/${idPost}`,
            data: data,
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
export const editProblemResponse = async (data, idProblem) => {
    try {
        const res = await axios({
            method: PUT,
            url: `${API_DOMAIN}${PROBLEM_URL}/${idProblem}`,
            data: data,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
