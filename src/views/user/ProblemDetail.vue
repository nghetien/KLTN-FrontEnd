<template>
    <div class="post-detail">
        <div class="post-detail__banner"></div>
        <div class="post-detail__container">
            <div class="post-detail__info">
                <CaretUpOutlined
                    @click="handleLike"
                    :style="{
                        color: like === 1 ? 'var(--primary)' : 'var(--grey)',
                    }"
                    class="post-detail__icon"
                />
                <h6 class="post-detail__info-react">
                    {{ countLike }}
                </h6>
                <CaretDownOutlined
                    @click="handleDislike"
                    :style="{
                        color: like === -1 ? 'var(--primary)' : 'var(--grey)',
                    }"
                    class="post-detail__icon"
                />
                <BookOutlined
                    :style="{
                        color: isBookmark ? 'var(--primary)' : 'var(--grey)',
                    }"
                    @click="toggleBookmark"
                    class="post-detail__icon"
                    style="margin-top: 20px"
                />
                <CheckOutlined
                    :style="{
                        color: isHaveCorrectAnswer ? 'var(--green)' : 'var(--grey)',
                    }"
                    @click="toggleCorrectAnswer"
                    class="post-detail__icon"
                    style="margin-top: 20px"
                />
            </div>
            <div class="post-detail__view">
                <div class="post-detail__view-info">
                    <div class="post-detail__view-user">
                        <a-avatar
                            v-if="problemDetail.avatar"
                            :src="problemDetail.avatar"
                            size="large"
                            class="preview-post__avatar"
                        />
                        <a-avatar v-else size="large" class="preview-post__avatar">
                            <template #icon>
                                <UserOutlined />
                            </template>
                        </a-avatar>
                        <router-link to="/" class="post-detail__view-user-name">{{
                            problemDetail.email ? problemDetail.email : ''
                        }}</router-link>
                        <a-button v-if="isShowFollow" type="primary" ghost @click="handleFollow">{{
                            isFollow ? 'Bỏ theo dõi' : 'Theo dõi'
                        }}</a-button>
                    </div>
                    <div class="post-detail__view-count">
                        <div class="post-detail__view-count-item">
                            <EyeOutlined class="post-detail__view-count-item-icon" />
                            <p>{{ problemDetail.view }}</p>
                        </div>
                        <div class="post-detail__view-count-item">
                            <MessageOutlined class="post-detail__view-count-item-icon" />
                            <p>{{ problemDetail.comment }}</p>
                        </div>
                        <div class="post-detail__view-count-item">
                            <BookOutlined class="post-detail__view-count-item-icon" />
                            <p>{{ problemDetail.bookmark }}</p>
                        </div>
                    </div>
                </div>
                <h2 style="font-size: 36px; padding: 20px 15px; font-weight: 600">
                    {{ problemDetail.nameProblem }}
                </h2>
                <div class="post-detail__view-show ql-snow">
                    <div
                        class="ql-editor"
                        style="width: 100%; overflow: hidden"
                        v-html="renderContent"
                    ></div>
                </div>
                <div style="margin-top: 40px; padding: 0 15px">
                    <h2>
                        <i>Chỉnh sửa mới nhất:</i> {{ convertTimestamp(problemDetail.lastUpdate) }}
                    </h2>
                </div>
                <div class="post-detail__comment">
                    <Comment
                        @changeCountComment="changeCountComment($event)"
                        :idObject="route.params.idProblem"
                        :type="PROBLEM"
                    />
                </div>
            </div>
            <div class="post-detail__recommend">
                <h2 class="post-detail__recommend-title">CÂU HỎI MỚI NHẤT</h2>
                <RecommendPost />
                <RecommendPost />
                <RecommendPost />
                <RecommendPost />
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, onMounted, ref, computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import {
        CaretUpOutlined,
        CaretDownOutlined,
        BookOutlined,
        UserOutlined,
        EyeOutlined,
        MessageOutlined,
        CheckOutlined,
    } from '@ant-design/icons-vue';
    import { RecommendPost, Comment } from '../../components/index';
    import {
        getBookmarkResponse,
        getFollowedResponse,
        getLikeOrDislikeResponse,
        getProblemByIdResponse,
        toggleCorrectAnswerResponse,
    } from '../../services/method/get';
    import { message } from 'ant-design-vue';
    import { markdownItRender, renderKatex } from '../../lib';
    import { PROBLEM } from '../../constants/index';
    import { convertTimestamp } from '../../lib/index';
    import {
        handleLikeResponse,
        toggleBookmarkResponse,
        toggleFollowResponse,
    } from '../../services/method/post';

    export default defineComponent({
        name: 'ProblemDetail',
        components: {
            CaretUpOutlined,
            CaretDownOutlined,
            BookOutlined,
            UserOutlined,
            EyeOutlined,
            MessageOutlined,
            RecommendPost,
            Comment,
            CheckOutlined,
        },
        setup() {
            const route = useRoute();
            const router = useRouter();
            const store = useStore();

            const problemDetail = ref({});
            const isBookmark = ref(false);
            const like = ref(0);
            const countLike = ref(0);
            const isHaveCorrectAnswer = ref(false);
            const isFollow = ref(false);
            const isShowFollow = ref(false);

            const loadDataInit = async () => {
                const res = await getProblemByIdResponse(route.params.idProblem);
                if (res.status) {
                    problemDetail.value = res.data;
                    countLike.value = problemDetail.value.like - problemDetail.value.dislike;
                    isHaveCorrectAnswer.value = problemDetail.value.isHaveCorrectAnswer;
                } else {
                    message.error('Tải câu hỏi thất bại');
                    await router.push('/');
                }
            };

            const loadIsBookmark = async () => {
                const res = await getBookmarkResponse(route.params.idProblem);
                if (res.status) {
                    isBookmark.value = res.data.status;
                }
            };

            const loadLikeOrDislike = async () => {
                const res = await getLikeOrDislikeResponse(route.params.idProblem);
                if (res.status) {
                    if (Object.keys(res.data).length !== 0) {
                        if (res.data.isLike) {
                            like.value = 1;
                        } else {
                            like.value = -1;
                        }
                    } else {
                        like.value = 0;
                    }
                }
            };

            const loadFollowed = async () => {
                const res = await getFollowedResponse(problemDetail.value.email);
                if (res.status) {
                    isFollow.value = true;
                }
            };

            const handleLike = async () => {
                const res = await handleLikeResponse(route.params.idProblem, {
                    type: PROBLEM,
                    isLike: true,
                });
                if (res.status) {
                    if (like.value === 1) {
                        like.value = 0;
                        countLike.value -= 1;
                    } else if (like.value === -1) {
                        like.value = 1;
                        countLike.value += 2;
                    } else {
                        like.value = 1;
                        countLike.value += 1;
                    }
                }
            };

            const handleDislike = async () => {
                const res = await handleLikeResponse(route.params.idProblem, {
                    type: PROBLEM,
                    isLike: false,
                });
                if (res.status) {
                    if (like.value === 1) {
                        like.value = -1;
                        countLike.value -= 2;
                    } else if (like.value === -1) {
                        like.value = 0;
                        countLike.value += 1;
                    } else {
                        like.value = -1;
                        countLike.value -= 1;
                    }
                }
            };

            onMounted(async () => {
                await Promise.all([loadDataInit(), loadIsBookmark(), loadLikeOrDislike()]);
                if (store.state.userInfo.email !== problemDetail.value.email) {
                    isShowFollow.value = true;
                    await loadFollowed();
                }
            });

            const changeCountComment = value => {
                problemDetail.value.comment += value;
            };

            const toggleBookmark = async () => {
                await toggleBookmarkResponse(route.params.idProblem, PROBLEM);
                isBookmark.value = !isBookmark.value;
                if (isBookmark.value) {
                    problemDetail.value.bookmark += 1;
                } else {
                    problemDetail.value.bookmark -= 1;
                }
            };

            const toggleCorrectAnswer = async () => {
                if (store.state.userInfo.email === problemDetail.value.email) {
                    isHaveCorrectAnswer.value = !isHaveCorrectAnswer.value;
                    await toggleCorrectAnswerResponse(problemDetail.value._id);
                }
            };

            const handleFollow = async () => {
                isFollow.value = !isFollow.value;
                await toggleFollowResponse({
                    email: store.state.userInfo.email,
                    emailUserFollow: problemDetail.value.email,
                });
            };

            const renderContent = computed(() => {
                if (problemDetail.value && problemDetail.value.typeContent) {
                    if (problemDetail.value.typeContent === 'html') {
                        return renderKatex(problemDetail.value.content);
                    } else {
                        return renderKatex(markdownItRender(problemDetail.value.content));
                    }
                } else {
                    return '';
                }
            });

            return {
                PROBLEM,
                route,
                problemDetail,
                isBookmark,
                like,
                countLike,
                isHaveCorrectAnswer,
                isFollow,
                isShowFollow,
                renderContent,
                handleLike,
                handleDislike,
                convertTimestamp,
                changeCountComment,
                toggleBookmark,
                toggleCorrectAnswer,
                handleFollow,
            };
        },
    });
