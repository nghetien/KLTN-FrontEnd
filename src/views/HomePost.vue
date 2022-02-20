<template>
    <div class="tab-bar__banner"></div>
    <a-layout-header class="custom-layout-header">
        <div class="custom-menu-container">
            <a-menu
                class="custom-menu"
                v-model:selectedKeys="selectedKeys"
                theme="dark"
                mode="horizontal"
            >
                <a-menu-item key="new" class="custom-menu-item">Mới nhất</a-menu-item>
                <a-menu-item key="follow" class="custom-menu-item">Đang theo dõi</a-menu-item>
            </a-menu>
            <a-button type="primary"
                ><router-link to="/create-post"><edit-outlined /> Viết bài</router-link></a-button
            >
        </div>
    </a-layout-header>
    <div class="content-view">
        <div class="content-view-list">
            <h2 class="content-view-list__title">BÀI VIẾT</h2>
            <PreviewPost v-for="(post, index) in allPost" :key="index" :post="post" />
        </div>
    </div>
</template>

<script>
    import { EditOutlined } from '@ant-design/icons-vue';
    import { PreviewPost } from '../components/index';
    import { defineComponent, onMounted, ref, watch } from 'vue';
    import { getAllPostResponse } from '../services/method/get';

    export default defineComponent({
        name: 'HomePost',
        components: {
            PreviewPost,
            EditOutlined,
        },
        setup() {
            const allPost = ref([]);
            const selectedKeys = ref(['new']);

            onMounted(async () => {
                const res = await getAllPostResponse();
                if (res.status) {
                    allPost.value = res.data;
                }
            });

            watch(selectedKeys, async () => {
                if (selectedKeys.value[0] === 'follow') {
                    const res = await getAllPostResponse({ queryFollow: true });
                    if (res.status) {
                        allPost.value = res.data;
                    }
                } else {
                    const res = await getAllPostResponse();
                    if (res.status) {
                        allPost.value = res.data;
                    }
                }
            });

            return {
                allPost,
                selectedKeys,
            };
        },
    });
</script>

<style scoped lang="scss">
    .content-view {
        display: flex;
        max-width: 1024px;
        padding-top: 20px;
        margin: 0 auto;

        &-list {
            width: 100%;
            padding: 0 5px;

            &__title {
                font-weight: 500;
                font-size: 20px;
                color: var(--primary);
                margin-bottom: 20px;
            }
        }
    }

    .tab-bar__banner {
        height: 400px;
        width: 100%;
        background-image: url('~@/assets/banner.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 80%;
    }

    .custom-layout-header {
        width: 100%;
        padding: 0 25px;

        .custom-menu-container {
            max-width: 1024px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 auto;
        }

        .custom-menu {
            line-height: 64px;
            .custom-menu-item {
                font-weight: bold !important;
            }
        }
    }

    @media only screen and (max-width: 1024px) {
        .content-view {
            max-width: 1024px;

            &-list {
                width: 100%;
                padding: 0 25px;
            }

            .recommend {
                display: none;
            }
        }
    }
</style>
