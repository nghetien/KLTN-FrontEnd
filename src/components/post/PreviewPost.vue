<template>
    <router-link :to="`/post/${post._id}`" class="preview-post" @click="goToDetail">
        <a-avatar
            v-if="post.avatar"
            size="large"
            class="preview-post__avatar"
            :src="post.avatar"
            referrerpolicy="no-referrer"
        />
        <a-avatar v-else size="large" class="preview-post__avatar">
            <template #icon>
                <UserOutlined />
            </template>
        </a-avatar>
        <div>
            <div class="preview-post__header">
                <span class="preview-post__header-name">{{ post.email }}</span>
                <span class="preview-post__header-date">
                    {{ convertTimestamp(post.lastUpdate) }}
                </span>
            </div>
            <div class="preview-post__title">
                <h3 class="preview-post__title-name">{{ post.namePost }}</h3>
                <div class="preview-post__title-tag">
                    <a-tag color="processing" v-for="(tag, index) in post.tags" :key="index">{{
                        tag.content
                    }}</a-tag>
                </div>
            </div>
            <div class="preview-post__short-content">
                <p>
                    {{ post.shortContent }}
                </p>
            </div>
            <div class="preview-post__footer">
                <div class="preview-post__footer-item"><like-outlined /> {{ post.like }}</div>
                <div class="preview-post__footer-item"><dislike-outlined /> {{ post.dislike }}</div>
                <div class="preview-post__footer-item"><eye-outlined /> {{ post.view }}</div>
                <div class="preview-post__footer-item"><tag-outlined /> {{ post.tags.length }}</div>
                <div class="preview-post__footer-item"><message-outlined /> {{ post.comment }}</div>
                <div class="preview-post__footer-item"><book-outlined /> {{ post.bookmark }}</div>
            </div>
        </div>
    </router-link>
    <a-divider />
</template>

<script>
    import { UserOutlined } from '@ant-design/icons-vue';
    import { defineComponent } from 'vue';
    import { useRouter } from 'vue-router';
    import {
        EyeOutlined,
        TagOutlined,
        MessageOutlined,
        DislikeOutlined,
        LikeOutlined,
        BookOutlined,
    } from '@ant-design/icons-vue';
    import { convertTimestamp } from '../../lib/index';

    export default defineComponent({
        name: 'PreviewPost',
        components: {
            EyeOutlined,
            TagOutlined,
            MessageOutlined,
            DislikeOutlined,
            LikeOutlined,
            UserOutlined,
            BookOutlined,
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
                router.push(`/post/${props.post._id}`);
                window.scrollTo(0, 0);
            };

            return {
                convertTimestamp,
                goToDetail,
            };
        },
    });
</script>

<style scoped lang="scss">
    .preview-post {
        display: flex;
        cursor: pointer;

        &__avatar {
            flex-shrink: 0;
            margin-right: 10px;
        }

        &__header {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 10px;
            margin-top: 6px;
            line-height: 24px;

            &-name {
                font-weight: 500;
                color: var(--primary);
                margin-right: 10px;
                line-height: 26px;
            }

            &-date {
                color: var(--grey);
            }
        }

        &__title {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin: 5px 0;
            height: 32px;

            &-name {
                font-weight: 600;
                font-size: 24px;
                margin-right: 10px;
            }

            &-tag {
                padding: 5px 0px;
            }
        }

        &__short-content {
            line-height: 24px;
        }

        &__footer {
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
    }
</style>
