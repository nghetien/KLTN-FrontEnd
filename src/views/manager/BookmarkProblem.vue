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
            <div v-for="(problem, index) in allProblemShow" :key="index">
                <PreviewProblem :problem="problem" />
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref, onMounted } from 'vue';
    import { getBookmarkProblemResponse } from '../../services/method/get';
    import { PreviewProblem } from '../../components/index';

    export default defineComponent({
        name: 'BookmarkProblem',
        components: {
            PreviewProblem,
        },
        setup() {
            const allProblemShow = ref([]);
            const allProblem = ref([]);
            const valueSearch = ref('');

            const onSearch = () => {
                if (valueSearch.value) {
                    allProblemShow.value = allProblem.value.filter(item => {
                        if (item.nameProblem.includes(valueSearch.value)) {
                            return true;
                        }
                        if (item.shortContent.includes(valueSearch.value)) {
                            return true;
                        }
                        const listTagContent = item.tags.map(item => item.content);
                        return !!listTagContent.includes(valueSearch.value);
                    });
                } else {
                    allProblemShow.value = allProblem.value;
                }
            };

            onMounted(() => {
                getBookmarkProblemResponse().then(res => {
                    if (res.status) {
                        allProblemShow.value = res.data;
                        allProblem.value = res.data;
                    }
                });
            });

            return {
                allProblemShow,
                valueSearch,
                onSearch,
            };
        },
    });
</script>

<style scoped></style>
