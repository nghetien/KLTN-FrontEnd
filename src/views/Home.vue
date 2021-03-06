<template>
    <div>
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
                    <a-menu-item key="trending" class="custom-menu-item">Xu hướng</a-menu-item>
                    <a-menu-item key="follow" class="custom-menu-item">Đang theo dõi</a-menu-item>
                    <a-menu-item key="ai_search" class="custom-menu-item">
                        Tìm kiếm liên quan
                    </a-menu-item>
                </a-menu>
                <a-button type="primary"
                    ><router-link to="/create-post"
                        ><edit-outlined /> Viết bài</router-link
                    ></a-button
                >
            </div>
        </a-layout-header>
        <div v-if="!aiSearchTab" class="content-view">
            <div class="content-view-list">
                <h2 class="content-view-list__title">BÀI VIẾT</h2>
                <PreviewPost v-for="(post, index) in allPost" :key="index" :post="post" />
                <div class="content-view__pagination">
                    <a-pagination
                        v-model:current="currentPage"
                        :total="maxPage ? maxPage : 0"
                        :pageSizeOptions="['10']"
                        :showSizeChanger="false"
                    />
                </div>
            </div>
            <div class="recommend">
                <h2 class="recommend__title">CÂU HỎI</h2>
                <RecommendProblem
                    v-for="(problem, index) in allRecommendProblem"
                    :key="index"
                    :problem="problem"
                />
            </div>
        </div>
        <div v-else>
            <AISearch />
        </div>
    </div>
</template>

<script>
    import { EditOutlined } from '@ant-design/icons-vue';
    import { PreviewPost, RecommendProblem } from '../components/index';
    import { defineComponent, onMounted, ref, watch } from 'vue';
    import {
        getAllPostResponse,
        getAllProblemResponse,
        getMaxPagePostResponse,
    } from '../services/method/get';
    import AISearch from './AISearch';

    export default defineComponent({
        name: 'Home',
        components: {
            PreviewPost,
            RecommendProblem,
            EditOutlined,
            AISearch,
        },
        setup() {
            const allPost = ref([]);
            const selectedKeys = ref(['new']);
            const currentPage = ref(1);
            const maxPage = ref(0);
            const allRecommendProblem = ref([]);
            const aiSearchTab = ref(false);

            const getRecommendProblem = async () => {
                const res = await getAllProblemResponse();
                if (res.status) {
                    allRecommendProblem.value = res.data;
                }
            };

            const getDataPost = async (query = {}) => {
                const res = await getAllPostResponse(query);
                if (res.status) {
                    allPost.value = res.data;
                }
            };

            const getMaxPagePost = async (query = {}) => {
                const res = await getMaxPagePostResponse(query);
                if (res.status) {
                    if (typeof res.data === 'number') {
                        maxPage.value = res.data;
                    } else {
                        maxPage.value = 0;
                    }
                }
            };

            onMounted(() => {
                Promise.all([getDataPost(), getMaxPagePost(), getRecommendProblem()]);
            });

            watch(selectedKeys, () => {
                currentPage.value = 1;
                if (selectedKeys.value[0] === 'follow') {
                    aiSearchTab.value = false;
                    Promise.all([
                        getDataPost({ queryUserFollow: true }),
                        getMaxPagePost({ queryUserFollow: true }),
                    ]);
                } else if (selectedKeys.value[0] === 'ai_search') {
                    aiSearchTab.value = true;
                } else if (selectedKeys.value[0] === 'trending') {
                    aiSearchTab.value = false;
                    Promise.all([
                        getDataPost({ trending: true }),
                        getMaxPagePost({ trending: true }),
                    ]);
                } else {
                    aiSearchTab.value = false;
                    Promise.all([getDataPost(), getMaxPagePost()]);
                }
            });

            watch(currentPage, () => {
                if (selectedKeys.value[0] === 'follow') {
                    getDataPost({ queryUserFollow: true, pagePost: currentPage.value - 1 });
                } else if (selectedKeys.value[0] === 'trending') {
                    getDataPost({ pagePost: currentPage.value - 1, trending: true });
                } else if (selectedKeys.value[0] === 'ai_search') {
                    return;
                } else {
                    getDataPost({ pagePost: currentPage.value - 1 });
                }
            });

            return {
                allPost,
                selectedKeys,
                currentPage,
                maxPage,
                allRecommendProblem,
                aiSearchTab,
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
            width: 70%;
            padding: 0 5px;

            &__title {
                font-weight: 500;
                font-size: 20px;
                color: var(--primary);
                margin-bottom: 20px;
            }
        }

        &__pagination {
            padding: 20px 0 30px 0;
            text-align: center;
        }

        .recommend {
            width: 30%;
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
