<template>
    <div>
        <div class="problem-header">
            <h2 class="problem-header-title">Quản lý câu hỏi</h2>
            <a-button type="primary" @click="handleAddProblem">Đặt câu hỏi</a-button>
        </div>
        <a-table :columns="columns" :data-source="dataSource" bordered>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'tags'">
                    <span>
                        <a-tag v-for="tag in record.tags" :key="tag" color="green">
                            {{ tag.toUpperCase() }}
                        </a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'isHaveCorrectAnswer'">
                    <CheckOutlined v-if="record.isHaveCorrectAnswer" style="color: var(--green)" />
                </template>
                <template v-else-if="column.key === 'timeCreate'">
                    <span>{{ convertTimestampToTime(record.timeCreate) }}</span>
                </template>
                <template v-else-if="column.key === 'action'">
                    <a-button
                        style="background: var(--yellow); border-color: var(--yellow)"
                        type="primary"
                        @click="handleEditProblem(record.id)"
                    >
                        Chỉnh sửa
                    </a-button>
                    <a-button
                        style="
                            margin-left: 10px;
                            background: var(--red);
                            border-color: var(--yellow);
                        "
                        type="primary"
                        @click="handleDeleteProblem(record.id)"
                    >
                        Xóa
                    </a-button>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script>
    import { createVNode, defineComponent, onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { getProblemManagerResponse } from '../../services/method/get';
    import { ADMIN, PUBLIC } from '../../constants';
    import { convertTimestampToTime } from '../../lib';
    import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
    import { deleteProblemResponse } from '../../services/method/delete';
    import { message, Modal } from 'ant-design-vue';
    import { useStore } from 'vuex';

    export default defineComponent({
        name: 'ManagerProblem',
        components: {
            CheckOutlined,
        },
        setup() {
            const router = useRouter();
            const store = useStore();
            const columns = ref([
                {
                    title: 'Nội dung câu hỏi',
                    dataIndex: 'nameProblem',
                    key: 'nameProblem',
                    sorter: (a, b) => ('' + a.nameProblem).localeCompare(b.nameProblem),
                },
                {
                    title: 'Nội dung ngắn',
                    dataIndex: 'shortContent',
                    key: 'shortContent',
                    sorter: (a, b) => ('' + a.shortContent).localeCompare(b.shortContent),
                },
                {
                    title: 'Thời gian',
                    dataIndex: 'timeCreate',
                    key: 'timeCreate',
                    sorter: (a, b) => a.timeCreate - b.timeCreate,
                },
                {
                    title: 'Thẻ',
                    key: 'tags',
                    dataIndex: 'tags',
                    sorter: (a, b) => a.tags.length - b.tags.length,
                },
                {
                    title: 'Có đáp án',
                    key: 'isHaveCorrectAnswer',
                    dataIndex: 'isHaveCorrectAnswer',
                    filters: [
                        {
                            text: 'Có đáp án',
                            value: true,
                        },
                        {
                            text: 'Chưa có đáp án',
                            value: false,
                        },
                    ],
                    onFilter: (value, record) => value === record.isHaveCorrectAnswer,
                },
                {
                    title: 'Hành động',
                    key: 'action',
                },
            ]);
            const dataSource = ref([]);
            const key = 'updatable';

            const handleAddProblem = () => {
                router.push('/create-problem');
            };
            const handleEditProblem = idProblem => {
                router.push(`/edit-problem/${idProblem}`);
            };
            const handleDeleteProblem = async idProblem => {
                Modal.confirm({
                    title: 'Bạn có chắc chắn muốn xóa câu hỏi này đi không?',
                    icon: createVNode(ExclamationCircleOutlined),
                    okText: 'Đồng ý',
                    cancelText: 'Hủy',
                    async onOk() {
                        const res = await deleteProblemResponse(idProblem);
                        if (res.status) {
                            message.success({ content: 'Lưu viết thành công!', key, duration: 2 });
                            await getDataInit();
                        } else {
                            message.error('Lưu viết thất bại');
                        }
                    },
                });
            };
            const getDataInit = async () => {
                const res = await getProblemManagerResponse();
                if (res.status) {
                    dataSource.value = res.data.map((problem, index) => ({
                        key: index,
                        id: problem._id.toString(),
                        email: problem.email,
                        nameProblem: problem.nameProblem,
                        shortContent: problem.shortContent,
                        timeCreate: problem.timeCreate,
                        isHaveCorrectAnswer: problem.isHaveCorrectAnswer,
                        tags: problem.tags.map(tag => tag.content),
                    }));
                }
            };

            onMounted(() => {
                getDataInit();
                if (store.state.userInfo.role === ADMIN) {
                    columns.value.unshift({
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                        sorter: (a, b) => ('' + a.email).localeCompare(b.email),
                    });
                }
            });

            return {
                dataSource,
                columns,
                handleAddProblem,
                PUBLIC,
                convertTimestampToTime,
                handleEditProblem,
                handleDeleteProblem,
            };
        },
    });
</script>

<style scoped lang="scss">
    .problem-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;

        &-title {
            font-size: 32px;
            font-weight: 500;
        }
    }
</style>
