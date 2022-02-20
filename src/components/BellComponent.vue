<template>
    <a-dropdown placement="bottomRight">
        <BellOutlined style="font-size: 24px; cursor: pointer; margin-right: 20px" />
        <template #overlay>
            <a-menu>
                <a-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                        1st menu item
                    </a>
                </a-menu-item>
                <a-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                        2nd menu item
                    </a>
                </a-menu-item>
                <a-menu-item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                        3rd menu item
                    </a>
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>

<script>
    import { defineComponent } from 'vue';
    import { BellOutlined } from '@ant-design/icons-vue';

    export default defineComponent({
        name: 'BellComponent',
        components: {
            BellOutlined,
        },
    });
</script>

<style scoped></style>
