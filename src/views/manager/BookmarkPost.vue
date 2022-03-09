<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center">
            <a-input-search
                v-model:value="valueSearch"
                placeholder="Search email user"
                style="width: 200px"
                @change="onSearch"
            />
        </div>
        <div
            style="
                margin-top: 40px;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-column-gap: 50px;
            "
        >
            <div v-for="(post, index) in allPostShow" :key="index">
                <PreviewPost :post="post" />
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref, onMounted } from 'vue';
    import { getBookmarkPostResponse } from '../../services/method/get';
    import { PreviewPost } from '../../components/index';

    export default defineComponent({
        name: 'BookmarkPost',
        components: {
            PreviewPost,
        },
        setup() {
            const allPostShow = ref([]);
            const allPost = ref([]);
            const valueSearch = ref('');

            const onSearch = () => {
                if (valueSearch.value) {
                    allPostShow.value = allPost.value.filter(item => {
                        if (item.namePost.includes(valueSearch.value)) {
                            return true;
                        }
                        if (item.shortContent.includes(valueSearch.value)) {
                            return true;
                        }
                        const listTagContent = item.tags.map(item => item.content);
                        return !!listTagContent.includes(valueSearch.value);
                    });
                } else {
                    allPostShow.value = allPost.value;
                }
            };

            onMounted(() => {
                getBookmarkPostResponse().then(res => {
                    if (res.status) {
                        allPostShow.value = res.data;
                        allPost.value = res.data;
                    }
                });
            });

            return {
                allPostShow,
                valueSearch,
                onSearch,
            };
        },
    });
</script>

<style scoped></style>
