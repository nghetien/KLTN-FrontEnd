<template>
    <div class="mess-component">
        <span v-if="newNotificationMess > 0" class="mess-component__new-mess">{{
            newNotificationMess > 9 ? '9+' : newNotificationMess
        }}</span>
        <a-dropdown placement="bottomRight" :trigger="['click']" @click="handleOnClickMessage">
            <MessageOutlined style="font-size: 24px; cursor: pointer; margin-right: 20px" />
            <template #overlay>
                <a-menu>
                    <a-menu-item
                        v-for="(conversation, index) in allConversation"
                        :key="index"
                        @click="openMessage(conversation)"
                    >
                        <div class="participant">
                            <a-avatar
                                v-if="conversation.avatarParticipant"
                                :src="conversation.avatarParticipant"
                                size="large"
                                class="participant-icon"
                                referrerpolicy="no-referrer"
                            />
                            <a-avatar v-else size="large" class="participant-icon">
                                <template #icon><UserOutlined /></template>
                            </a-avatar>
                            <div class="participant-mess">
                                <h3>
                                    <b>{{ conversation.emailParticipant }}</b>
                                </h3>
                                <p>
                                    {{ renderLastMessage(conversation.lastMessage) }}
                                </p>
                                <p
                                    :style="{
                                        fontSize: '12px',
                                        color: 'var(--grey)',
                                    }"
                                >
                                    <i>{{
                                        convertStringDateToTimestamp(conversation.createdAt)
                                    }}</i>
                                </p>
                            </div>
                            <div
                                v-if="checkUserOnline(conversation.emailParticipant)"
                                class="participant-online"
                            ></div>
                        </div>
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script>
    import { defineComponent, ref, onMounted, computed } from 'vue';
    import { useStore } from 'vuex';
    import { MessageOutlined, UserOutlined } from '@ant-design/icons-vue';
    import { getAllConversationResponse } from '../services/method/get';
    import { convertStringDateToTimestamp } from '../lib/index';
    import { MESSAGE_DELETED, PARTICIPANT, SYSTEM } from '../constants';

    export default defineComponent({
        name: 'MessComponent',
        components: {
            MessageOutlined,
            UserOutlined,
        },
        setup() {
            const store = useStore();
            const allConversation = ref([]);
            const isOpenMess = computed(() => store.state.isOpenMess);
            const newNotificationMess = computed(
                () => store.state['message'].newNotificationMess.length,
            );
            const currentConversationId = computed(
                () => store.state['message'].currentConversationId,
            );

            const getAllConversation = async () => {
                const res = await getAllConversationResponse();
                if (res.status) {
                    allConversation.value = res.data;
                }
            };
            const handleOnClickMessage = () => {
                getAllConversation();
                if (newNotificationMess.value > 0) {
                    store.dispatch('message/REMOVE_ALL_NOTIFICATION');
                    store.commit('message/SET_REMOVE_NEW_NOTIFICATION_MESS');
                } else if (newNotificationMess.value === 0) {
                    store.commit('message/SET_CLICK_NOTIFICATION');
                }
            };
            const openMessage = async currentConversation => {
                if (isOpenMess.value && currentConversation._id === currentConversationId.value) {
                    return;
                }
                store.commit('message/SET_CURRENT_PARTICIPANT', {
                    conversationId: currentConversation._id,
                    participant: {
                        id: PARTICIPANT,
                        name: currentConversation.emailParticipant,
                        imageUrl: currentConversation.avatarParticipant
                            ? currentConversation.avatarParticipant
                            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png',
                    },
                });
                await store.dispatch('message/GET_MESSAGE_LIST_BY_CONVERSATION_ID');
                store.commit('SET_OPEN_MESS');
            };
            const renderLastMessage = lastMessage => {
                if (lastMessage && lastMessage.type && lastMessage.text) {
                    if (lastMessage.type === SYSTEM) {
                        return MESSAGE_DELETED;
                    }
                    return lastMessage.text;
                }
                return '';
            };
            const checkUserOnline = emailParticipant => {
                if (emailParticipant) {
                    return store.state.listUserOnline.includes(emailParticipant);
                }
                return false;
            };

            onMounted(() => {
                getAllConversation();
            });

            return {
                allConversation,
                newNotificationMess,
                openMessage,
                convertStringDateToTimestamp,
                handleOnClickMessage,
                renderLastMessage,
                checkUserOnline,
            };
        },
    });
</script>

<style scoped lang="scss">
    .mess-component {
        display: flex;
        position: relative;

        &__new-mess {
            font-size: 14px;
            border-radius: 50%;
            padding: 2px;
            background-color: red;
            position: absolute;
            width: 22px;
            height: 22px;
            top: -8px;
            left: 15px;
            color: #fff;
            line-height: 20px;
            text-align: center;
        }
    }

    .participant {
        display: flex;
        align-items: center;

        &-mess {
            margin-left: 8px;
        }

        &-icon {
            height: 60px;
            width: 60px;
            line-height: 60px;
            position: relative;
        }

        &-online {
            position: absolute;
            top: 9px;
            left: 15px;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            background-color: var(--green);
        }
    }
</style>
