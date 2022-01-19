import { createStore } from 'vuex';
import { authModules } from './modules/auth';
import { userModules } from './modules/user';
import { STUDENT } from '../constants';
import { postsModules } from './modules/posts';

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
        SET_AUTH_USER(state, newAccessToken) {
            state.accessToken = newAccessToken;
        },
        SET_USER_INFO(state, newUserInfo) {
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
        posts: postsModules,
    },
});
