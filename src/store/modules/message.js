import { notification } from 'ant-design-vue';
import {
    ME,
    MESSAGE_DELETED,
    PARTICIPANT,
    SYSTEM,
    TEXT,
    SEND_MESSAGE,
    EDIT_MESSAGE,
    DELETE_MESSAGE,
    GET_MESSAGE,
    GET_EDIT_MESSAGE,
    GET_DELETE_MESSAGE,
} from '../../constants';
import { convertStringDateToTimestamp } from '../../lib/convertTimestamp';
import {
    checkNotificationMessageResponse,
    createNewMessageByConversationIdResponse,
} from '../../services/method/post';
import { editMessageResponse } from '../../services/method/put';
import {
    getAllMessageByConversationIdResponse,
    getAllNotificationMessageResponse,
} from '../../services/method/get';
import { deleteMessageResponse } from '../../services/method/delete';

export const messageModules = {
    namespaced: true,
    state: () => ({
        currentConversationId: '',
        titleImageUrl: '',
        currentParticipant: [
            {
                id: PARTICIPANT,
                name: '',
                imageUrl: '',
            },
        ],
        messageList: [],
        newNotificationMess: [],
        isClickMessage: false,
    }),
    mutations: {
        SET_CURRENT_PARTICIPANT(state, { conversationId, participant }) {
            state.currentConversationId = conversationId;
            state.titleImageUrl = participant.imageUrl;
            state.currentParticipant[0] = participant;
        },
        SET_CLEAR_PARTICIPANT(state) {
            state.currentConversationId = '';
            state.titleImageUrl = '';
            state.currentParticipant[0] = {
                id: PARTICIPANT,
                name: '',
                imageUrl: '',
            };
            state.messageList = [];
        },
        SET_MESSAGE_LIST(state, data) {
            state.messageList = data;
        },
        SET_ADD_MESSAGE(state, newMessage) {
            state.messageList = [...state.messageList, newMessage];
        },
        SET_EDIT_MESSAGE(state, { messageId, text, updatedAt }) {
            const findMess = state.messageList.find(mess => mess.id === messageId);
            findMess.isEdited = true;
            findMess.data.text = text;
            findMess.data.meta = convertStringDateToTimestamp(updatedAt);
        },
        SET_DELETE_MESSAGE(state, { messageId, updatedAt }) {
            const findMess = state.messageList.find(mess => mess.id === messageId);
            findMess.type = SYSTEM;
            findMess.data.text = MESSAGE_DELETED;
            findMess.data.meta = convertStringDateToTimestamp(updatedAt);
        },
        SET_REPLACE_MESSAGE(state, { index, dataReplace }) {
            state.messageList[index] = dataReplace;
        },
        SET_REMOVE_MESSAGE(state, index) {
            state.messageList.splice(index, 1);
        },
        SET_REMOVE_NEW_NOTIFICATION_MESS(state) {
            state.newNotificationMess = [];
        },
        SET_ADD_NOTIFICATION_MESS(state, dataMessage) {
            const findMess = state.messageList.find(
                mess => mess.emailSender === dataMessage.emailSender,
            );
            if (!findMess) {
                state.newNotificationMess.push(dataMessage);
            }
        },
        SET_CLICK_NOTIFICATION(state) {
            state.isClickMessage = true;
        },
    },
    actions: {
        SETUP_LISTEN_SOCKET({ rootState, getters, commit }) {
            rootState.currentIO.on(GET_MESSAGE, dataMessage => {
                if (
                    rootState.isOpenMess &&
                    dataMessage.emailSender === getters.GET_CURRENT_EMAIL_PARTICIPANT
                ) {
                    commit('SET_ADD_MESSAGE', {
                        type: dataMessage.type ? dataMessage.type : TEXT,
                        author: PARTICIPANT,
                        data: {
                            text: dataMessage.text ? dataMessage.text : '',
                            emoji: dataMessage.text ? dataMessage.text : '',
                            meta: convertStringDateToTimestamp(dataMessage.createdAt),
                        },
                        id: dataMessage.messageId,
                    });
                } else {
                    commit('SET_ADD_NOTIFICATION_MESS', dataMessage);
                    notification['info']({
                        message: 'Tin nhắn',
                        description: `${dataMessage.emailSender} vừa gửi tin nhắn cho bạn`,
                        placement: 'bottomLeft',
                    });
                }
            });
            rootState.currentIO.on(GET_EDIT_MESSAGE, dataMessage => {
                if (
                    rootState.isOpenMess &&
                    dataMessage.emailSender === getters.GET_CURRENT_EMAIL_PARTICIPANT
                ) {
                    commit('SET_EDIT_MESSAGE', {
                        messageId: dataMessage.messageId,
                        text: dataMessage.text,
                        updatedAt: dataMessage.updatedAt,
                    });
                }
            });
            rootState.currentIO.on(GET_DELETE_MESSAGE, dataMessage => {
                if (
                    rootState.isOpenMess &&
                    dataMessage.emailSender === getters.GET_CURRENT_EMAIL_PARTICIPANT
                ) {
                    commit('SET_DELETE_MESSAGE', {
                        messageId: dataMessage.messageId,
                        updatedAt: dataMessage.updatedAt,
                    });
                }
            });
        },
        async GET_MESSAGE_LIST_BY_CONVERSATION_ID({ rootState, state, commit }) {
            const res = await getAllMessageByConversationIdResponse(state.currentConversationId);
            if (res.status) {
                let dataMessageList = [];
                for (const message of res.data) {
                    const isMessDelete = message.type === SYSTEM;
                    const textMess = isMessDelete
                        ? MESSAGE_DELETED
                        : message.text
                        ? message.text
                        : '';
                    dataMessageList.push({
                        type: message.type ? message.type : TEXT,
                        author: message.sender === rootState.userInfo.email ? ME : PARTICIPANT,
                        data: {
                            text: textMess,
                            emoji: textMess,
                            meta: convertStringDateToTimestamp(message.updatedAt),
                        },
                        id: message._id.toString(),
                        isEdited: message.createdAt !== message.updatedAt,
                    });
                }
                commit('SET_MESSAGE_LIST', dataMessageList);
            }
        },
        async GET_INIT_NEW_NOTIFICATION_MESSAGE({ commit }) {
            const res = await getAllNotificationMessageResponse();
            if (res.status) {
                for (const item of res.data) {
                    commit('SET_ADD_NOTIFICATION_MESS', item);
                }
            }
        },
        async SEND_MESSAGE({ rootState, state, commit, getters }, { text, type, index }) {
            const res = await createNewMessageByConversationIdResponse(
                state.currentConversationId,
                {
                    text: text,
                    type: type,
                },
            );
            if (res.status) {
                const message = {
                    text: text,
                    emoji: text,
                    meta: convertStringDateToTimestamp(res.data.createdAt),
                };
                commit('SET_REPLACE_MESSAGE', {
                    index,
                    dataReplace: {
                        ...state.messageList[index],
                        ...{
                            data: message,
                            id: res.data._id.toString(),
                        },
                    },
                });
                if (rootState.listUserOnline.includes(getters.GET_CURRENT_EMAIL_PARTICIPANT)) {
                    rootState.currentIO.emit(SEND_MESSAGE, {
                        emailSender: rootState.userInfo.email,
                        emailReceiver: getters.GET_CURRENT_EMAIL_PARTICIPANT,
                        text,
                        type,
                        createdAt: res.data.createdAt,
                        messageId: res.data._id.toString(),
                    });
                } else {
                    await checkNotificationMessageResponse('', {
                        email: rootState.userInfo.email,
                        emailReceiver: getters.GET_CURRENT_EMAIL_PARTICIPANT,
                    });
                }
            } else {
                commit('SET_REMOVE_MESSAGE', index);
            }
        },
        async EDIT_MESSAGE({ rootState, commit, getters }, { message, newText, oldText, index }) {
            const res = await editMessageResponse(message.id, newText);
            if (res.status) {
                message.isEdited = true;
                message.data.text = newText;
                message.data.meta = convertStringDateToTimestamp(res.data.updatedAt);
                rootState.currentIO.emit(EDIT_MESSAGE, {
                    emailSender: rootState.userInfo.email,
                    emailReceiver: getters.GET_CURRENT_EMAIL_PARTICIPANT,
                    text: newText,
                    updatedAt: res.data.updatedAt,
                    messageId: message.id,
                });
            } else {
                message.isEdited = false;
                message.data.text = oldText;
            }
            commit('SET_REPLACE_MESSAGE', {
                index,
                dataReplace: message,
            });
        },
        async DELETE_MESSAGE({ rootState, commit, getters }, { message, oldText, index }) {
            const res = await deleteMessageResponse(message.id);
            if (res.data) {
                message.type = SYSTEM;
                message.data.text = MESSAGE_DELETED;
                message.data.meta = convertStringDateToTimestamp(res.data.updatedAt);
                rootState.currentIO.emit(DELETE_MESSAGE, {
                    emailSender: rootState.userInfo.email,
                    emailReceiver: getters.GET_CURRENT_EMAIL_PARTICIPANT,
                    updatedAt: res.data.updatedAt,
                    messageId: message.id,
                });
            } else {
                message.type = TEXT;
                message.data.text = oldText;
            }
            commit('SET_REPLACE_MESSAGE', {
                index,
                dataReplace: message,
            });
        },
        async REMOVE_ALL_NOTIFICATION({ rootState, state, commit }) {
            if (!state.isClickMessage) {
                commit('SET_CLICK_NOTIFICATION');
                for (const item of state.newNotificationMess) {
                    await checkNotificationMessageResponse('', {
                        email: rootState.userInfo.email,
                        idNotification: item._id.toString(),
                    });
                }
            }
        },
    },
    getters: {
        GET_CURRENT_PARTICIPANT(state) {
            return state.currentParticipant;
        },
        GET_CURRENT_AVATAR_PARTICIPANT(state) {
            return state.currentParticipant[0].imageUrl;
        },
        GET_CURRENT_EMAIL_PARTICIPANT(state) {
            return state.currentParticipant[0].name;
        },
        GET_COUNT_NOTIFICATION_MESSAGE(state) {
            return state.newNotificationMess.length;
        },
    },
};
