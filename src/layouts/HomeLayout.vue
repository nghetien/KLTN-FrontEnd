<template>
    <a-layout>
        <a-layout-header class="custom-header">
            <div class="add-flex-style">
                <router-link class="logo" to="/" @click="handleClickLogo">
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
                    <a-menu-item key="home" style="font-weight: bold">TRANG CHỦ</a-menu-item>
                    <a-menu-item key="post" style="font-weight: bold">BÀI VIẾT</a-menu-item>
                    <a-menu-item key="problem" style="font-weight: bold">CÂU HỎI</a-menu-item>
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
                    <BellComponent />
                    <MessComponent />
                    <a-avatar
                        v-if="avatar"
                        :src="avatar"
                        style="margin-right: 8px; flex-shrink: 0"
                    />
                    <a-avatar v-else style="margin-right: 8px; flex-shrink: 0">
                        <template #icon><UserOutlined /></template>
                    </a-avatar>
                    <a-dropdown>
                        <a class="ant-dropdown-link" style="flex-shrink: 0" @click.prevent>
                            {{ email }}
                            <DownOutlined />
                        </a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <router-link to="/manager" style="font-size: 16px">
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
                <a-button v-else size="large" type="primary" class="menu-item-right-style"
                    ><router-link to="/login">Đăng nhập</router-link>
                </a-button>
            </div>
        </a-layout-header>

        <div class="custom-content">
            <router-view />
        </div>

        <a-layout-footer :style="{ textAlign: 'center', background: '#001529', color: '#fff' }">
            Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
    </a-layout>
</template>

<script>
    import { defineComponent, ref, watch, onMounted } from 'vue';
    import { mapActions, useStore } from 'vuex';
    import { useRouter, useRoute } from 'vue-router';
    import {
        DownOutlined,
        SettingOutlined,
        LoginOutlined,
        UserOutlined,
    } from '@ant-design/icons-vue';
    import { MessComponent, BellComponent } from '../components/index';

    export default defineComponent({
        name: 'HomeLayout',
        components: {
            UserOutlined,
            DownOutlined,
            LoginOutlined,
            SettingOutlined,
            MessComponent,
            BellComponent,
        },
        setup() {
            const store = useStore();
            const router = useRouter();
            const route = useRoute();

            const selectedKeys = ref(['home']);
            const valueSearch = ref('');

            watch(selectedKeys, () => {
                if (selectedKeys.value[0] === 'home') {
                    router.push('/home');
                } else if (selectedKeys.value[0] === 'post') {
                    router.push('/post');
                } else if (selectedKeys.value[0] === 'problem') {
                    router.push('/problem');
                }
                window.scrollTo(0, 0);
            });

            const handleClickLogo = () => {
                selectedKeys.value[0] = 'home';
            };

            onMounted(() => {
                if (route.path === '/home') {
                    selectedKeys.value[0] = 'home';
                } else if (route.path === '/post') {
                    selectedKeys.value[0] = 'post';
                } else if (route.path === '/problem') {
                    selectedKeys.value[0] = 'problem';
                } else {
                    selectedKeys.value[0] = '';
                }
            });

            return {
                checkAccessToken: store.state.accessToken.length !== 0,
                email: store.state.userInfo.email,
                avatar: store.state.userInfo.avatar,
                valueSearch,
                selectedKeys,
                handleClickLogo,
            };
        },
        methods: {
            ...mapActions('auth', ['LOGOUT']),
            logoutAccount() {
                this.$gAuth.signOut();
                this.LOGOUT();
            },
        },
    });
</script>

<style scoped lang="scss">
    .custom-header {
        position: fixed;
        z-index: 2;
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
            justify-content: space-between;

            .input-search {
                margin: 0 24px;
                width: 60%;
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
        margin-top: 64px;
        background: #fff;
        min-height: 100vh;
    }
</style>
