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
                <a-menu-item key="correctAnswer" class="custom-menu-item">Có đáp án</a-menu-item>
                <a-menu-item key="notCorrectAnswer" class="custom-menu-item"
                    >Chưa có đáp án</a-menu-item
                >
            </a-menu>
            <a-button type="primary"
                ><router-link to="/create-problem"
                    ><edit-outlined /> Đặt câu hỏi</router-link
                ></a-button
            >
        </div>
    </a-layout-header>
    <div class="content-view">
        <div class="content-view-list">
            <h2 class="content-view-list__title">CÂU HỎI</h2>
            <PreviewProblem
                v-for="(problem, index) in allProblem"
                :key="index"
                :problem="problem"
            />
            <div class="content-view__pagination">
                <a-pagination
                    v-model:current="currentPage"
                    :total="maxPage"
                    :pageSizeOptions="['10']"
                    :showSizeChanger="false"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, onMounted, ref, watch } from 'vue';
    import { PreviewProblem } from '../components/index';
    import { EditOutlined } from '@ant-design/icons-vue';
    import { getAllProblemResponse, getMaxPageProblemResponse } from '../services/method/get';
    export default defineComponent({
        name: 'HomeProblem',
        components: {
            EditOutlined,
            PreviewProblem,
        },
        setup() {
            const allProblem = ref([]);
            const selectedKeys = ref(['new']);
            const currentPage = ref(1);
            const maxPage = ref(0);

            const getDataProblem = async (query = {}) => {
                const res = await getAllProblemResponse(query);
                if (res.status) {
                    allProblem.value = res.data;
                }
            };

            const getMaxPageProblem = async (query = {}) => {
                const res = await getMaxPageProblemResponse(query);
                if (res.status) {
                    if (typeof res.data === 'number') {
                        maxPage.value = res.data;
                    } else {
                        maxPage.value = 0;
                    }
                }
            };

            onMounted(() => {
                Promise.all([getDataProblem(), getMaxPageProblem()]);
            });

            watch(selectedKeys, () => {
                let dataQuery;
                if (selectedKeys.value[0] === 'follow') {
                    dataQuery = {
                        queryUserFollow: true,
                    };
                } else if (selectedKeys.value[0] === 'correctAnswer') {
                    dataQuery = {
                        isHaveCorrectAnswer: true,
                    };
                } else if (selectedKeys.value[0] === 'notCorrectAnswer') {
                    dataQuery = {
                        isHaveCorrectAnswer: false,
                    };
                } else {
                    dataQuery = {};
                }
                Promise.all([getDataProblem(dataQuery), getMaxPageProblem(dataQuery)]);
            });

            watch(currentPage, () => {
                let dataQuery;
                if (selectedKeys.value[0] === 'follow') {
                    dataQuery = {
                        queryUserFollow: true,
                    };
                } else if (selectedKeys.value[0] === 'correctAnswer') {
                    dataQuery = {
                        isHaveCorrectAnswer: true,
                    };
                } else if (selectedKeys.value[0] === 'notCorrectAnswer') {
                    dataQuery = {
                        isHaveCorrectAnswer: false,
                    };
                } else {
                    dataQuery = {};
                }
                getDataProblem({ ...dataQuery, ...{ pageProblem: currentPage.value - 1 } });
            });

            return {
                allProblem,
                selectedKeys,
                currentPage,
                maxPage,
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

        &__pagination {
            padding: 20px 0 30px 0;
            text-align: center;
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