</script>

<style scoped lang="scss">
    .post-detail {
        &__banner {
            height: 250px;
            width: 100%;
            background-image: url('~@/assets/post_detail.png');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 0 80%;
        }

        &__container {
            display: flex;
            max-width: 1284px;
            margin: 70px auto;
        }

        &__info {
            margin-top: 68px;
            width: 100px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            text-align: center;
            font-size: 36px;
            font-weight: 400;
            color: var(--grey);

            &-react {
                color: var(--grey);
            }
        }

        &__icon {
            cursor: pointer;
        }

        &__view {
            flex: 1;
            padding-right: 20px;

            &-info {
                padding: 0 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }

            &-user {
                &-name {
                    font-weight: 500;
                    color: var(--primary);
                    margin: 0 10px;
                    line-height: 26px;
                }
            }

            &-count {
                display: flex;
                align-items: center;
                justify-content: flex-end;

                &-item {
                    font-size: 18px;
                    font-weight: 400;
                    color: var(--grey);
                    display: flex;
                    margin-left: 12px;
                    margin-top: 10px;
                    margin-bottom: 10px;

                    &-icon {
                        cursor: pointer;
                        margin-right: 3px;
                    }
                }
            }
        }

        &__recommend {
            width: 300px;
            margin-top: 10px;

            &-title {
                font-weight: 500;
                font-size: 20px;
                color: var(--primary);
                margin-bottom: 20px;
            }
        }

        &__comment {
            padding: 0 15px;
            margin-top: 50px;
        }
    }

    @media only screen and (max-width: 1284px) {
        .post-detail__recommend {
            display: none;
        }
    }

    @media only screen and (max-width: 800px) {
        .post-detail__view-info {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }
    }
</style>
