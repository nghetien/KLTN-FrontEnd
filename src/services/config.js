import store from '../store';

export const API_DOMAIN = 'http://localhost:3000';
export const GET = 'get';
export const POST = 'post';
export const PUT = 'put';
export const DELETE = 'delete';

export const CONFIG_DATA_RESPONSE = res => {
    return {
        code: res.status || 400,
        status: res.data.status || false,
        message: res.data.message || '',
        data: res.data.data || {},
    };
};

export const ERROR_DATA = {
    code: 400,
    status: false,
    message: 'Front end error',
    data: {},
};

export const GET_ACCESS_TOKEN = () => {
    return store.state.accessToken;
};
