import { getAllNotificationResponse } from '../../services/method/get';

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
    },
    getters: {},
};
