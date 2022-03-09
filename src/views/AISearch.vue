<template>
    <div class="ai-search">
        <a-input-search
            v-model:value="valueSearch"
            placeholder="Search"
            enter-button
            @search="onSearch"
        />
        <div class="ai-search__value">
            <h3 class="ai-search__title">NỘI DUNG TÌM KIẾM</h3>
            <div v-if="allPostSearchShow.length === 0" class="ai-search__content"></div>
            <div v-else class="ai-search__content">
                <SearchRecommend
                    v-for="(post, index) in allPostSearchShow"
                    :key="index"
                    :post="post"
                    :content-search="valueSearch"
                />
                <div class="ai-search__content-pagination">
                    <a-pagination
                        v-model:current="currentPage"
                        :total="allPostSearch.length"
                        :pageSizeOptions="['10']"
                        :showSizeChanger="false"
                    />
                </div>
            </div>
        </div>
        <div class="ai-search__recommend">
            <h3 class="ai-search__title">GỢI Ý CÓ THỂ LIÊN QUAN</h3>
            <div
                v-if="allPostRecommendShow.length === 0 || valueSearch.length === 0"
                class="ai-search__content--recommend"
            ></div>
            <div v-else class="ai-search__content--recommend">
                <SearchRecommend
                    v-for="(post, index) in allPostRecommendShow"
                    :key="index"
                    :post="post"
                    :content-search="valueSearch"
                />
                <div class="ai-search__content-pagination">
                    <a-pagination
                        v-model:current="currentPageRecommend"
                        :total="allPostRecommend.length"
                        :pageSizeOptions="['10']"
                        :showSizeChanger="false"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref, onMounted, watch } from 'vue';
    import { findAllPostResponse } from '../services/method/get';
    import { SearchRecommend } from '../components/index';
    import { aiSearchPostResponse } from '../services/method/post';

    export default defineComponent({
        name: 'AISearch',
        components: {
            SearchRecommend,
        },
        setup() {
            const valueSearch = ref('');
            const allPostRecommend = ref([]);
            const allPostRecommendInit = ref([]);
            const allPostRecommendShow = ref([]);
            const currentPageRecommend = ref(1);
            const allPostSearch = ref([]);
            const allPostSearchShow = ref([]);
            const currentPage = ref(1);

            const onSearch = () => {
                allPostRecommend.value = allPostRecommendInit.value;
                allPostRecommendShow.value = allPostRecommendInit.value;
                if (valueSearch.value) {
                    aiSearchPostResponse(valueSearch.value).then(res => {
                        if (res.status) {
                            allPostSearch.value = res.data;
                            allPostSearchShow.value = res.data;
                        }
                        const keySearchPost = allPostSearch.value.map(item => item._id.toString());
                        currentPageRecommend.value = 1;
                        allPostRecommend.value = allPostRecommend.value.filter(
                            item => !keySearchPost.includes(item._id.toString()),
                        );
                        allPostRecommendShow.value = allPostRecommend.value;
                    });
                }
            };

            watch(currentPageRecommend, () => {
                const fromShow = 10 * (currentPageRecommend.value - 1);
                const toShow =
                    10 * currentPageRecommend.value > allPostRecommend.value.length - 1
                        ? allPostRecommend.value.length - 1
                        : 10 * currentPageRecommend.value;
                const cloneAllPost = [...allPostRecommend.value];
                allPostRecommendShow.value = cloneAllPost.splice(fromShow, toShow);
            });
            watch(currentPage, () => {
                const fromShow = 10 * (currentPage.value - 1);
                const toShow =
                    10 * currentPage.value > allPostSearch.value.length - 1
                        ? allPostSearch.value.length - 1
                        : 10 * currentPage.value;
                const cloneAllPost = [...allPostSearch.value];
                allPostSearchShow.value = cloneAllPost.splice(fromShow, toShow);
            });

            onMounted(() => {
                findAllPostResponse().then(res => {
                    if (res.status) {
                        allPostRecommend.value = res.data;
                        allPostRecommendShow.value = res.data;
                        allPostRecommendInit.value = res.data;
                    }
                });
            });

            return {
                allPostRecommendShow,
                allPostRecommend,
                currentPageRecommend,
                allPostSearch,
                currentPage,
                valueSearch,
                allPostSearchShow,
                onSearch,
            };
        },
    });
</script>

<style scoped lang="scss">
    .ai-search {
        max-width: 820px;
        margin: 40px auto;

        &__title {
            font-weight: 500;
            font-size: 20px;
            color: var(--primary);
            margin-top: 20px;
        }

        &__content {
            padding: 20px 0;

            &--recommend {
                padding: 20px 0;
            }

            &-pagination {
                padding: 0 0 30px 0;
                text-align: center;
            }
        }
    }
</style>
