import { createStore } from 'vuex';
import { io } from 'socket.io-client';

import { authModules } from './modules/auth';
import { userModules } from './modules/user';
import { messageModules } from './modules/message';
import { notificationModules } from './modules/notification';
import { ADD_USER, GET_USER, STUDENT } from '../constants';
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
            address: '',
            status: true,
        },
        currentIO: null,
        isOpenMess: false,
        listUserOnline: [],
    },
    mutations: {
        SET_AUTH_USER(state, newAccessToken) {
            state.accessToken = newAccessToken;
        },
        SET_INIT_USER_INFO(state, newUserInfo) {
            state.userInfo = {
                email: newUserInfo.email || '',
                studentCode: newUserInfo.student_code || '',
                fullName: newUserInfo.full_name || '',
                avatar: newUserInfo.avatar || '',
                phoneNumber: newUserInfo.phone_number || '',
                role: newUserInfo.role || STUDENT,
                departmentCode: newUserInfo.department_code || '',
                majorCode: newUserInfo.major_code || '',
                address: newUserInfo.address || '',
                status: newUserInfo.status || true,
            };
            this.commit('SET_CURRENT_IO', state.userInfo.email);
        },
        SET_USER_INFO(state, newUserInfo) {
            state.userInfo = newUserInfo;
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
                state.currentIO.on(GET_USER, users => {
                    this.commit(
                        'SET_LIST_USER_ONLINE',
                        users.map(item => item.email),
                    );
                });
                this.dispatch('message/GET_INIT_NEW_NOTIFICATION_MESSAGE');
                this.dispatch('message/SETUP_LISTEN_SOCKET');
                this.dispatch('notification/SETUP_LISTEN_SOCKET_NOTIFICATION');
            }
        },
        SET_CLEAR_CURRENT_IO(state) {
            state.currentIO.disconnect(true);
            state.currentIO = null;
        },
        SET_LIST_USER_ONLINE(state, listUser) {
            state.listUserOnline = listUser;
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
