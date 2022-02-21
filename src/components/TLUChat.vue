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
    import { defineComponent, ref, computed } from 'vue';
    import { useStore } from 'vuex';

    export default defineComponent({
        name: 'TLUChat',
        setup() {
            const store = useStore();

            // Map store global to local
            const avatarParticipant = computed(
                () => store.getters['message/GET_CURRENT_AVATAR_PARTICIPANT'],
            );
            const participants = computed(() => store.getters['message/GET_CURRENT_PARTICIPANT']);
            const titleImageUrl = avatarParticipant;
            const messageList = computed(() => store.state['message'].messageList);

            //  Local state
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
            const onMessageWasSent = message => {
                message.data.text = message.data.text ? message.data.text : message.data.emoji;
                store.commit('message/SET_ADD_MESSAGE', message);
                const messIndex = messageList.value.length - 1;
                store.dispatch('message/SEND_MESSAGE', {
                    text: message.data.text,
                    type: message.type,
                    index: messIndex,
                });
            };
            const openChat = () => {
                isChatOpen.value = true;
            };
            const closeChat = () => {
                store.commit('SET_CLOSE_MESS');
                store.commit('message/SET_CLEAR_PARTICIPANT');
            };
            const handleScrollToTop = () => {};
            const handleOnType = () => {};
            const editMessage = message => {
                const indexMessage = messageList.value.findIndex(m => m.id === message.id);
                const findMessage = messageList.value[indexMessage];
                const oldText = findMessage.data.text;
                const newText = message.data.text;
                store.dispatch('message/EDIT_MESSAGE', {
                    message: findMessage,
                    newText,
                    oldText,
                    index: indexMessage,
                });
            };
            const removeMessage = message => {
                const indexMessage = messageList.value.findIndex(m => m.id === message.id);
                const findMessage = messageList.value[indexMessage];
                const oldText = findMessage.data.text;
                store.dispatch('message/DELETE_MESSAGE', {
                    message: findMessage,
                    oldText,
                    index: indexMessage,
                });
            };

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
