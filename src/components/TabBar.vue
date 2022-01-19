<template>
    <div>
        <div class="tab-bar__banner"></div>
        <a-layout-header class="custom-layout-header">
            <div class="custom-menu-container">
                <a-menu
                    class="custom-menu"
                    v-model:selectedKeys="selectedKeys"
                    theme="dark"
                    mode="horizontal"
                >
                    <a-menu-item key="1" class="custom-menu-item">Đang theo dõi</a-menu-item>
                    <a-menu-item key="2" class="custom-menu-item">Mới nhất</a-menu-item>
                    <a-menu-item key="3" class="custom-menu-item">Series</a-menu-item>
                </a-menu>
                <a-button type="primary"
                    ><router-link to="/create-post"
                        ><edit-outlined /> Viết bài</router-link
                    ></a-button
                >
            </div>
        </a-layout-header>
    </div>
</template>

<script>
    import { EditOutlined } from '@ant-design/icons-vue';
    import { defineComponent, ref } from 'vue';
    export default defineComponent({
        components: {
            EditOutlined,
        },
        setup() {
            return {
                selectedKeys: ref(['1']),
            };
        },
    });
</script>

<style scoped lang="scss">
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
</style>
