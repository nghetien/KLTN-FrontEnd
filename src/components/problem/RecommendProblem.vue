<template>
    <router-link
        :to="`/problem/${problem._id.toString()}`"
        class="recommend-item"
        @click="goToDetail"
    >
        <h3 class="recommend-item-title">{{ problem.nameProblem ? problem.nameProblem : '' }}</h3>
        <div class="more-info">
            <div class="more-info-item">
                <like-outlined /> {{ problem.like ? problem.like : 0 }}
            </div>
            <div class="more-info-item">
                <dislike-outlined /> {{ problem.dislike ? problem.dislike : 0 }}
            </div>
            <div class="more-info-item"><eye-outlined /> {{ problem.view ? problem.view : 0 }}</div>
            <div class="more-info-item">
                <tag-outlined /> {{ problem.tags ? problem.tags.length : 0 }}
            </div>
            <div class="more-info-item">
                <message-outlined /> {{ problem.comment ? problem.comment : 0 }}
            </div>
        </div>
        <p class="recommend-item__name">{{ problem.email ? problem.email : '' }}</p>
        <a-divider style="margin: 10px 0 !important" />
    </router-link>
</template>

<script>
    import { defineComponent } from 'vue';
    import {
        DislikeOutlined,
        EyeOutlined,
        LikeOutlined,
        MessageOutlined,
        TagOutlined,
    } from '@ant-design/icons-vue';
    import { useRouter } from 'vue-router';

    export default defineComponent({
        name: 'RecommendProblem',
        components: {
            EyeOutlined,
            TagOutlined,
            MessageOutlined,
            DislikeOutlined,
            LikeOutlined,
        },
        props: {
            problem: {
                type: Object,
                default: () => ({}),
            },
        },
        setup(props) {
            const router = useRouter();
            const goToDetail = () => {
                router.push(`/problem/${props.problem._id.toString()}`);
                window.scrollTo(0, 0);
            };

            return {
                goToDetail,
            };
        },
    });
</script>

<style scoped lang="scss">
    .recommend-item {
        cursor: pointer;

        &-title {
            font-weight: 500;
            font-size: 18px;
            margin-right: 10px;
        }

        .more-info {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding: 10px 0;
            font-weight: 400;
            color: var(--grey);

            &-item {
                margin-right: 10px;
                padding: 5px 0;
            }
        }

        &__name {
            font-weight: 400;
            color: var(--grey);
        }
    }
</style>
