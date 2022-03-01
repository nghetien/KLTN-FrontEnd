<template>
    <div class="content-view">
        <div class="content-view-post">
            <h2 class="content-view-title">BÀI VIẾT</h2>
            <PreviewPost v-for="(post, index) in allPost" :key="index" :post="post" />
        </div>
        <div class="content-view-problem">
            <h2 class="content-view-title">CÂU HỎI</h2>
            <PreviewProblem
                v-for="(problem, index) in allProblem"
                :key="index"
                :problem="problem"
                style="display: flex"
            />
        </div>
    </div>
</template>

<script>
    import { defineComponent, onMounted, ref } from 'vue';
    import { getHistoryUserResponse } from '../../services/method/get';
    import { PreviewPost, PreviewProblem } from '../../components';
    import { useRoute } from 'vue-router';

    export default defineComponent({
        name: 'ProfileHistory',
        components: {
            PreviewPost,
            PreviewProblem,
        },
        setup() {
            const route = useRoute();
            const allPost = ref([]);
            const allProblem = ref([]);

            onMounted(async () => {
                const res = await getHistoryUserResponse(route.params.email);
                if (res.status) {
                    allPost.value = res.data.post;
                    allProblem.value = res.data.problem;
                }
            });

            return {
                allPost,
                allProblem,
            };
        },
    });
</script>

<style scoped lang="scss">
    .content-view {
        padding: 0 50px;
        display: flex;
        justify-content: space-around;

        &-post {
            padding: 40px 20px;
            width: 50%;
            display: flex;
            align-items: center;
            flex-direction: column;
        }

        &-problem {
            padding: 40px 20px;
            width: 50%;
            display: flex;
            align-items: center;
            flex-direction: column;
        }

        &-title {
            text-align: center;
            font-weight: 500;
            font-size: 20px;
            color: var(--primary);
            margin-bottom: 20px;
        }
    }

    @media only screen and (max-width: 756px) {
        .content-view {
            display: flex;
            align-items: center;
            flex-direction: column;
            &-post {
                width: 100%;
            }

            &-problem {
                width: 100%;
            }
        }
    }
</style>
