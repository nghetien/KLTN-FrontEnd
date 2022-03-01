<template>
    <div class="global-search-wrapper">
        <a-auto-complete
            v-model:value="value"
            class="global-search"
            size="large"
            :options="dataSource"
            @select="onSelect"
            @search="handleSearch"
        >
            <template #option="item">
                {{ item.email }}
            </template>
            <a-input-search size="large" placeholder="Tìm kiếm" enter-button></a-input-search>
        </a-auto-complete>
    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { searchUserResponse } from '../services/method/get';

    export default defineComponent({
        name: 'ManagerSearchBarComponent',
        setup() {
            const router = useRouter();

            const value = ref('');
            const dataSource = ref([]);
            let timeout = null;

            const onSelect = email => {
                console.log(email);
                router.push(`/manager/profile/${email}`);
            };
            const searchResult = async query => {
                const res = await searchUserResponse({ keyword: query });
                if (res.status) {
                    dataSource.value = res.data.map(user => ({
                        value: user.email,
                        email: user.email,
                    }));
                }
            };

            const handleSearch = val => {
                if (val) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        searchResult(val);
                    }, 1200);
                } else {
                    dataSource.value = [];
                }
            };

            return {
                value,
                dataSource,
                onSelect,
                handleSearch,
            };
        },
    });
</script>

<style scoped>
    .global-search-wrapper {
        padding-right: 50px;
    }

    .global-search {
        width: 100%;
    }

    .global-search.ant-select-auto-complete .ant-select-selection--single {
        margin-right: -46px;
    }

    .global-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input:not(:last-child) {
        padding-right: 62px;
    }

    .global-search.ant-select-auto-complete .ant-input-affix-wrapper .ant-input-suffix button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .global-search-item {
        display: flex;
    }

    .global-search-item-desc {
        flex: auto;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .global-search-item-count {
        flex: none;
    }
</style>
