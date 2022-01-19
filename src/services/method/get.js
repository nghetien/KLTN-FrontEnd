import axios from 'axios';

import { API_DOMAIN, ERROR_DATA, CONFIG_DATA_RESPONSE, GET_ACCESS_TOKEN, GET } from '../config';
import { USER_URL } from '../api_url';

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
