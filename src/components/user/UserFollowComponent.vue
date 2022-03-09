<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center">
            <a-input-search
                v-model:value="valueSearch"
                placeholder="Search email user"
                style="width: 200px"
                @change="onSearch"
            />
            <CloseOutlined style="cursor: pointer" @click="$emit('handleClickCloseShowFollow')" />
        </div>
        <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(3, 1fr)">
            <div v-for="(item, index) in allUserFollow" :key="index" style="padding: 10px 0">
                <a-avatar
                    v-if="item.avatar"
                    style="margin-right: 8px"
                    :src="item.avatar"
                    referrerpolicy="no-referrer"
                >
                    <template #icon><UserOutlined /></template>
                </a-avatar>
                <a-avatar v-else style="margin-right: 8px">
                    <template #icon><UserOutlined /></template>
                </a-avatar>
                <router-link :to="`/manager/profile/${item.email}`">
                    {{ item.email }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref, onMounted } from 'vue';
    import { CloseOutlined, UserOutlined } from '@ant-design/icons-vue';
    import { getUserFollowedResponse } from '../../services/method/get';

    export default defineComponent({
        name: 'UserFollowComponent',
        components: {
            CloseOutlined,
            UserOutlined,
        },
        props: {
            emailUser: String,
            isFollowed: Boolean,
        },
        setup(props) {
            const allUserFollow = ref([]);
            const initUserFollow = ref([]);
            const valueSearch = ref('');

            let timeout = null;
            const searchResult = async query => {
                allUserFollow.value = initUserFollow.value.filter(item =>
                    item.email.includes(query),
                );
            };
            const onSearch = () => {
                if (valueSearch.value) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        searchResult(valueSearch.value);
                    }, 1200);
                } else {
                    allUserFollow.value = initUserFollow.value;
                }
            };

            onMounted(async () => {
                const res = await getUserFollowedResponse(props.emailUser, props.isFollowed);
                if (res.status) {
                    allUserFollow.value = res.data;
                    initUserFollow.value = res.data;
                }
            });

            return {
                allUserFollow,
                valueSearch,
                onSearch,
            };
        },
    });
</script>

<style scoped></style>
