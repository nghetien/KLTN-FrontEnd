import { getInfoUserResponse } from '../../services/method/get';

export const userModules = {
    namespaced: true,
    state: () => ({}),
    mutations: {},
    actions: {
        async GET_USER_INFO({ commit }) {
            const res = await getInfoUserResponse();
            if (res.status) {
                commit('SET_INIT_USER_INFO', res.data, { root: true });
            } else {
                commit('SET_AUTH_USER', '', { root: true });
            }
            return res;
        },
    },
    getters: {},
};
