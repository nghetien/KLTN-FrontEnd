<template>
    <div class="recommend-item">
        <h3 class="recommend-item-title">Tìm kiếm file và duyệt file trong Nvim</h3>
        <div class="more-info">
            <div class="more-info-item"><like-outlined /> 2.2K</div>
            <div class="more-info-item"><dislike-outlined /> 2.2K</div>
            <div class="more-info-item"><eye-outlined /> 2.2K</div>
            <div class="more-info-item"><tag-outlined /> 100</div>
            <div class="more-info-item"><message-outlined /> 200</div>
        </div>
        <p class="recommend-item__name">Nguyễn Văn Đạt</p>
        <a-divider style="margin: 10px 0 !important" />
    </div>
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

    export default defineComponent({
        name: 'RecommendProblem',
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
