import axios from 'axios';

import { API_DOMAIN, CONFIG_DATA_RESPONSE, ERROR_DATA, GET_ACCESS_TOKEN, PUT } from '../config';
import { COMMENT_URL } from '../api_url';

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
