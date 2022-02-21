import { createStore } from 'vuex';
import { io } from 'socket.io-client';

import { authModules } from './modules/auth';
import { userModules } from './modules/user';
import { messageModules } from './modules/message';
import { notificationModules } from './modules/notification';
import { ADD_USER, STUDENT } from '../constants';
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
        currentIO: null,
        isOpenMess: false,
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
            this.commit('SET_CURRENT_IO', state.userInfo.email);
        },
        SET_OPEN_MESS(state) {
            state.isOpenMess = true;
        },
        SET_CLOSE_MESS(state) {
            state.isOpenMess = false;
        },
        SET_CURRENT_IO(state, email) {
            if (!state.currentIO && email) {
                state.currentIO = io(API_DOMAIN, { transports: ['websocket'] });
                state.currentIO.emit(ADD_USER, email);
                this.dispatch('message/SETUP_LISTEN_SOCKET');
            }
        },
        SET_CLEAR_CURRENT_IO(state) {
            state.currentIO.disconnect(true);
            state.currentIO = null;
        },
    },
    actions: {},
    modules: {
        auth: authModules,
        user: userModules,
        message: messageModules,
        notification: notificationModules,
    },
});
