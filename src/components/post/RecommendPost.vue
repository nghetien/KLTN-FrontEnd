<template>
    <router-link :to="`/post/${post._id.toString()}`" class="recommend-item" @click="goToDetail">
        <h3 class="recommend-item-title">{{ post.namePost ? post.namePost : '' }}</h3>
        <div class="more-info">
            <div class="more-info-item"><like-outlined /> {{ post.like ? post.like : 0 }}</div>
            <div class="more-info-item">
                <dislike-outlined /> {{ post.dislike ? post.dislike : 0 }}
            </div>
            <div class="more-info-item"><eye-outlined /> {{ post.view ? post.view : 0 }}</div>
            <div class="more-info-item">
                <tag-outlined /> {{ post.tags ? post.tags.length : 0 }}
            </div>
            <div class="more-info-item">
                <message-outlined /> {{ post.comment ? post.comment : 0 }}
            </div>
        </div>
        <p class="recommend-item__name">{{ post.email ? post.email : '' }}</p>
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
        name: 'RecommendPost',
        components: {
            EyeOutlined,
            TagOutlined,
            MessageOutlined,
            DislikeOutlined,
            LikeOutlined,
        },
        props: {
            post: {
                type: Object,
                default: () => ({}),
            },
        },
        setup(props) {
            const router = useRouter();
            const goToDetail = () => {
                router.push(`/post/${props.post._id.toString()}`);
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
