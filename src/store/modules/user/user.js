import { CHANGE_USER_INFO_MUTATIONS, GET_USER_INFO_ACTION } from './types';
import { getInfoUserResponse } from '../../../services/method/get';

export const userModules = {
    namespaced: true,
    state: () => ({}),
    mutations: {},
    actions: {
        async [GET_USER_INFO_ACTION]({ commit }) {
            const res = await getInfoUserResponse();
            if (res.status) {
                commit(CHANGE_USER_INFO_MUTATIONS, res.data, { root: true });
            }
            return res;
        },
    },
    getters: {},
};
