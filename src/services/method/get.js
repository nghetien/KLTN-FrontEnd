import axios from 'axios';

import { API_DOMAIN, ERROR_DATA, CONFIG_DATA_RESPONSE, GET_ACCESS_TOKEN, GET } from '../config';
import { BOOKMARK_URL, COMMENT_URL, LIKE_URL, POST_URL, USER_URL } from '../api_url';

/// info user
export const getInfoUserResponse = async () => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${USER_URL}`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// get post
export const getAllPostResponse = async () => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${POST_URL}`,
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const getPostByIdResponse = async idPost => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${POST_URL}/${idPost}`,
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// comment
export const getCommentByIdResponse = async (idObject, type) => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${COMMENT_URL}/${type}/${idObject}`,
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// bookmark
export const getBookmarkResponse = async idObject => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${BOOKMARK_URL}/${idObject}`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// like
export const getLikeOrDislikeResponse = async idObject => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${LIKE_URL}/${idObject}`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
