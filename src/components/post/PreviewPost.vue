<template>
    <div class="preview-post">
        <a-avatar
            size="large"
            class="preview-post__avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <div>
            <div class="preview-post__header">
                <span class="preview-post__header-name">Nghê Quyết Tiến</span>
                <span class="preview-post__header-date">Ngày 10 Tháng 10 Năm 2020</span>
            </div>
            <div class="preview-post__title">
                <h3 class="preview-post__title-name">Vẽ Quốc kỳ Việt Nam bằng Flutter</h3>
                <div class="preview-post__title-tag">
                    <a-tag color="processing">Tag 1</a-tag>
                    <a-tag color="processing">Tag 2</a-tag>
                    <a-tag color="processing">Tag 3</a-tag>
                    <a-tag color="processing">Tag 4</a-tag>
                    <a-tag color="processing">Tag 5</a-tag>
                </div>
            </div>
            <div class="preview-post__short-content">
                <p>
                    Vấn đề "Mình học Toán để làm gì vậy anh. Anh làm IT lâu rồi có bao giờ cần sử
                    dụng đến sin cos tan không?". Thằng em mình đang học lớp 12 hỏi
                </p>
            </div>
            <div class="preview-post__footer">
                <div class="preview-post__footer-item"><like-outlined /> 2.2K</div>
                <div class="preview-post__footer-item"><dislike-outlined /> 2.2K</div>
                <div class="preview-post__footer-item"><eye-outlined /> 2.2K</div>
                <div class="preview-post__footer-item"><tag-outlined /> 100</div>
                <div class="preview-post__footer-item"><message-outlined /> 200</div>
            </div>
        </div>
    </div>
    <a-divider />
</template>

<script>
    import { defineComponent } from 'vue';
    import {
        EyeOutlined,
        TagOutlined,
        MessageOutlined,
        DislikeOutlined,
        LikeOutlined,
    } from '@ant-design/icons-vue';

    export default defineComponent({
        name: 'PreviewPost',
        components: {
            EyeOutlined,
            TagOutlined,
            MessageOutlined,
            DislikeOutlined,
            LikeOutlined,
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
            margin: 10px 0;
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
