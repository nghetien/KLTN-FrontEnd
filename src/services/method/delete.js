import axios from 'axios';

import {
    API_DOMAIN,
    CONFIG_DATA_RESPONSE,
    ERROR_DATA,
    DELETE,
} from '../config';
import { LOGOUT_URL } from '../api_url';

export const logoutResponse = async token => {
    try {
        const res = await axios({
            method: DELETE,
            url: `${API_DOMAIN}${LOGOUT_URL}`,
            data: { token },
        });
        return CONFIG_DATA_RESPONSE(res);
    } catch (e) {
        return ERROR_DATA;
    }
};
