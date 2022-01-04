import { createStore } from 'vuex';

import { CHANGE_USER_INFO_MUTATIONS } from './modules/user/types';

import { authModules } from './modules/auth/auth';
import { userModules } from './modules/user/user';
import { CHANGE_AUTH_USER_MUTATIONS } from './modules/auth/types';
import { STUDENT } from '../constants';

export default createStore({
    state: {
        accessToken: '',
        userInfo: {
            email: '',
            studentCode: '',
            fullName: '',
            avatar: '',
            phoneNumber: '',
            role: STUDENT,
            departmentCode: '',
            majorCode: '',
            status: true,
        },
    },
    mutations: {
        [CHANGE_AUTH_USER_MUTATIONS](state, newAccessToken) {
            state.accessToken = newAccessToken;
        },
        [CHANGE_USER_INFO_MUTATIONS](state, newUserInfo) {
            state.userInfo = {
                email: newUserInfo.email || '',
                studentCode: newUserInfo.student_code || '',
                fullName: newUserInfo.full_name || '',
                avatar: newUserInfo.avatar || '',
                phoneNumber: newUserInfo.phone_number || '',
                role: newUserInfo.role || STUDENT,
                departmentCode: newUserInfo.department_code || '',
                majorCode: newUserInfo.major_code || '',
                status: newUserInfo.status || true,
            };
        },
    },
    actions: {},
    modules: {
        auth: authModules,
        user: userModules,
    },
});
