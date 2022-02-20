<template>
    <TLUChat v-if="store.state.isOpenMess" />
    <router-view />
</template>

<script>
    import { defineComponent } from 'vue';
    import { TLUChat } from './components/index';
    import { useStore } from 'vuex';

    export default defineComponent({
        name: 'App',
        components: {
            TLUChat,
        },
        setup() {
            const store = useStore();
            return {
                store,
            };
        },
    });
</script>
