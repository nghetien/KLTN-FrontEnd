<template>
    <a-comment>
        <template #avatar>
            <a-avatar
                v-if="state.userInfo.avatar"
                :src="state.userInfo.avatar"
                :alt="state.userInfo.email"
            />
            <a-avatar v-else>
                <template #icon><UserOutlined /></template>
            </a-avatar>
        </template>
        <template #content>
            <a-form-item>
                <a-textarea show-count :maxlength="1000" v-model:value="content" :rows="4" />
            </a-form-item>
            <a-form-item>
                <a-button
                    html-type="submit"
                    :loading="submitting"
                    type="primary"
                    @click="handleSubmit"
                >
                    Bình luận
                </a-button>
            </a-form-item>
        </template>
    </a-comment>
    <a-list v-if="comments.length" :data-source="comments" item-layout="horizontal">
        <template #header>
            <div style="display: flex; justify-content: space-between; align-items: center">
                <p>{{ comments.length }} Bình luận</p>
                <a-button @click="loadComment">
                    <template #icon><ReloadOutlined /></template>
                    Tải lại
                </a-button>
            </div>
        </template>
        <template #renderItem="{ item, index }">
            <a-list-item>
                <a-comment
                    v-if="!isEditComments[index]"
                    :author="item.email"
                    :datetime="convertTimestamp(item.lastUpdate)"
                >
                    <template #actions v-if="state.userInfo.email === item.email">
                        <span @click="openEditComment(index)">Chỉnh sửa</span>
                        <span @click="deleteComment(index)">Xóa</span>
                    </template>
                    <template #avatar>
                        <a-avatar
                            v-if="item.avatar"
                            :src="item.avatar"
                            :alt="item.email"
                            referrerpolicy="no-referrer"
                        />
                        <a-avatar v-else>
                            <template #icon><UserOutlined /></template>
                        </a-avatar>
                    </template>
                    <template #content>
                        <p style="white-space: pre-line">{{ item.content }}</p>
                    </template>
                </a-comment>
                <a-comment v-else style="flex: 1">
                    <template #avatar>
                        <a-avatar v-if="item.avatar" :src="item.avatar" :alt="item.email" />
                        <a-avatar v-else>
                            <template #icon><UserOutlined /></template>
                        </a-avatar>
                    </template>
                    <template #content>
                        <a-form-item>
                            <a-textarea
                                show-count
                                :maxlength="1000"
                                v-model:value="editContent"
                                :rows="4"
                            />
                        </a-form-item>
                        <a-form-item>
                            <a-button
                                html-type="submit"
                                :loading="submittingEdit"
                                type="primary"
                                @click="editComment(index)"
                            >
                                Bình luận
                            </a-button>
                            <a-button style="margin-left: 10px" @click="closeEditComment(index)">
                                Hủy
                            </a-button>
                        </a-form-item>
                    </template>
                </a-comment>
            </a-list-item>
        </template>
    </a-list>
</template>

<script>
    import { defineComponent, ref, onMounted, createVNode } from 'vue';
    import { getCommentByIdResponse } from '../../services/method/get';
    import { convertTimestamp } from '../../lib/index';
    import { ExclamationCircleOutlined, UserOutlined, ReloadOutlined } from '@ant-design/icons-vue';
    import { useStore } from 'vuex';
    import { createCommentResponse } from '../../services/method/post';
    import { editCommentResponse } from '../../services/method/put';
    import { deleteCommentResponse } from '../../services/method/delete';
    import { message, Modal } from 'ant-design-vue';
    import { SEND_NOTIFICATION } from '../../constants';

    export default defineComponent({
        name: 'Comment',
        components: {
            UserOutlined,
            ReloadOutlined,
        },
        props: {
            idObject: {
                type: String,
                default: '',
            },
            emailOwner: {
                type: String,
                default: '',
            },
            type: {
                type: String,
                default: '',
            },
        },
        emits: ['changeCountComment'],
        setup(props, { emit }) {
            const store = useStore();
            const comments = ref([]);
            const isEditComments = ref([]);
            const submitting = ref(false);
            const submittingEdit = ref(false);
            const content = ref('');
            const editContent = ref('');

            const loadComment = async () => {
                const res = await getCommentByIdResponse(props.idObject, props.type);
                if (res.status) {
                    comments.value = res.data;
                    isEditComments.value = comments.value.map(() => {
                        return false;
                    });
                }
            };

            const handleSubmit = async () => {
                if (!content.value) {
                    return;
                }
                submitting.value = true;
                const res = await createCommentResponse({
                    idObject: props.idObject,
                    type: props.type,
                    idParent: '',
                    content: content.value,
                });
                if (res.status) {
                    await loadComment();
                    emit('changeCountComment', 1);
                    content.value = '';
                    if (
                        store.state.listUserOnline.includes(props.emailOwner) &&
                        store.state.userInfo.email !== props.emailOwner
                    ) {
                        store.state.currentIO.emit(SEND_NOTIFICATION, {
                            emailReceiver: props.emailOwner,
                        });
                    }
                    const listUserComment = [];
                    comments.value.forEach(item => {
                        if (
                            item &&
                            item.email &&
                            store.state.listUserOnline.includes(item.email) &&
                            store.state.userInfo.email !== item.email
                        ) {
                            if (!listUserComment.includes(item.email)) {
                                listUserComment.push(item.email);
                                store.state.currentIO.emit(SEND_NOTIFICATION, {
                                    emailReceiver: item.email,
                                });
                            }
                        }
                    });
                }
                submitting.value = false;
            };

            const openEditComment = index => {
                isEditComments.value[index] = true;
                editContent.value = comments.value[index].content;
            };

            const closeEditComment = index => {
                isEditComments.value[index] = false;
                editContent.value = '';
            };

            const editComment = async index => {
                if (!editContent.value) {
                    return;
                }
                submittingEdit.value = true;
                const res = await editCommentResponse({
                    idObjectComment: comments.value[index].idObjectComment,
                    type: props.type,
                    content: editContent.value,
                });
                if (res.status) {
                    await loadComment();
                    editContent.value = '';
                }
                submittingEdit.value = false;
            };

            const deleteComment = index => {
                Modal.confirm({
                    title: 'Bạn có chắc chắn muốn xóa bình luận?',
                    icon: createVNode(ExclamationCircleOutlined),
                    okText: 'Đồng ý',
                    cancelText: 'Hủy',
                    async onOk() {
                        const res = await deleteCommentResponse(
                            comments.value[index].idObjectComment,
                            props.type,
                        );
                        if (res.status) {
                            await loadComment();
                            emit('changeCountComment', -1);
                        } else {
                            message.error('Xóa bình luận thất bại');
                        }
                    },
                });
            };

            onMounted(async () => {
                await loadComment();
            });

            return {
                state: store.state,
                comments,
                isEditComments,
                submitting,
                submittingEdit,
                content,
                editContent,
                loadComment,
                handleSubmit,
                openEditComment,
                closeEditComment,
                editComment,
                deleteComment,
                convertTimestamp,
            };
        },
    });
</script>

<style scoped></style>
