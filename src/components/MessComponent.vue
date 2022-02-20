<template>
    <a-dropdown placement="bottomRight" :trigger="['click']" @click="handleOnClickMessage">
        <MessageOutlined style="font-size: 24px; cursor: pointer; margin-right: 20px" />
        <template #overlay>
            <a-menu>
                <a-menu-item
                    v-for="(conversation, index) in allMessage"
                    :key="index"
                    @click="openMessage(conversation)"
                >
                    <div class="participant">
                        <a-avatar
                            v-if="conversation.avatarParticipant"
                            :src="conversation.avatarParticipant"
                            size="large"
                            class="participant-icon"
                        />
                        <a-avatar v-else size="large" class="participant-icon">
                            <template #icon><UserOutlined /></template>
                        </a-avatar>
                        <div class="participant-mess">
                            <h3>
                                <b>{{ conversation.emailParticipant }}</b>
                            </h3>
                            <p>
                                {{
                                    conversation.lastMessage && conversation.lastMessage.text
                                        ? conversation.lastMessage.text
                                        : ''
                                }}
                            </p>
                            <p
                                :style="{
                                    fontSize: '12px',
                                    color: 'var(--grey)',
                                }"
                            >
                                <i>{{ convertStringDateToTimestamp(conversation.createdAt) }}</i>
                            </p>
                        </div>
                    </div>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script>
    import { defineComponent, ref, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import { MessageOutlined, UserOutlined } from '@ant-design/icons-vue';
    import { getAllConversationResponse } from '../services/method/get';
    import { convertStringDateToTimestamp } from '../lib/index';

    export default defineComponent({
        name: 'MessComponent',
        components: {
            MessageOutlined,
            UserOutlined,
        },
        setup() {
            const allMessage = ref([]);

            const store = useStore();

            const getAllConversation = async () => {
                const res = await getAllConversationResponse();
                if (res.status) {
                    allMessage.value = res.data;
                }
            };

            const handleOnClickMessage = () => {
                getAllConversation();
            };

            const openMessage = currentConversation => {
                const dataConversation = {
                    conversationId: currentConversation._id,
                    emailParticipant: currentConversation.emailParticipant,
                    avatarParticipant: currentConversation.avatarParticipant,
                };
                store.commit('OPEN_MESS', dataConversation);
            };

            onMounted(() => {
                getAllConversation();
            });

            return {
                allMessage,
                openMessage,
                convertStringDateToTimestamp,
                handleOnClickMessage,
            };
        },
    });
</script>

<style scoped lang="scss">
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
        }
    }
</style>
