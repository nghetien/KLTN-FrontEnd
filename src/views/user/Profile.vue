<template>
    <div v-if="showFollow" class="profile">
        <UserFollowComponent
            :email-user="email"
            @handleClickCloseShowFollow="handleClickCloseShowFollow"
            :is-followed="showFollow === 'FOLLOWED' ? true : false"
        />
    </div>
    <div v-else class="profile">
        <check-outlined
            v-if="showEditor && isOwner"
            class="profile-done"
            @click="handleClickDone"
        />
        <setting-outlined v-if="isOwner" class="profile-setting" @click="toggleShowEditor" />
        <div class="profile_user">
            <a-image
                style="height: 200px !important; width: 200px !important; object-fit: cover"
                :width="200"
                :height="200"
                :src="checkShowNewAvatar ? avatar : initAvatar ? initAvatar : DEFAULT_AVATAR"
                fallback="data:image/png;base64,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"
            />
            <div class="profile_user-detail">
                <div class="ant-descriptions-title" style="padding-bottom: 20px">
                    Thông tin tài khoản
                </div>
                <div class="profile_user-detail-wrapper">
                    <p class="profile_user-detail-item">Email: {{ email }}</p>
                    <p class="profile_user-detail-item">Loại tài khoản: {{ typeAccount }}</p>
                    <p class="profile_user-detail-item">
                        Họ và tên:
                        <a-input
                            style="flex: 1; margin-left: 16px"
                            v-if="showEditor"
                            v-model:value="name"
                            placeholder="Họ và tên"
                        />
                        <span class="profile_user-detail-content" v-else>{{ name }}</span>
                    </p>
                    <p class="profile_user-detail-item">
                        Số điện thoại:
                        <a-input
                            style="flex: 1; margin-left: 16px"
                            v-if="showEditor"
                            v-model:value="phoneNumber"
                            placeholder="Số điện thoại"
                        />
                        <span class="profile_user-detail-content" v-else>{{ phoneNumber }}</span>
                    </p>
                    <p class="profile_user-detail-item">
                        Đang theo dõi:
                        <span
                            style="
                                margin-left: 10px;
                                color: #1890ff;
                                text-decoration-line: underline;
                                cursor: pointer;
                            "
                            @click="handleClickShowFollow('FOLLOW')"
                            >{{ countFollow }}</span
                        >
                    </p>
                    <p class="profile_user-detail-item">
                        Số người theo dõi:
                        <span
                            style="
                                margin-left: 10px;
                                color: #1890ff;
                                text-decoration-line: underline;
                                cursor: pointer;
                            "
                            @click="handleClickShowFollow('FOLLOWED')"
                            >{{ countFollowed }}</span
                        >
                    </p>
                </div>
                <input
                    type="file"
                    ref="uploadImage"
                    style="display: none"
                    accept="image/png, image/gif, image/jpeg"
                    @change="handleChangeImage"
                />
                <a-button
                    v-if="checkShowNewAvatar"
                    type="primary"
                    style="margin-top: 20px"
                    @click="handleClickUpdateAvatar"
                    >Thay đổi</a-button
                >
                <a-button
                    v-if="checkShowNewAvatar"
                    type="primary"
                    ghost
                    style="margin-top: 20px; margin-left: 16px"
                    @click="handleClickRemoveAvatar"
                    >Hủy</a-button
                >
                <a-button
                    v-if="isOwner && !checkShowNewAvatar"
                    type="primary"
                    ghost
                    style="margin-top: 20px"
                    @click="handleClickChangeAvatar"
                    >Thay đổi avatar</a-button
                >
                <a-button v-if="!isOwner" type="primary" ghost @click="handleFollow">{{
                    isFollow ? 'Bỏ theo dõi' : 'Theo dõi'
                }}</a-button>
                <a-button
                    style="margin-left: 20px"
                    v-if="!isOwner"
                    type="primary"
                    ghost
                    @click="handleCreateConversation"
                >
                    Nhắn tin
                </a-button>
            </div>
        </div>
        <div style="margin-top: 40px">
            <div class="ant-descriptions-title" style="padding-bottom: 20px">
                Thông tin sinh viên
            </div>
            <div class="profile_student">
                <p class="profile_student-detail-item">
                    Mã sinh viên:
                    <a-input
                        style="flex: 1; margin-left: 16px"
                        v-if="showEditor"
                        v-model:value="studentCode"
                        placeholder="Mã sinh viên"
                    />
                    <span class="profile_student-detail-content" v-else>{{ studentCode }}</span>
                </p>
                <p class="profile_student-detail-item">
                    Khoa:
                    <a-input
                        style="flex: 1; margin-left: 16px"
                        v-if="showEditor"
                        v-model:value="department"
                        placeholder="Khoa"
                    />
                    <span class="profile_student-detail-content" v-else>{{ department }}</span>
                </p>
                <p class="profile_student-detail-item">
                    Nghành:
                    <a-input
                        style="flex: 1; margin-left: 16px"
                        v-if="showEditor"
                        v-model:value="major"
                        placeholder="Nghành"
                    />
                    <span class="profile_student-detail-content" v-else>{{ major }}</span>
                </p>
                <p class="profile_student-detail-item">
                    Địa chỉ:
                    <a-input
                        style="flex: 1; margin-left: 16px"
                        v-if="showEditor"
                        v-model:value="address"
                        placeholder="Địa chỉ"
                    />
                    <span class="profile_student-detail-content" v-else>{{ address }}</span>
                </p>
            </div>
        </div>
        <a-descriptions title="Hoạt động" class="profile_action-count">
            <a-descriptions-item label="Số lượng bài đăng">{{ countPost }}</a-descriptions-item>
            <a-descriptions-item label="Số lượng câu hỏi">{{ countProblem }}</a-descriptions-item>
        </a-descriptions>
        <div class="profile_action">
            <div class="profile_action-post">
                <h2 class="profile_action-title">BÀI VIẾT MỚI NHẤT</h2>
                <div>
                    <div v-for="(item, index) in allPost" :key="index">
                        <a-divider style="margin: 10px 0 !important" />
                        <router-link :to="`/post/${item._id.toString()}`">
                            <p style="margin-top: 16px">Bài viết: {{ item.namePost }}</p>
                            <p style="margin-top: 16px">
                                Thời gian: {{ convertTimestamp(item.timeCreate) }}
                            </p>
                            <p style="margin-top: 16px">
                                Tag:
                                <a-tag
                                    color="processing"
                                    v-for="(tag, index) in item.tags"
                                    :key="index"
                                >
                                    {{ tag.content }}
                                </a-tag>
                            </p>
                        </router-link>
                    </div>
                    <div style="text-align: center">
                        <a-divider style="margin: 10px 0 !important" />
                        <router-link v-if="allPost.length === 5" :to="`/profile/history/${email}`">
                            Xem thêm
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="profile_action-problem">
                <h2 class="profile_action-title">CÂU HỎI MỚI NHẤT</h2>
                <div>
                    <div v-for="(item, index) in allProblem" :key="index">
                        <a-divider style="margin: 10px 0 !important" />
                        <router-link :to="`/problem/${item._id.toString()}`">
                            <p style="margin-top: 16px">Câu hỏi: {{ item.nameProblem }}</p>
                            <p style="margin-top: 16px">
                                Thời gian: {{ convertTimestamp(item.timeCreate) }}
                            </p>
                            <p style="margin-top: 16px">
                                Tag:
                                <a-tag
                                    color="processing"
                                    v-for="(tag, index) in item.tags"
                                    :key="index"
                                >
                                    {{ tag.content }}
                                </a-tag>
                            </p>
                        </router-link>
                    </div>
                    <div style="text-align: center">
                        <a-divider style="margin: 10px 0 !important" />
                        <router-link
                            v-if="allProblem.length === 5"
                            :to="`/profile/history/${email}`"
                        >
                            Xem thêm
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref, onMounted, computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { SettingOutlined, CheckOutlined } from '@ant-design/icons-vue';
    import { getFollowedResponse, getProfileUserResponse } from '../../services/method/get';
    import { DEFAULT_AVATAR, PARTICIPANT, STUDENT } from '../../constants';
    import convertTimestamp from '../../lib/convertTimestamp';
    import { editAvatarResponse, editProfileResponse } from '../../services/method/put';
    import { message } from 'ant-design-vue';
    import {
        createConversationResponse,
        toggleFollowResponse,
        uploadResponse,
    } from '../../services/method/post';
    import { UserFollowComponent } from '../../components/index';

    const key = 'updatable';
    export default defineComponent({
        name: 'Profile',
        components: {
            SettingOutlined,
            CheckOutlined,
            UserFollowComponent,
        },
        setup() {
            const route = useRoute();
            const router = useRouter();
            const store = useStore();

            const showFollow = ref('');
            const showEditor = ref(false);
            const avatar = ref('');
            const initAvatar = ref('');
            const uploadImage = ref(null);
            const image = ref(null);
            const email = ref('');
            const typeAccount = ref('');
            const name = ref('');
            const phoneNumber = ref('');
            const studentCode = ref('');
            const department = ref('');
            const major = ref('');
            const address = ref('');
            const countPost = ref(0);
            const countProblem = ref(0);
            const countFollow = ref(0);
            const countFollowed = ref(0);
            const allPost = ref([]);
            const allProblem = ref([]);
            const isFollow = ref(false);

            const toggleShowEditor = () => {
                showEditor.value = !showEditor.value;
            };
            const handleClickDone = async () => {
                const res = await editProfileResponse({
                    fullName: name.value,
                    phoneNumber: phoneNumber.value,
                    studentCode: studentCode.value,
                    department: department.value,
                    major: major.value,
                    address: address.value,
                });
                if (res.status) {
                    store.commit('SET_USER_INFO', {
                        ...store.state.userInfo,
                        ...{
                            studentCode: studentCode.value,
                            fullName: name.value,
                            phoneNumber: phoneNumber.value,
                            address: address.value,
                            departmentCode: department.value,
                            majorCode: major.value,
                        },
                    });
                    message.success({
                        content: 'Cập nhật thông tin thành công!',
                        key,
                        duration: 2,
                    });
                } else {
                    message.error({
                        content: 'Cập nhật thông tin thất bại!',
                        key,
                        duration: 2,
                    });
                }
                showEditor.value = false;
            };
            const handleClickChangeAvatar = () => {
                uploadImage.value.click();
            };
            const handleChangeImage = async event => {
                image.value = event.target.files[0];
                const formData = new FormData();
                formData.append('file', image.value, image.value.name);
                message.loading({
                    content: 'Đăng tải ảnh lên!',
                    key,
                    duration: 50,
                });
                const res = await uploadResponse(formData);
                if (res.status) {
                    avatar.value = res.data;
                    message.success({
                        content: 'Tải ảnh thành công!',
                        key,
                        duration: 2,
                    });
                } else {
                    message.error({
                        content: 'Tải ảnh lên thất bại!',
                        key,
                        duration: 2,
                    });
                }
            };
            const handleClickRemoveAvatar = () => {
                avatar.value = initAvatar.value;
            };
            const handleClickUpdateAvatar = async () => {
                const res = await editAvatarResponse({
                    avatar: avatar.value,
                });
                if (res.status) {
                    initAvatar.value = avatar.value;
                    store.commit('SET_USER_INFO', {
                        ...store.state.userInfo,
                        ...{
                            avatar: avatar.value,
                        },
                    });
                    message.success({
                        content: 'Thay đổi ảnh thành công!',
                        key,
                        duration: 2,
                    });
                } else {
                    message.error({
                        content: 'Thay đổi ảnh thất bại!',
                        key,
                        duration: 2,
                    });
                }
            };
            const handleClickShowFollow = type => {
                showFollow.value = type;
            };
            const handleClickCloseShowFollow = () => {
                showFollow.value = '';
            };
            const handleFollow = async () => {
                isFollow.value = !isFollow.value;
                await toggleFollowResponse({
                    email: store.state.userInfo.email,
                    emailUserFollow: route.params.email,
                });
            };
            const loadFollowed = async () => {
                const res = await getFollowedResponse(route.params.email);
                if (res.status) {
                    isFollow.value = true;
                }
            };
            const isOpenMess = computed(() => store.state.isOpenMess);
            const currentConversationId = computed(
                () => store.state['message'].currentConversationId,
            );
            const handleCreateConversation = async () => {
                const res = await createConversationResponse(
                    store.state.userInfo.email,
                    route.params.email,
                );
                if (res.status) {
                    if (
                        isOpenMess.value &&
                        res.data._id.toString() === currentConversationId.value
                    ) {
                        return;
                    }
                    store.commit('message/SET_CURRENT_PARTICIPANT', {
                        conversationId: res.data._id.toString(),
                        participant: {
                            id: PARTICIPANT,
                            name: route.params.email,
                            imageUrl: image.value ? image.value : DEFAULT_AVATAR,
                        },
                    });
                    await store.dispatch('message/GET_MESSAGE_LIST_BY_CONVERSATION_ID');
                    store.commit('SET_OPEN_MESS');
                }
            };
            const checkShowNewAvatar = computed(() => {
                return avatar.value !== initAvatar.value;
            });
            const isOwner = computed(() => {
                return store.state.userInfo.email === route.params.email;
            });
            onMounted(async () => {
                if (route.params && route.params.email) {
                    if (route.params.email !== store.state.userInfo.email) {
                        await loadFollowed();
                    }
                    const res = await getProfileUserResponse(route.params.email);
                    if (res.status) {
                        const dataResponse = res.data;
                        avatar.value = dataResponse.info.avatar;
                        initAvatar.value = dataResponse.info.avatar;
                        email.value = dataResponse.info.email;
                        typeAccount.value =
                            dataResponse.info.role === STUDENT ? 'Sinh viên' : 'Admin';
                        name.value = dataResponse.info.full_name;
                        phoneNumber.value = dataResponse.info.phone_number;
                        studentCode.value = dataResponse.info.student_code;
                        department.value = dataResponse.info.department_code;
                        major.value = dataResponse.info.major_code;
                        address.value = dataResponse.info.address;
                        countPost.value = dataResponse.countPost;
                        countProblem.value = dataResponse.countProblem;
                        allPost.value = dataResponse.post;
                        allProblem.value = dataResponse.problem;
                        countFollow.value = dataResponse.countFollow;
                        countFollowed.value = dataResponse.countFollowed;
                    } else {
                        await router.push(`/manager/profile/${store.state.userInfo.email}`);
                    }
                } else {
                    await router.push(`/manager/profile/${store.state.userInfo.email}`);
                }
            });

            return {
                showEditor,
                avatar,
                initAvatar,
                uploadImage,
                email,
                typeAccount,
                name,
                phoneNumber,
                studentCode,
                department,
                major,
                address,
                countPost,
                countFollow,
                showFollow,
                countProblem,
                countFollowed,
                allPost,
                allProblem,
                toggleShowEditor,
                isOwner,
                isFollow,
                DEFAULT_AVATAR,
                convertTimestamp,
                handleClickDone,
                handleClickChangeAvatar,
                handleChangeImage,
                handleClickRemoveAvatar,
                handleClickUpdateAvatar,
                checkShowNewAvatar,
                handleFollow,
                handleClickShowFollow,
                handleClickCloseShowFollow,
                handleCreateConversation,
            };
        },
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
                    grid-column-gap: 28px;
                }

                &-item {
                    padding-bottom: 16px;
                    display: flex;
                    align-items: center;
                }

                &-content {
                    margin-left: 8px;
                }
            }
        }

        &_student {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-column-gap: 28px;

            &-detail {
                &-item {
                    padding-bottom: 16px;
                    display: flex;
                    align-items: center;
                }

                &-content {
                    margin-left: 8px;
                }
            }
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

        &-done {
            color: var(--green);
            position: absolute;
            top: 0;
            right: 40px;
            font-size: 24px;
            cursor: pointer;
        }

        &-setting {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 24px;
            cursor: pointer;
        }
    }
</style>
