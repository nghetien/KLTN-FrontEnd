<template>
    <a-layout>
        <a-layout-header class="custom-header">
            <div class="add-flex-style">
                <router-link class="logo" to="/">
                    <img
                        src="~@/assets/logo.png"
                        class="logo"
                        alt="logo"
                        style="height: 100%; width: 100%"
                    />
                </router-link>
                <a-menu
                    v-model:selectedKeys="selectedKeys"
                    theme="light"
                    mode="horizontal"
                    :style="{
                        lineHeight: '64px',
                        borderBottom: 'none',
                    }"
                >
                    <a-menu-item key="home" style="font-weight: bold"
                        >TRANG CHỦ</a-menu-item
                    >
                    <a-menu-item key="blog" style="font-weight: bold"
                        >BÀI VIẾT</a-menu-item
                    >
                    <a-menu-item key="problem" style="font-weight: bold"
                        >CÂU HỎI</a-menu-item
                    >
                </a-menu>
            </div>
            <div class="add-flex-style menu-right-style">
                <a-input-search
                    v-model:value="valueSearch"
                    placeholder="Tìm kiếm"
                    size="large"
                    class="input-search"
                />
                <div v-if="checkAccessToken" class="menu-item-right-style">
                    <a-avatar style="margin-right: 8px; flex-shrink: 0">
                        <template #icon><UserOutlined /></template>
                    </a-avatar>
                    <a-dropdown>
                        <a
                            class="ant-dropdown-link"
                            style="flex-shrink: 0"
                            @click.prevent
                        >
                            {{ email }}
                            <DownOutlined />
                        </a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <router-link
                                        to="/manager"
                                        style="font-size: 16px"
                                    >
                                        <setting-outlined />
                                        Quản lý thông tin
                                    </router-link>
                                </a-menu-item>
                                <a-menu-item>
                                    <router-link
                                        to="/login"
                                        style="font-size: 16px"
                                        @click="logoutAccount"
                                    >
                                        <login-outlined />
                                        Đăng xuất
                                    </router-link>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
                <a-button
                    v-else
                    size="large"
                    type="primary"
                    class="menu-item-right-style"
                    ><router-link to="/login">Đăng nhập</router-link>
                </a-button>
            </div>
        </a-layout-header>

        <a-layout-content class="custom-content">
            <div class="custom-content_container">
                <router-view />
            </div>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }">
            Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
    </a-layout>
</template>

<script>
    import { defineComponent, ref } from 'vue';
    import { mapActions, useStore } from 'vuex';
    import {
        DownOutlined,
        SettingOutlined,
        LoginOutlined,
        UserOutlined,
    } from '@ant-design/icons-vue';
    import { LOGOUT_ACTION } from '../store/modules/auth/types';

    export default defineComponent({
        name: 'HomeLayout',
        components: {
            UserOutlined,
            DownOutlined,
            LoginOutlined,
            SettingOutlined,
        },
        setup() {
            const store = useStore();

            const selectedKeys = ref([]);
            let checkAccessToken = ref(store.state.accessToken.length !== 0);
            let email = ref(store.state.userInfo.email);
            let valueSearch = ref('');

            return {
                checkAccessToken,
                email,
                valueSearch,
                selectedKeys,
            };
        },
        methods: {
            ...mapActions('auth', {
                logout: LOGOUT_ACTION,
            }),
            logoutAccount() {
                this.$gAuth.signOut();
                this.logout();
            },
        },
    });
</script>

<style scoped lang="scss">
    .custom-header {
        position: fixed;
        z-index: 1;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        padding: 0 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .add-flex-style {
            display: flex;
            align-items: center;
        }

        .menu-right-style {
            width: 100%;

            .input-search {
                margin: 0 24px;
            }

            .menu-item-right-style {
                display: flex;
                flex-shrink: 0;
                align-items: center;
            }
        }

        .logo {
            height: 40px;
            width: 40px;
        }
    }

    .custom-content {
        padding: 0 24px;
        margin-top: 92px;

        &_container {
            background: #fff;
            padding: 24px;
            min-height: 100vh;
        }
    }
</style>
