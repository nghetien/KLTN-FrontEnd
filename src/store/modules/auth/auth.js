import { useCookies } from 'vue3-cookies';
import MD5 from 'sha256';

import {
    loginGoogleResponse,
    loginResponse,
} from '../../../services/method/post';
import {
    CHANGE_AUTH_USER_MUTATIONS,
    LOGIN_ACTION,
    LOGIN_GOOGLE_ACTION,
    LOGOUT_ACTION,
} from './types';
import {
    CHANGE_USER_INFO_MUTATIONS,
    GET_USER_INFO_ACTION,
} from '../user/types';
import { EMAIL, PASSWORD, REMEMBER } from '../../../constants';
import { logoutResponse } from '../../../services/method/delete';

const { cookies } = useCookies();

export const authModules = {
    namespaced: true,
    state: () => ({}),
    mutations: {},
    actions: {
        async [LOGIN_ACTION]({ commit, dispatch }, formLogin) {
            const res = await loginResponse(
                formLogin.email,
                formLogin.password,
            );
            if (res.status) {
                if (formLogin.remember) {
                    cookies.set(EMAIL, MD5(formLogin.email));
                    cookies.set(PASSWORD, MD5(formLogin.password));
                    cookies.set(REMEMBER, MD5(formLogin.remember));
                }
                commit(CHANGE_AUTH_USER_MUTATIONS, res.data.token, {
                    root: true,
                });
                return await dispatch(`user/${GET_USER_INFO_ACTION}`, null, {
                    root: true,
                });
            }
            return res;
        },
        async [LOGIN_GOOGLE_ACTION]({ commit, dispatch }, idToken) {
            const res = await loginGoogleResponse(idToken);
            if (res.status) {
                commit(CHANGE_AUTH_USER_MUTATIONS, res.data.token, {
                    root: true,
                });
                return await dispatch(`user/${GET_USER_INFO_ACTION}`, null, {
                    root: true,
                });
            }
            return res;
        },
        async [LOGOUT_ACTION]({ rootState, commit }) {
            const res = await logoutResponse(rootState.accessToken);
            if (res.status) {
                commit(CHANGE_AUTH_USER_MUTATIONS, '', { root: true });
                commit(CHANGE_USER_INFO_MUTATIONS, {}, { root: true });
            }
            return res;
        },
    },
    getters: {},
};
