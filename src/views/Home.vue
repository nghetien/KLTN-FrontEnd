<template>
    <div>
        <TabBar />
        <div class="content-view">
            <div class="content-view-list">
                <h2 class="content-view-list__title">BÀI VIẾT</h2>
                <PreviewPost v-for="(post, index) in allPost" :key="index" :post="post" />
            </div>
            <div class="recommend">
                <h2 class="recommend__title">CÂU HỎI MỚI NHẤT</h2>
                <RecommendProblem />
                <RecommendProblem />
                <RecommendProblem />
                <RecommendProblem />
            </div>
        </div>
    </div>
</template>

<script>
    import { PreviewPost, TabBar, RecommendProblem } from '../components/index';
    import { defineComponent, onMounted, ref } from 'vue';
    import { getAllPostResponse } from '../services/method/get';

    export default defineComponent({
        name: 'Home',
        components: {
            PreviewPost,
            TabBar,
            RecommendProblem,
        },
        setup() {
            const allPost = ref([]);

            onMounted(async () => {
                const res = await getAllPostResponse();
                if (res.status) {
                    allPost.value = res.data;
                }
            });

            return {
                allPost,
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
