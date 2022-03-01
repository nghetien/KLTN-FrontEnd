<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="ant-pro-slider-menu-logo">
                <router-link to="/" class="router-link-active"
                    ><div style="display: flex; align-items: center; justify-content: center">
                        <img
                            src="~@/assets/logo.png"
                            class="logo"
                            alt="logo"
                            height="30"
                            style="margin-right: 5px"
                        />
                        <h1
                            style="color: white; font-weight: bold"
                            :style="{
                                display: collapsed ? 'none' : '',
                                transaction: 'all 0.2s',
                            }"
                        >
                            Group TI
                        </h1>
                    </div>
                </router-link>
            </div>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item key="profile" @click="handleClickToProfile">
                    <user-outlined />
                    <span>Thông tin cá nhân</span>
                </a-menu-item>
                <a-menu-item key="post" @click="handleClickToManagerPost">
                    <read-outlined />
                    <span>Quản lý bài viết</span>
                </a-menu-item>
                <a-menu-item key="problem" @click="handleClickToManagerProblem">
                    <question-outlined />
                    <span>Quản lý câu hỏi</span>
                </a-menu-item>
                <a-sub-menu key="tag">
                    <template #icon>
                        <book-outlined />
                    </template>
                    <template #title>Đã gắn thẻ</template>
                    <a-menu-item key="tag_blog">Bài viết</a-menu-item>
                    <a-menu-item key="tag_problem">Câu hỏi</a-menu-item>
                    <a-menu-item key="tag_series">Series</a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header
                class="header-layout-custom"
                :style="{
                    boxShadow: '0 1px 4px rgb(0 21 41 / 8%)',
                    width: !collapsed ? 'calc(100% - 200px)' : 'calc(100% - 80px)',
                }"
            >
                <div style="display: flex; flex: 1">
                    <div style="display: flex; justify-content: flex-start; align-items: center">
                        <menu-unfold-outlined
                            v-if="collapsed"
                            class="trigger"
                            @click="toggleCollapsed"
                            style="padding: 0 16px; font-size: 20px"
                        />
                        <menu-fold-outlined
                            v-else
                            class="trigger"
                            @click="toggleCollapsed"
                            style="padding: 0 16px; font-size: 20px"
                        />
                    </div>

                    <ManagerSearchBarComponent class="input-search" />
                </div>

                <div v-if="checkAccessToken" class="menu-item-right-style">
                    <BellComponent />
                    <MessComponent />
                    <a-avatar
                        v-if="avatar"
                        style="margin-right: 8px"
                        :src="avatar"
                        referrerpolicy="no-referrer"
                    >
                        <template #icon><UserOutlined /></template>
                    </a-avatar>
                    <a-avatar v-else style="margin-right: 8px">
                        <template #icon><UserOutlined /></template>
                    </a-avatar>
                    <a-dropdown>
                        <a class="ant-dropdown-link" @click.prevent>
                            {{ email }}
                            <DownOutlined />
                        </a>
                        <template #overlay>
                            <a-menu style="margin-top: 21px">
                                <a-menu-item>
                                    <router-link to="/" style="font-size: 16px">
                                        <home-outlined />
                                        Trang chủ
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
                <div v-else>
                    <a-button size="large" type="primary" class="menu-item-right-style"
                        ><router-link to="/login">Đăng nhập</router-link>
                    </a-button>
                </div>
            </a-layout-header>
            <a-layout-content
                :style="{
                    margin: '84px 16px 16px 16px',
                    padding: '24px',
                    background: '#fff',
                    minHeight: '100vh',
                }"
            >
                <router-view :key="$route.fullPath" />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    import {
        UserOutlined,
        ReadOutlined,
        QuestionOutlined,
        MenuUnfoldOutlined,
        MenuFoldOutlined,
        DownOutlined,
        BookOutlined,
        LoginOutlined,
        HomeOutlined,
    } from '@ant-design/icons-vue';
    import { computed, defineComponent, ref, onMounted } from 'vue';
    import { mapActions, useStore } from 'vuex';
    import { useRouter, useRoute } from 'vue-router';
    import { MessComponent, BellComponent } from '../components/index';
    import { ManagerSearchBarComponent } from '../components/index';

    export default defineComponent({
        name: 'ManagerLayout',
        components: {
            UserOutlined,
            ReadOutlined,
            QuestionOutlined,
            MenuUnfoldOutlined,
            MenuFoldOutlined,
            DownOutlined,
            BookOutlined,
            LoginOutlined,
            HomeOutlined,
            ManagerSearchBarComponent,
            MessComponent,
            BellComponent,
        },
        setup() {
            const router = useRouter();
            const route = useRoute();
            const store = useStore();

            const collapsed = ref(true);
            const selectedKeys = ref(['profile']);
            const checkAccessToken = computed(() => store.state.accessToken.length !== 0);
            const email = computed(() => store.state.userInfo.email);
            const avatar = computed(() => store.state.userInfo.avatar);

            const handleClickToProfile = () => {
                router.push(`/manager/profile/${store.state.userInfo.email}`);
            };
            const handleClickToManagerPost = () => {
                router.push(`/manager/post`);
            };
            const handleClickToManagerProblem = () => {
                router.push(`/manager/problem`);
            };

            onMounted(() => {
                if (route.path === '/manager/post') {
                    selectedKeys.value = ['post'];
                } else if (route.path === '/manager/problem') {
                    selectedKeys.value = ['problem'];
                }
            });

            return {
                checkAccessToken,
                avatar,
                email,
                collapsed,
                selectedKeys,
                handleClickToProfile,
                handleClickToManagerPost,
                handleClickToManagerProblem,
            };
        },
        methods: {
            ...mapActions('auth', ['LOGOUT']),
            logoutAccount() {
                this.$gAuth.signOut();
                this.LOGOUT();
            },
            toggleCollapsed() {
                this.collapsed = !this.collapsed;
            },
        },
    });
</script>

<style scoped lang="scss">
    .menu-item-right-style {
        display: flex;
        align-items: center;
    }
    .header-layout-custom {
        position: fixed;
        z-index: 1;
        background: #fff;
        padding: 0 16px 0 0 !important;
        display: flex;
        justify-content: space-between;
        transition: all 0.2s;

        .input-search {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 60%;
            margin-left: 16px;
        }
    }

    .ant-pro-slider-menu-logo {
        position: relative;
        height: 60px;
        overflow: hidden;
        line-height: 64px;
        display: flex;
        padding-left: 26px;
        justify-content: flex-start;
        align-items: center;
    }

    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.3);
        margin: 16px;
    }

    .site-layout .site-layout-background {
        background: #fff;
    }
</style>
