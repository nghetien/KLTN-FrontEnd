<template>
    <a-row type="flex" justify="center">
        <a-col :xs="12" :sm="10" :md="8" :lg="6" :xl="6">
            <a-form
                class="user-layout-login"
                layout="vertical"
                :model="formLogin"
                :validate-messages="validateMessages"
                name="form_login"
                @finish="onFinish"
            >
                <a-form-item
                    label="Email"
                    name="email"
                    :rules="[{ required: true, type: 'email' }]"
                >
                    <a-input placeholder="Email" v-model:value="formLogin.email" size="large">
                        <template #prefix
                            ><user-outlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                    </a-input>
                </a-form-item>

                <a-form-item
                    label="Mật khẩu"
                    name="password"
                    size="large"
                    :rules="[{ required: true }]"
                >
                    <a-input-password
                        size="large"
                        v-model:value="formLogin.password"
                        placeholder="Password"
                    >
                        <template #prefix
                            ><lock-outlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                    </a-input-password>
                </a-form-item>

                <div class="login-form-wrap">
                    <a-form-item name="remember" no-style>
                        <a-checkbox v-model:checked="formLogin.remember">Nhớ tài khoản</a-checkbox>
                    </a-form-item>
                </div>

                <a-form-item>
                    <a-button
                        size="large"
                        type="primary"
                        html-type="submit"
                        class="login-form-button"
                    >
                        Đăng nhập
                    </a-button>
                </a-form-item>

                <div class="login-form-wrap">
                    <a-button
                        size="large"
                        type="primary"
                        danger
                        class="another-login-button"
                        @click="loginWithGoogle"
                    >
                        <google-outlined style="color: white" />
                        Đăng nhập với Google
                    </a-button>
                </div>
            </a-form>
        </a-col>
    </a-row>
</template>

<script>
    import { defineComponent, ref } from 'vue';
    import { mapActions } from 'vuex';
    import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons-vue';
    import { message } from 'ant-design-vue';

    const key = 'updatable';

    export default defineComponent({
        name: 'Login',
        components: {
            UserOutlined,
            LockOutlined,
            GoogleOutlined,
        },
        setup() {
            const formLogin = ref({
                email: '',
                password: '',
                remember: false,
            });

            const validateMessages = {
                required: '${label} không được bỏ trống!',
                types: {
                    email: 'Yêu cầu nhập đúng địa chỉ Email!',
                },
            };

            return {
                formLogin,
                validateMessages,
            };
        },
        methods: {
            ...mapActions('auth', ['LOGIN', 'LOGIN_GOOGLE']),
            async onFinish() {
                message.loading({
                    content: 'Loading...',
                    key,
                });
                const res = await this.LOGIN(this.formLogin);
                if (res.status) {
                    await this.$router.push('/');
                    message.success({
                        content: 'Đăng nhập thành công!',
                        key,
                        duration: 2,
                    });
                } else {
                    message.error({
                        content: 'Đăng nhập thất bại!',
                        key,
                        duration: 2,
                    });
                }
            },
            async loginWithGoogle() {
                try {
                    const googleUser = await this.$gAuth.signIn();
                    if (googleUser) {
                        message.loading({
                            content: 'Loading...',
                            key,
                        });
                        const res = await this.LOGIN_GOOGLE(googleUser.getAuthResponse().id_token);
                        if (res.status) {
                            await this.$router.push('/');
                            message.success({
                                content: 'Đăng nhập thành công!',
                                key,
                                duration: 2,
                            });
                        } else {
                            message.error({
                                content: 'Đăng nhập thất bại!',
                                key,
                                duration: 2,
                            });
                        }
                    }
                } catch (e) {
                    message.error({
                        content: 'Đăng nhập thất bại!',
                        key,
                        duration: 2,
                    });
                }
            },
        },
    });
</script>

<style scoped lang="scss">
    .user-layout-login {
        .login-form-wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
        }

        .login-form-button {
            width: 100%;
        }

        .another-login-button {
            background-color: #f5222d;
            border-color: #f5222d;
            width: 100%;
        }
    }
</style>
