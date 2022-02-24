import { getAllNotificationResponse } from '../../services/method/get';
import { GET_NOTIFICATION } from '../../constants';
import { notification } from 'ant-design-vue';

export const notificationModules = {
    namespaced: true,
    state: () => ({
        notificationList: [],
        newNotification: 0,
    }),
    mutations: {
        SET_NOTIFICATION_LIST(state, data) {
            state.notificationList = data;
        },
        SET_NOTIFICATION(state, number) {
            state.newNotification = number;
        },
        SET_NEW_NOTIFICATION(state, number) {
            state.newNotification += number;
        },
        SET_CHANGE_STATUS_CHECK_NOTIFICATION(state, index) {
            state.notificationList[index].isChecked = true;
        },
    },
    actions: {
        async GET_ALL_NOTIFICATION({ commit }) {
            const res = await getAllNotificationResponse();
            if (res.status) {
                commit('SET_NOTIFICATION_LIST', res.data.allNotification);
                commit('SET_NOTIFICATION', res.data.newNotification);
            }
        },
        async SETUP_LISTEN_SOCKET_NOTIFICATION({ rootState, commit }) {
            rootState.currentIO.on(GET_NOTIFICATION, () => {
                commit('SET_NEW_NOTIFICATION', 1);
                notification['info']({
                    message: 'Thông báo',
                    description: `Bạn nhận được một thông báo mới`,
                    placement: 'bottomRight',
                });
            });
        },
    },
    getters: {},
};
