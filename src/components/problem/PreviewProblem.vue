<template>
    <router-link :to="`/problem/${problem._id}`" class="preview-problem" @click="goToDetail">
        <a-avatar
            v-if="problem.avatar"
            size="large"
            class="preview-problem__avatar"
            :src="problem.avatar"
            referrerpolicy="no-referrer"
        />
        <a-avatar v-else size="large" class="preview-problem__avatar">
            <template #icon>
                <UserOutlined />
            </template>
        </a-avatar>
        <div>
            <div class="preview-problem__header">
                <span class="preview-problem__header-name">{{ problem.email }}</span>
                <span class="preview-problem__header-date">
                    {{ convertTimestamp(problem.lastUpdate) }}
                </span>
            </div>
            <div class="preview-problem__title">
                <h3 class="preview-problem__title-name">{{ problem.nameProblem }}</h3>
                <div class="preview-problem__title-tag">
                    <a-tag color="processing" v-for="(tag, index) in problem.tags" :key="index">{{
                        tag.content
                    }}</a-tag>
                </div>
            </div>
            <div class="preview-problem__short-content">
                <p>
                    {{ problem.shortContent }}
                </p>
            </div>
            <div class="preview-problem__footer">
                <div class="preview-problem__footer-item"><like-outlined /> {{ problem.like }}</div>
                <div class="preview-problem__footer-item">
                    <dislike-outlined /> {{ problem.dislike }}
                </div>
                <div class="preview-problem__footer-item"><eye-outlined /> {{ problem.view }}</div>
                <div class="preview-problem__footer-item">
                    <tag-outlined /> {{ problem.tags.length }}
                </div>
                <div class="preview-problem__footer-item">
                    <message-outlined /> {{ problem.comment }}
                </div>
                <div class="preview-problem__footer-item">
                    <book-outlined /> {{ problem.bookmark }}
                </div>
                <div v-if="problem.isHaveCorrectAnswer" class="preview-problem__footer-item">
                    <check-outlined style="color: #41b883" />
                </div>
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
        CheckOutlined,
    } from '@ant-design/icons-vue';
    import { convertTimestamp } from '../../lib/index';

    export default defineComponent({
        name: 'PreviewProblem',
        components: {
            EyeOutlined,
            TagOutlined,
            MessageOutlined,
            DislikeOutlined,
            LikeOutlined,
            UserOutlined,
            BookOutlined,
            CheckOutlined,
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
                router.push(`/problem/${props.problem._id}`);
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
    .preview-problem {
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
