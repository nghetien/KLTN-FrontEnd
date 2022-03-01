<template>
    <div>
        <div class="post-header">
            <h2 class="post-header-title">Quản lý bài viết</h2>
            <a-button type="primary" @click="handleAddPost">Thêm bài viết</a-button>
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
                <template v-else-if="column.key === 'status'">
                    <span>
                        <a-tag :color="record.status === PUBLIC ? 'green' : 'red'">
                            {{ record.status === PUBLIC ? 'Công khai' : 'Riêng tư' }}
                        </a-tag>
                    </span>
                </template>
                <template v-else-if="column.key === 'timeCreate'">
                    <span>{{ convertTimestampToTime(record.timeCreate) }}</span>
                </template>
                <template v-else-if="column.key === 'action'">
                    <a-button
                        style="background: var(--yellow); border-color: var(--yellow)"
                        type="primary"
                        >Chỉnh sửa</a-button
                    >
                </template>
            </template>
        </a-table>
    </div>
</template>

<script>
    import { defineComponent, onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { getPostManagerResponse } from '../../services/method/get';
    import { PUBLIC } from '../../constants';
    import { convertTimestampToTime } from '../../lib';
    const columns = [
        {
            title: 'Tên bài viết',
            dataIndex: 'namePost',
            key: 'namePost',
            sorter: (a, b) => ('' + a.namePost).localeCompare(b.namePost),
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
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            sorter: (a, b) => a.status - b.status,
            filters: [
                {
                    text: 'Công khai',
                    value: 'PUBLIC',
                },
                {
                    text: 'Riêng tư',
                    value: 'PRIVATE',
                },
            ],
            filterMultiple: false,
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: 'Hành động',
            key: 'action',
        },
    ];
    export default defineComponent({
        name: 'ManagerPost',
        setup() {
            const router = useRouter();
            const dataSource = ref([]);

            const handleAddPost = () => {
                router.push('/create-post');
            };

            onMounted(async () => {
                const res = await getPostManagerResponse();
                if (res.status) {
                    dataSource.value = res.data.map((post, index) => ({
                        key: index,
                        id: post._id.toString(),
                        namePost: post.namePost,
                        shortContent: post.shortContent,
                        timeCreate: post.timeCreate,
                        status: post.statusPost,
                        tags: post.tags.map(tag => tag.content),
                    }));
                }
            });

            return {
                dataSource,
                columns,
                handleAddPost,
                PUBLIC,
                convertTimestampToTime,
            };
        },
    });
</script>

<style scoped lang="scss">
    .post-header {
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
