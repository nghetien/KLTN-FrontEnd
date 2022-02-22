<template>
    <div class="notification-component">
        <BellOutlined
            style="font-size: 24px; cursor: pointer; margin-right: 20px"
            @click="showDrawer"
        />
        <a-drawer
            v-model:visible="visible"
            :title="`Thông báo (${newNotification === 0 ? '' : newNotification})`"
            placement="left"
        >
            <div
                class="notification-item"
                v-for="(notification, index) in notificationList"
                :key="index"
                @click="handleClickNotification(notification, index)"
            >
                <InfoCircleOutlined v-if="!notification.isChecked" style="margin-right: 5px" />
                <span style="font-weight: 500; color: var(--primary); margin-right: 5px">
                    {{ notification.emailSender }}
                </span>
                <span>{{ notificationType(notification) }}</span>
            </div>
        </a-drawer>
        <span v-if="newNotification > 0" class="notification-component__new-notification">{{
            newNotification > 9 ? '9+' : newNotification
        }}</span>
    </div>
</template>

<script>
    import { defineComponent, onMounted, ref, computed } from 'vue';
    import { BellOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
    import { useStore } from 'vuex';
    import {
        NOTIFICATION_COMMENT_POST,
        NOTIFICATION_COMMENT_PROBLEM,
        NOTIFICATION_NEW_POST,
        NOTIFICATION_NEW_PROBLEM,
        NOTIFICATION_YOUR_POST,
        NOTIFICATION_YOUR_PROBLEM,
    } from '../constants';
    import { useRouter } from 'vue-router';
    import { checkNotificationResponse } from '../services/method/post';
    import { convertStringDateToTimestamp } from '../lib/index';

    export default defineComponent({
        name: 'BellComponent',
        components: {
            BellOutlined,
            InfoCircleOutlined,
        },
        setup() {
            const store = useStore();
            const router = useRouter();
            const visible = ref(false);
            const notificationList = computed(() => store.state['notification'].notificationList);
            const newNotification = computed(() => store.state['notification'].newNotification);

            const notificationType = notification => {
                const type = notification.type;
                let text;
                if (type === NOTIFICATION_NEW_POST) {
                    text = 'đã đăng một bài viết mới';
                } else if (type === NOTIFICATION_NEW_PROBLEM) {
                    text = 'đã đặt một câu hỏi mới';
                } else if (type === NOTIFICATION_COMMENT_POST) {
                    text = 'đã bình luận về bài viết mà bạn quan tâm';
                } else if (type === NOTIFICATION_COMMENT_PROBLEM) {
                    text = 'đã bình luận về câu hỏi mà bạn quan tâm';
                } else if (type === NOTIFICATION_YOUR_POST) {
                    text = 'đã bình luận về bài viết của bạn';
                } else if (type === NOTIFICATION_YOUR_PROBLEM) {
                    text = 'đã bình luận về câu hỏi của bạn';
                } else {
                    text = '';
                }
                return `${text} - ${convertStringDateToTimestamp(notification.createdAt)}`;
            };
            const showDrawer = () => {
                visible.value = true;
                store.dispatch('notification/GET_ALL_NOTIFICATION');
            };
            const handleClickNotification = async (notification, index) => {
                const type = notification.type;
                const redirectUrl = notification.redirectUrl;
                visible.value = false;
                if (type === NOTIFICATION_NEW_POST) {
                    await router.push(`/post/${redirectUrl}`);
                } else if (type === NOTIFICATION_NEW_PROBLEM) {
                    await router.push(`/problem/${redirectUrl}`);
                } else if (type === NOTIFICATION_COMMENT_POST) {
                    await router.push(`/post/${redirectUrl}`);
                } else if (type === NOTIFICATION_COMMENT_PROBLEM) {
                    await router.push(`/problem/${redirectUrl}`);
                } else if (type === NOTIFICATION_YOUR_POST) {
                    await router.push(`/post/${redirectUrl}`);
                } else if (type === NOTIFICATION_YOUR_PROBLEM) {
                    await router.push(`/problem/${redirectUrl}`);
                }
                const res = await checkNotificationResponse(notification._id.toString());
                if (res.status) {
                    store.commit('notification/SET_NEW_NOTIFICATION', -1);
                    store.commit('notification/SET_CHANGE_STATUS_CHECK_NOTIFICATION', index);
                }
            };

            onMounted(() => {
                store.dispatch('notification/GET_ALL_NOTIFICATION');
            });

            return {
                visible,
                notificationList,
                newNotification,
                showDrawer,
                notificationType,
                handleClickNotification,
            };
        },
    });
</script>

<style scoped lang="scss">
    .notification-component {
        display: flex;
        position: relative;

        &__new-notification {
            font-size: 14px;
            border-radius: 50%;
            padding: 2px;
            background-color: red;
            position: absolute;
            width: 22px;
            height: 22px;
            top: -8px;
            left: 13px;
            color: #fff;
            line-height: 20px;
            text-align: center;
        }
    }

    .notification-item {
        cursor: pointer;
        margin-bottom: 24px;
    }
</style>
