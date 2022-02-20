<template>
    <div>
        <beautiful-chat
            :always-scroll-to-bottom="alwaysScrollToBottom"
            :close="closeChat"
            :colors="colors"
            :is-open="isChatOpen"
            :message-list="messageList"
            :message-styling="messageStyling"
            :on-message-was-sent="onMessageWasSent"
            :open="openChat"
            :participants="participants"
            :show-close-button="true"
            :show-launcher="true"
            :show-emoji="true"
            :show-file="false"
            :show-typing-indicator="showTypingIndicator"
            :show-edition="true"
            :show-deletion="true"
            :show-confirmation-deletion="true"
            :confirmation-deletion-message="'Bạn có chắc muốn xóa tin nhắn này không'"
            :title-image-url="titleImageUrl"
            :disable-user-list-toggle="false"
            @onType="handleOnType"
            @edit="editMessage"
            @remove="removeMessage"
        >
        </beautiful-chat>
    </div>
</template>

<script>
    import { defineComponent, ref, onBeforeMount, watch } from 'vue';
    import { useStore } from 'vuex';
    import { getAllMessageByConversationIdResponse } from '../services/method/get';
    import { createNewMessageByConversationIdResponse } from '../services/method/post';
    import { convertStringDateToTimestamp } from '../lib/convertTimestamp';
    import {
        GET_MESSAGE,
        SEND_MESSAGE,
        GET_EDIT_MESSAGE,
        EDIT_MESSAGE,
        DELETE_MESSAGE,
        GET_DELETE_MESSAGE,
        MESSAGE_DELETED,
        TEXT,
        SYSTEM,
        PARTICIPANT,
        ME,
    } from '../constants';
    import { editMessageResponse } from '../services/method/put';
    import { deleteMessageResponse } from '../services/method/delete';

    export default defineComponent({
        name: 'TLUChat',
        setup() {
            const store = useStore();
            const socket = ref();
            // STATE
            const avatarParticipant = ref('');
            const participants = ref([]);
            const titleImageUrl = ref('');
            const messageList = ref([]);
            const isChatOpen = ref(true);
            const showTypingIndicator = ref('');
            const colors = {
                header: {
                    bg: '#4e8cff',
                    text: '#ffffff',
                },
                launcher: {
                    bg: '#4e8cff',
                },
                messageList: {
                    bg: '#ffffff',
                },
                sentMessage: {
                    bg: '#4e8cff',
                    text: '#ffffff',
                },
                receivedMessage: {
                    bg: '#eaeaea',
                    text: '#222222',
                },
                userInput: {
                    bg: '#f4f7f9',
                    text: '#565867',
                },
            };
            const alwaysScrollToBottom = true;
            const messageStyling = true;

            // EVENT
            const onMessageWasSent = async message => {
                const textMessage = message.data.text ? message.data.text : message.data.emoji;
                message.data.text = textMessage;
                addMessageToListMessage(message);
                const currentMessIndex = messageList.value.length - 1;
                const sendMessage = await createNewMessageByConversationIdResponse(
                    store.state.dataMessOpened.conversationId,
                    {
                        text: textMessage,
                        type: message.type,
                    },
                );
                if (sendMessage.status) {
                    const dataItem = {
                        text: textMessage,
                        emoji: textMessage,
                        meta: convertStringDateToTimestamp(sendMessage.data.updatedAt),
                    };
                    const cloneCurrentMess = messageList.value[currentMessIndex];
                    messageList.value[currentMessIndex] = {
                        ...cloneCurrentMess,
                        ...{
                            data: dataItem,
                            id: sendMessage.data._id.toString(),
                        },
                    };
                    socket.value.emit(SEND_MESSAGE, {
                        emailSender: store.state.userInfo.email,
                        emailReceiver: store.state.dataMessOpened.emailParticipant,
                        text: textMessage,
                        type: message.type,
                        createdAt: sendMessage.data.createdAt,
                        messageId: sendMessage.data._id.toString(),
                    });
                }
            };
            const openChat = () => {
                isChatOpen.value = true;
            };
            const closeChat = () => {
                store.commit('CLOSE_MESS');
            };
            const handleScrollToTop = () => {
                // called when the user scrolls message list to top
                // leverage pagination for loading another page of messages
            };
            const handleOnType = () => {
                console.log('Emit typing event');
            };
            const editMessage = async message => {
                const m = messageList.value.find(m => m.id === message.id);
                const oldText = m.data.text;
                const newText = message.data.text;
                const res = await editMessageResponse(m.id, message.data.text);
                if (res.status) {
                    m.isEdited = true;
                    m.data.text = newText;
                    m.data.meta = convertStringDateToTimestamp(res.data.updatedAt);
                    socket.value.emit(EDIT_MESSAGE, {
                        emailSender: store.state.userInfo.email,
                        emailReceiver: store.state.dataMessOpened.emailParticipant,
                        text: newText,
                        updatedAt: res.data.updatedAt,
                        messageId: m.id,
                    });
                } else {
                    m.isEdited = false;
                    m.data.text = oldText;
                }
            };
            const removeMessage = async message => {
                const m = messageList.value.find(m => m.id === message.id);
                const oldText = m.data.text;
                const newText = MESSAGE_DELETED;
                const res = await deleteMessageResponse(m.id);
                if (res.data) {
                    m.type = SYSTEM;
                    m.data.text = newText;
                    m.data.meta = convertStringDateToTimestamp(res.data.updatedAt);
                    socket.value.emit(DELETE_MESSAGE, {
                        emailSender: store.state.userInfo.email,
                        emailReceiver: store.state.dataMessOpened.emailParticipant,
                        updatedAt: res.data.updatedAt,
                        messageId: m.id,
                    });
                } else {
                    m.type = TEXT;
                    m.data.text = oldText;
                }
            };

            // COMMON FUNCTION
            const setAvatarParticipant = () => {
                avatarParticipant.value =
                    store.state.dataMessOpened.avatarParticipant.length !== 0
                        ? store.state.dataMessOpened.avatarParticipant
                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png';
            };
            const setTitleImageUrl = () => {
                titleImageUrl.value = avatarParticipant.value;
            };
            const setParticipant = () => {
                participants.value = [
                    {
                        id: PARTICIPANT,
                        name: store.state.dataMessOpened.emailParticipant,
                        imageUrl: avatarParticipant.value,
                    },
                ];
            };
            const addMessageToListMessage = dataMessage => {
                const cloneMessageList = messageList.value;
                messageList.value = [...cloneMessageList, dataMessage];
            };
            const getAllMessage = async () => {
                const res = await getAllMessageByConversationIdResponse(
                    store.state.dataMessOpened.conversationId,
                );
                if (res.status && res.data) {
                    let messageListData = [];
                    for (const message of res.data) {
                        messageListData.push({
                            type: message.type ? message.type : TEXT,
                            author:
                                message.sender === store.state.userInfo.email ? ME : PARTICIPANT,
                            data: {
                                text:
                                    message.type === SYSTEM
                                        ? MESSAGE_DELETED
                                        : message.text
                                        ? message.text
                                        : '',
                                emoji:
                                    message.type === SYSTEM
                                        ? MESSAGE_DELETED
                                        : message.text
                                        ? message.text
                                        : '',
                                meta: convertStringDateToTimestamp(message.updatedAt),
                            },
                            id: message._id.toString(),
                            isEdited: message.createdAt !== message.updatedAt,
                        });
                    }
                    messageList.value = messageListData;
                }
            };

            // SET UP
            const setUpSocketMessage = () => {
                socket.value = store.state.currentIO;
                socket.value.on(GET_MESSAGE, dataMessage => {
                    addMessageToListMessage({
                        type: dataMessage.type ? dataMessage.type : TEXT,
                        author: PARTICIPANT,
                        data: {
                            text: dataMessage.text ? dataMessage.text : '',
                            emoji: dataMessage.text ? dataMessage.text : '',
                            meta: convertStringDateToTimestamp(dataMessage.createdAt),
                        },
                        id: dataMessage.messageId,
                    });
                });
                socket.value.on(GET_EDIT_MESSAGE, dataMessage => {
                    const m = messageList.value.find(m => m.id === dataMessage.messageId);
                    m.isEdited = true;
                    m.data.text = dataMessage.text;
                    m.data.meta = convertStringDateToTimestamp(dataMessage.updatedAt);
                });
                socket.value.on(GET_DELETE_MESSAGE, dataMessage => {
                    const m = messageList.value.find(m => m.id === dataMessage.messageId);
                    m.type = SYSTEM;
                    m.data.text = MESSAGE_DELETED;
                    m.data.meta = convertStringDateToTimestamp(dataMessage.updatedAt);
                });
            };
            onBeforeMount(() => {
                setUpSocketMessage();
                setAvatarParticipant();
                setTitleImageUrl();
                setParticipant();
                getAllMessage();
            });

            // WATCH
            watch(
                () => store.state.dataMessOpened,
                () => {
                    if (store.state.isOpenMess) {
                        setAvatarParticipant();
                        setTitleImageUrl();
                        setParticipant();
                        getAllMessage();
                    }
                },
            );

            return {
                participants,
                titleImageUrl,
                messageList,
                isChatOpen,
                showTypingIndicator,
                colors,
                alwaysScrollToBottom,
                messageStyling,
                onMessageWasSent,
                openChat,
                closeChat,
                handleScrollToTop,
                handleOnType,
                editMessage,
                removeMessage,
            };
        },
    });
</script>

<style lang="scss">
    .sc-chat-window.opened {
        z-index: 9999 !important;

        .sc-header--img {
            height: 60px;
            width: 60px;
        }

        .sc-header--title.enabled {
            flex: 1;
        }

        .sc-header--close-button {
            flex-shrink: 0;
        }

        .sc-message--meta {
            text-align: left;
        }
    }
</style>
