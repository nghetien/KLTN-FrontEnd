import axios from 'axios';

import { API_DOMAIN, CONFIG_DATA_RESPONSE, ERROR_DATA, GET_ACCESS_TOKEN, POST } from '../config';
import {
    LOGIN_URL,
    LOGIN_GOOGLE_URL,
    POST_URL,
    COMMENT_URL,
    BOOKMARK_URL,
    LIKE_URL,
    FOLLOW_URL,
    PROBLEM_URL,
    MESSAGE_URL,
    NOTIFICATION_URL,
    NOTIFICATION_MESSAGE_URL,
    UPLOAD_URL,
    CONVERSATION_URL,
    AI_SEARCH,
} from '../api_url';

/// Auth
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

/// Post
export const createPostResponse = async data => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${POST_URL}`,
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
export const createProblemResponse = async data => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${PROBLEM_URL}`,
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

/// Comment
export const createCommentResponse = async data => {
    try {
        const res = await axios({
            method: POST,
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

/// Bookmark
export const toggleBookmarkResponse = async (idObject, type) => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${BOOKMARK_URL}/${idObject}`,
            data: {
                type: type,
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

/// Like
export const handleLikeResponse = async (idObject, data) => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${LIKE_URL}/${idObject}`,
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

/// Follow
export const toggleFollowResponse = async data => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${FOLLOW_URL}`,
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
export const createNewMessageByConversationIdResponse = async (conversationId, data) => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${MESSAGE_URL}/${conversationId}`,
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

/// Notification
export const checkNotificationResponse = async notificationId => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${NOTIFICATION_URL}/${notificationId}`,
            headers: {
                token: GET_ACCESS_TOKEN(),
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
/// Notification
export const checkNotificationMessageResponse = async (notificationId = '', data) => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${NOTIFICATION_MESSAGE_URL}/${notificationId}`,
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

/// Upload
export const uploadResponse = async formData => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${UPLOAD_URL}`,
            data: formData,
            headers: {
                token: GET_ACCESS_TOKEN(),
                'Content-Type': 'multipart/form-data',
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};

/// Conversation
export const createConversationResponse = async (email, emailParticipant) => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${CONVERSATION_URL}`,
            data: {
                email,
                emailParticipant,
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

/// Conversation
export const aiSearchPostResponse = async searchValue => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${AI_SEARCH}`,
            data: {
                searchValue,
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
export const addTagToGroupResponse = async (contentSearch, listTags) => {
    try {
        const res = await axios({
            method: POST,
            url: `${API_DOMAIN}${AI_SEARCH}/add-tag-to-group`,
            data: {
                contentSearch,
                listTags,
            },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
