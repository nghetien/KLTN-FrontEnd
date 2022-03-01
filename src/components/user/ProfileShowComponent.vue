<template>
    <div>
        <div class="profile_user">
            <a-image
                class="profile_user-avatar"
                :width="200"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <div class="profile_user-detail">
                <div class="ant-descriptions-title" style="padding-bottom: 20px">
                    Thông tin tài khoản
                </div>
                <div class="profile_user-detail-wrapper">
                    <p class="profile_user-detail-item">Email: nghequyettien@gmail.com</p>
                    <p class="profile_user-detail-item">Họ và tên: Nghê Quyết Tiến</p>
                    <p class="profile_user-detail-item">Số điện thoại: 0966224633</p>
                    <p class="profile_user-detail-item">Loại tài khoản: Người dùng</p>
                </div>
                <a-button type="primary" ghost style="margin-top: 20px">Thay đổi avatar</a-button>
            </div>
        </div>
        <a-descriptions title="Thông tin sinh viên" class="profile_student">
            <a-descriptions-item label="UserName"
                ><a-input placeholder="Basic usage"
            /></a-descriptions-item>
            <a-descriptions-item label="Telephone">1810000000</a-descriptions-item>
            <a-descriptions-item label="Live">Hangzhou, Zhejiang</a-descriptions-item>
            <a-descriptions-item label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="Hoạt động" class="profile_action-count">
            <a-descriptions-item label="Số lượng bài  đăng">200</a-descriptions-item>
            <a-descriptions-item label="Số lượng câu hỏi">100</a-descriptions-item>
        </a-descriptions>
        <div class="profile_action">
            <div class="profile_action-post">
                <h2 class="profile_action-title">BÀI VIẾT MỚI NHẤT</h2>
                <div>
                    <div>
                        <a-divider style="margin: 10px 0 !important" />
                        <router-link to="/home">
                            <p style="margin-top: 16px">Bài viết: Nánmdn</p>
                            <p style="margin-top: 16px">Thời gian: fsdfsdfs</p>
                            <p style="margin-top: 16px">
                                Tag: <a-tag color="processing"> Python </a-tag>
                            </p>
                        </router-link>
                    </div>
                    <div>
                        <a-divider style="margin: 10px 0 !important" />
                        <router-link to="/home">
                            <p style="margin-top: 16px">Bài viết: Nánmdn</p>
                            <p style="margin-top: 16px">Thời gian: fsdfsdfs</p>
                            <p style="margin-top: 16px">
                                Tag: <a-tag color="processing"> Python </a-tag>
                            </p>
                        </router-link>
                    </div>
                    <div>
                        <a-divider style="margin: 10px 0 !important" />
                        <router-link to="/home">
                            <p style="margin-top: 16px">Bài viết: Nánmdn</p>
                            <p style="margin-top: 16px">Thời gian: fsdfsdfs</p>
                            <p style="margin-top: 16px">
                                Tag: <a-tag color="processing"> Python </a-tag>
                            </p>
                        </router-link>
                    </div>
                    <div style="text-align: center">
                        <a-divider style="margin: 10px 0 !important" />
                        <router-link to="/home"> Xem thêm </router-link>
                    </div>
                </div>
            </div>
            <div class="profile_action-problem">
                <h2 class="profile_action-title">CÂU HỎI MỚI NHẤT</h2>
                <div>
                    <div>
                        <a-divider style="margin: 10px 0 !important" />
                        <router-link to="/home">
                            <p style="margin-top: 16px">Câu hỏi: Nánmdn</p>
                            <p style="margin-top: 16px">Thời gian: fsdfsdfs</p>
                            <p style="margin-top: 16px">
                                Tag: <a-tag color="processing"> Python </a-tag>
                            </p>
                        </router-link>
                    </div>
                    <div>
                        <a-divider style="margin: 10px 0 !important" />
                        <router-link to="/home">
                            <p style="margin-top: 16px">Câu hỏi: Nánmdn</p>
                            <p style="margin-top: 16px">Thời gian: fsdfsdfs</p>
                            <p style="margin-top: 16px">
                                Tag: <a-tag color="processing"> Python </a-tag>
                            </p>
                        </router-link>
                    </div>
                    <div>
                        <a-divider style="margin: 10px 0 !important" />
                        <router-link to="/home">
                            <p style="margin-top: 16px">Câu hỏi: Nánmdn</p>
                            <p style="margin-top: 16px">Thời gian: fsdfsdfs</p>
                            <p style="margin-top: 16px">
                                Tag: <a-tag color="processing"> Python </a-tag>
                            </p>
                        </router-link>
                    </div>
                    <div style="text-align: center">
                        <a-divider style="margin: 10px 0 !important" />
                        <router-link to="/home"> Xem thêm </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'ProfileShowComponent',
        components: {},
    });
</script>

<style scoped lang="scss">
    .profile {
        display: flex;
        flex-direction: column;
        position: relative;

        &_user {
            display: flex;

            &-detail {
                margin-left: 20px;
                flex: 1;

                &-wrapper {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: 1fr 1fr;
                }

                &-item {
                    padding-bottom: 16px;
                }
            }
        }

        &_student {
            margin-top: 40px;
        }

        &_action {
            display: flex;
            margin-top: 40px;

            &-title {
                text-align: center;
                font-weight: 500;
                font-size: 20px;
                color: var(--primary);
                margin-bottom: 20px;
            }

            &-post {
                flex: 1;
                padding-right: 16px;
            }

            &-problem {
                flex: 1;
                padding-left: 16px;
            }

            &-count {
                margin-top: 40px;
            }
        }
    }
</style>
