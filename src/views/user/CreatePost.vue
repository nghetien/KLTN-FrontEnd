<template>
    <a-layout-content :style="{ background: '#f6f6f6', minHeight: '100vh' }">
        <div class="create-post">
            <div class="create-post__header">
                <a-dropdown>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item key="1">
                                <UserOutlined />
                                Riêng tư
                            </a-menu-item>
                            <a-menu-item key="2">
                                <UserOutlined />
                                Công khai
                            </a-menu-item>
                        </a-menu>
                    </template>
                    <a-button>
                        Trạng thái
                        <DownOutlined />
                    </a-button>
                </a-dropdown>
                <a-button class="create-post__tags-btn" size="large" type="primary"
                    >Đăng bài viết</a-button
                >
            </div>

            <h3 class="create-post__content-title">Tiêu đề</h3>
            <a-input size="large" placeholder="Tiêu đề" />

            <div class="create-post__tags">
                <div class="create-post__tags-input">
                    <h3 style="font-weight: bold; padding-bottom: 10px">Thẻ</h3>
                    <a-input size="large" placeholder="Thẻ" />
                </div>
                <a-button class="create-post__tags-btn" size="large" type="primary"
                    >Thêm thẻ</a-button
                >
            </div>

            <h3 class="create-post__content-title">Nội dung</h3>

            <div class="create-post__wrapper">
                <div class="create-post__editor-container">
                    <div class="create-post__editor-header">
                        <div style="display: flex">
                            <a-button
                                type="primary"
                                :ghost="tab !== 'html'"
                                @click="changeTab('html')"
                                >HTML</a-button
                            >
                            <a-button
                                type="primary"
                                :ghost="tab !== 'markdown'"
                                @click="changeTab('markdown')"
                                >Markdown</a-button
                            >
                        </div>
                        <a-popover
                            v-model:visible="visible"
                            title="Thêm ký tự toán học"
                            trigger="click"
                        >
                            <template #content>
                                <div
                                    style="
                                        display: flex;
                                        flex-direction: column;
                                        align-items: flex-end;
                                    "
                                >
                                    <MathLiveComponent
                                        v-model="mathLive"
                                        v-on:input="input"
                                        :options="{
                                            smartFence: false,
                                            virtualKeyboardMode: 'manual',
                                        }"
                                    >
                                        f(x)=
                                    </MathLiveComponent>
                                    <a-button type="primary" style="margin-top: 16px"
                                        >Thêm ký tự</a-button
                                    >
                                </div>
                            </template>
                            <a-button class="create-post__editor-add-feature" type="primary" ghost
                                >Ký tự toán học</a-button
                            >
                        </a-popover>
                    </div>
                    <div
                        v-show="tab === 'html'"
                        style="display: flex; flex-direction: column; height: 100%"
                    >
                        <quill-editor
                            style="background-color: #fff !important"
                            theme="snow"
                            toolbar="full"
                            v-model:value="contentHtml"
                            :options="editorOption"
                            @ready="onEditorReady($event)"
                            @change="onEditorChange($event)"
                        />
                    </div>
                    <a-textarea
                        class="create-post__editor-markdown"
                        v-show="tab === 'markdown'"
                        v-model:value="contentMarkdown"
                        placeholder="Nhập nội dung"
                        style="background-color: #fff !important"
                    />
                </div>
                <div class="create-post__preview">
                    <a-button type="primary" ghost>Lưu</a-button>
                    <div class="create-post__show ql-snow">
                        <div
                            class="ql-editor"
                            style="width: 100%; overflow: hidden"
                            v-html="renderTextEditor"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </a-layout-content>
</template>

