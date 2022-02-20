import { createStore } from 'vuex';
import { io } from 'socket.io-client';

import { authModules } from './modules/auth';
import { userModules } from './modules/user';
import { ADD_USER, STUDENT } from '../constants';
import { postsModules } from './modules/posts';
import { API_DOMAIN } from '../services/config';

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
        isOpenMess: false,
        dataMessOpened: {},
        currentIO: null,
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
            if (!state.currentIO && newUserInfo.email) {
                state.currentIO = io(API_DOMAIN, { transports: ['websocket'] });
                state.currentIO.emit(ADD_USER, newUserInfo.email);
            }
        },
        OPEN_MESS(state, dataConversation) {
            state.isOpenMess = true;
            state.dataMessOpened = dataConversation;
        },
        CLOSE_MESS(state) {
            state.isOpenMess = false;
            state.dataMessOpened = {};
        },
        CLEAR_CURRENT_IO(state) {
            state.currentIO.disconnect(true);
            state.currentIO = null;
        },
    },
    actions: {},
    modules: {
        auth: authModules,
        user: userModules,
        posts: postsModules,
    },
});
