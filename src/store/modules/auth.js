import { useCookies } from 'vue3-cookies';
import MD5 from 'sha256';
import { loginGoogleResponse, loginResponse } from '../../services/method/post';
import { EMAIL, PASSWORD, REMEMBER } from '../../constants';
import { logoutResponse } from '../../services/method/delete';
import { ACCESS_TOKEN } from '../../constants/keys';

const { cookies } = useCookies();

const saveAccessToken = accessToken => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const authModules = {
    namespaced: true,
    state: () => ({}),
    mutations: {},
    actions: {
        async LOGIN({ commit, dispatch }, formLogin) {
            const res = await loginResponse(formLogin.email, formLogin.password);
            if (res.status) {
                if (formLogin.remember) {
                    cookies.set(EMAIL, MD5(formLogin.email));
                    cookies.set(PASSWORD, MD5(formLogin.password));
                    cookies.set(REMEMBER, MD5(formLogin.remember));
                }
                saveAccessToken(res.data.token);
                commit('SET_AUTH_USER', res.data.token, {
                    root: true,
                });
                return await dispatch('user/GET_USER_INFO', null, {
                    root: true,
                });
            }
            return res;
        },
        async LOGIN_GOOGLE({ commit, dispatch }, idToken) {
            const res = await loginGoogleResponse(idToken);
            if (res.status) {
                saveAccessToken(res.data.token);
                commit('SET_AUTH_USER', res.data.token, {
                    root: true,
                });
                return await dispatch('user/GET_USER_INFO', null, {
                    root: true,
                });
            }
            return res;
        },
        async LOGOUT({ rootState, commit }) {
            const res = await logoutResponse(rootState.userInfo.email);
            localStorage.removeItem(ACCESS_TOKEN);
            if (res.status) {
                commit('SET_AUTH_USER', '', { root: true });
                commit('SET_USER_INFO', {}, { root: true });
                commit('CLOSE_MESS', {}, { root: true });
                commit('CLEAR_CURRENT_IO', {}, { root: true });
            }
            return res;
        },
    },
    getters: {},
};