<script>
    import { UserOutlined, DownOutlined } from '@ant-design/icons-vue';
    import { defineComponent, ref, createVNode } from 'vue';
    import { quillEditor, Quill } from 'vue3-quill';
    import ImageUploader from 'quill-image-uploader';
    import QuillTable from 'vue-quill-table';
    import { Modal } from 'ant-design-vue';
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
    import { MathLiveComponent } from '../../components';

    Quill.register(QuillTable.TableCell);
    Quill.register(QuillTable.TableRow);
    Quill.register(QuillTable.Table);
    Quill.register(QuillTable.Contain);
    Quill.register('modules/table', QuillTable.TableModule);
    Quill.register('modules/imageUploader', ImageUploader);

    export default defineComponent({
        name: 'CreatePost',
        components: {
            UserOutlined,
            DownOutlined,
            quillEditor,
            MathLiveComponent,
        },
        setup() {
            const contentHtml = ref('');
            const convertToHtml = ref('');
            const quill = ref(null);
            const contentMarkdown = ref('');
            const convertMarkdownToHtml = ref('');
            const tab = ref('html');
            const mathLive = ref('');
            const visible = ref(false);

            const maxRows = 10;
            const maxCols = 5;
            const tableOptions = [];
            for (let r = 1; r <= maxRows; r++) {
                for (let c = 1; c <= maxCols; c++) {
                    tableOptions.push('newtable_' + r + '_' + c);
                }
            }

            return {
                contentHtml,
                convertToHtml,
                quill,
                contentMarkdown,
                convertMarkdownToHtml,
                tab,
                mathLive,
                visible,
                editorOption: {
                    placeholder: 'Nhập nội dung',
                    modules: {
                        imageUploader: {
                            upload: () => {
                                return new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve(
                                            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png',
                                        );
                                    }, 3500);
                                });
                            },
                        },
                        table: true,
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ header: 1 }, { header: 2 }],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ script: 'sub' }, { script: 'super' }],
                            [{ indent: '-1' }, { indent: '+1' }],
                            [{ direction: 'rtl' }],
                            [{ size: ['small', false, 'large', 'huge'] }],
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            [{ color: [] }, { background: [] }],
                            [{ font: [] }],
                            [{ align: [] }],
                            ['clean'],
                            ['link', 'image', 'video'],
                            [
                                { table: tableOptions },
                                { table: 'append-row' },
                                { table: 'append-col' },
                            ],
                        ],
                    },
                },
            };
        },
        computed: {
            renderTextEditor() {
                if (this.tab === 'html') {
                    return this.convertToHtml;
                } else {
                    return this.contentMarkdown;
                }
            },
        },
        methods: {
            onEditorReady(quill) {
                console.log('editor ready!', quill);
                this.quill = quill;
            },
            onEditorChange({ html }) {
                this.convertToHtml = html;
            },
            changeTab(indexTab) {
                const _this = this;
                if (this.tab !== indexTab) {
                    Modal.confirm({
                        title: 'Bạn có chắc chắn muốn chuyển định dạng Edior?',
                        icon: createVNode(ExclamationCircleOutlined),
                        okText: 'Đồng ý',
                        cancelText: 'Hủy',
                        content: createVNode(
                            'div',
                            { style: 'color:red;' },
                            'Chuyển định dạng Editor',
                        ),
                        onOk() {
                            _this.tab = indexTab;
                            if (_this.tab === 'html') {
                                _this.contentHtml = _this.contentMarkdown;
                                _this.convertToHtml = _this.contentMarkdown;
                            } else {
                                if (_this.quill) {
                                    _this.contentMarkdown = _this.quill.container.innerText;
                                }
                            }
                        },
                    });
                }
            },
            input() {
                console.log(this.mathLive);
            },
        },
    });
</script>

<style scoped lang="scss">
    .create-post {
        padding: 24px 25px;

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__tags {
            margin-top: 20px;
            display: flex;
            align-items: flex-end;

            &-input {
                width: 100%;
            }

            &-btn {
                margin-left: 10px;
            }
        }

        &__content-title {
            padding-bottom: 10px;
            margin-top: 20px;
            font-weight: bold;
        }

        &__wrapper {
            width: 100%;
            display: flex;
        }

        &__editor-container {
            width: 50%;
            display: flex;
            flex-direction: column;
        }

        &__editor-markdown {
            min-height: 100vh;
            height: 100%;
        }

        &__editor-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }

        &__preview {
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        &__show {
            width: 100%;
            border: 1px solid #d1d5db;
            background-color: #fff;
            min-height: 100vh;
            margin-top: 16px;
            height: 100%;
        }
    }
    @media (max-width: 700px) {
        .create-post__editor-header {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }
        .create-post__editor-add-feature {
            margin-top: 16px;
        }
        .create-post__show {
            margin-top: 64px;
        }
    }
</style>
