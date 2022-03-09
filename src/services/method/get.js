import axios from 'axios';

import { API_DOMAIN, ERROR_DATA, CONFIG_DATA_RESPONSE, GET_ACCESS_TOKEN, GET } from '../config';
import {
    BOOKMARK_URL,
    COMMENT_URL,
    LIKE_URL,
    POST_URL,
    USER_URL,
    FOLLOW_URL,
    PROBLEM_URL,
    CONVERSATION_URL,
    MESSAGE_URL,
    NOTIFICATION_URL,
    NOTIFICATION_MESSAGE_URL,
    SEARCH_URL,
} from '../api_url';

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
export const getProfileUserResponse = async email => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${USER_URL}/${email}`,
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const getHistoryUserResponse = async email => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${USER_URL}/history/${email}`,
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// get post
export const getAllPostResponse = async (params = {}) => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${POST_URL}`,
            params,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const getMaxPagePostResponse = async (params = {}) => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${POST_URL}/count-max-page`,
            params,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const getPostByIdResponse = async (idPost, params = {}) => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${POST_URL}/${idPost}`,
            params,
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const getPostManagerResponse = async () => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${POST_URL}/manager`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const findAllPostResponse = async () => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${POST_URL}/find-all`,
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// get problem
export const getAllProblemResponse = async (params = {}) => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${PROBLEM_URL}`,
            params,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const getMaxPageProblemResponse = async (params = {}) => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${PROBLEM_URL}/count-max-page`,
            params,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const getProblemByIdResponse = async (idProblem, params = {}) => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${PROBLEM_URL}/${idProblem}`,
            params,
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const getProblemManagerResponse = async () => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${PROBLEM_URL}/manager`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
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

/// follow
export const getFollowedResponse = async emailUserFollow => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${FOLLOW_URL}/${emailUserFollow}`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const getUserFollowedResponse = async (emailTarget, isFollowed) => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${FOLLOW_URL}/user-followed/${emailTarget}`,
            params: {
                isFollowed,
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

/// correct answer
export const toggleCorrectAnswerResponse = async idProblem => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${PROBLEM_URL}/correctAnswer/${idProblem}`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// conversation
export const getAllConversationResponse = async () => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${CONVERSATION_URL}`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// message
export const getAllMessageByConversationIdResponse = async conversationId => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${MESSAGE_URL}/${conversationId}`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// notification
export const getAllNotificationResponse = async () => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${NOTIFICATION_URL}`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const getAllNotificationMessageResponse = async () => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${NOTIFICATION_MESSAGE_URL}`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// Search
export const searchResponse = async (params = {}) => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${SEARCH_URL}`,
            params,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const searchUserResponse = async (params = {}) => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${SEARCH_URL}/user`,
            params,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// bookmark
export const getBookmarkPostResponse = async () => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${BOOKMARK_URL}/post`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

export const getBookmarkProblemResponse = async () => {
    try {
        const res = await axios({
            method: GET,
            url: `${API_DOMAIN}${BOOKMARK_URL}/problem`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
