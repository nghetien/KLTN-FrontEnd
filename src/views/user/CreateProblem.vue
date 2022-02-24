<template>
    <a-layout-content :style="{ background: '#f6f6f6', minHeight: '100vh' }">
        <div class="create-post">
            <div class="create-post__header">
                <a-button
                    class="create-post__tags-btn"
                    size="large"
                    type="primary"
                    @click="createProblem"
                >
                    Đặt câu hỏi
                </a-button>
            </div>

            <h3 class="create-post__content-title">Tiêu đề</h3>
            <a-input v-model:value="title" size="large" placeholder="Tiêu đề" />

            <div class="create-post__tags">
                <div class="create-post__tags-input">
                    <div class="">
                        <h3 style="font-weight: bold; padding-bottom: 10px">Thẻ</h3>
                        <div :key="index" v-for="(value, index) in listTag" style="display: inline">
                            <a-tag closable @close="deleteTag(index)" style="margin-bottom: 10px">
                                {{ value }}
                            </a-tag>
                        </div>
                    </div>
                    <a-input v-model:value="tag" size="large" placeholder="Thẻ" />
                </div>
                <a-button class="create-post__tags-btn" size="large" type="primary" @click="addTag">
                    Thêm thẻ
                </a-button>
            </div>

            <h3 class="create-post__content-title">Nội dung thu gọn</h3>
            <a-input v-model:value="shortContent" size="large" placeholder="Nội dung thu gọn" />

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
                            title="Gợi ý ký tự toán học"
                            trigger="click"
                        >
                            <template #content>
                                <div class="create-post__popover">
                                    <MathLiveComponent
                                        v-model="mathLive"
                                        v-on:input="inputMathLive"
                                        :options="{
                                            smartFence: false,
                                            virtualKeyboardMode: 'manual',
                                        }"
                                    ></MathLiveComponent>
                                    <a-textarea
                                        v-model:value="renderLatexFromMathLive"
                                        placeholder="Dạng Latex"
                                        :rows="2"
                                        readOnly
                                    />
                                    <a-button
                                        type="primary"
                                        style="margin-top: 16px"
                                        @click="copyMathLive"
                                    >
                                        Copy
                                    </a-button>
                                </div>
                            </template>
                            <a-button class="create-post__editor-add-feature" type="primary" ghost
                                >Gợi ý ký tự toán học</a-button
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
                    <div style="height: 33px"></div>
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
    import { defineComponent, ref, createVNode } from 'vue';
    import { quillEditor, Quill } from 'vue3-quill';
    import ImageUploader from 'quill-image-uploader';
    import QuillTable from 'vue-quill-table';
    import { Modal } from 'ant-design-vue';
    import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
    import { MathLiveComponent } from '../../components';
    import { renderKatex, markdownItRender } from '../../lib/index';
    import { createProblemResponse } from '../../services/method/post';
    import { message } from 'ant-design-vue';
    import { useRouter } from 'vue-router';

    Quill.register(QuillTable.TableCell);
    Quill.register(QuillTable.TableRow);
    Quill.register(QuillTable.Table);
    Quill.register(QuillTable.Contain);
    Quill.register('modules/table', QuillTable.TableModule);
    Quill.register('modules/imageUploader', ImageUploader);

    export default defineComponent({
        name: 'CreateProblem',
        components: {
            quillEditor,
            MathLiveComponent,
        },
        setup() {
            ///Title
            const title = ref('');
            /// Tag
            const tag = ref('');
            const listTag = ref([]);
            /// Short content
            const shortContent = ref('');
            /// Editor
            const contentHtml = ref('');
            const convertToHtml = ref('');
            const quill = ref(null);
            const contentMarkdown = ref('');
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

            const key = 'updatable';
            const router = useRouter();
            const createProblem = async () => {
                if (
                    title.value &&
                    shortContent.value &&
                    (convertToHtml.value || contentMarkdown.value)
                ) {
                    const dataProblem = {
                        title: title.value,
                        listTag: listTag.value,
                        shortContent: shortContent.value,
                        typeContent: tab.value,
                        content: tab.value === 'html' ? convertToHtml.value : contentMarkdown.value,
                    };
                    message.loading({ content: 'Đặt câu hỏi...', key });
                    const res = await createProblemResponse(dataProblem);
                    if (res.status) {
                        message.success({ content: 'Đặt câu hỏi thành công!', key, duration: 2 });
                        await router.push({ name: 'HomeProblem' });
                    } else {
                        message.error({
                            content: 'Đặt câu hỏi thất bại, Tiều đề câu hỏi có sự trùng lặp',
                            key,
                            duration: 2,
                        });
                    }
                } else {
                    message.warning('Yêu cầu nhập đủ thông tin Tiêu đề và Nội dung thu gọn');
                }
            };

            return {
                title,
                tag,
                listTag,
                shortContent,
                contentHtml,
                convertToHtml,
                quill,
                contentMarkdown,
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
                createProblem,
            };
        },
        computed: {
            renderTextEditor() {
                if (this.tab === 'html') {
                    return renderKatex(this.convertToHtml);
                } else {
                    return renderKatex(markdownItRender(this.contentMarkdown));
                }
            },
            renderLatexFromMathLive() {
                return '$' + this.mathLive + '$';
            },
        },
        methods: {
            addTag() {
                if (this.tag.length !== 0 && !this.listTag.includes(this.tag)) {
                    this.listTag.push(this.tag.trim());
                    this.tag = '';
                }
            },
            deleteTag(index) {
                this.listTag.splice(index, 0);
            },
            onEditorReady(quill) {
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
                            'Chuyển định dạng Editor, Nội dung có thể bị sai lệch',
                        ),
                        onOk() {
                            _this.tab = indexTab;
                            if (_this.tab === 'html') {
                                _this.contentHtml = _this.contentMarkdown;
                            } else {
                                if (_this.quill) {
                                    _this.contentMarkdown = _this.quill.container.innerText;
                                }
                            }
                        },
                    });
                }
            },
            inputMathLive(data) {
                if (typeof data === 'string' || data instanceof String) {
                    this.mathLive = data;
                }
            },
            copyMathLive(event) {
                const clipboardData =
                    event.clipboardData ||
                    window.clipboardData ||
                    event.originalEvent?.clipboardData ||
                    navigator.clipboard;

                clipboardData.writeText(this.renderLatexFromMathLive);
            },
        },
    });
</script>

<style scoped lang="scss">
    .create-post {
        padding: 24px 25px;

        &__header {
            display: flex;
            justify-content: flex-end;
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

        &__popover {
            width: 500px;
            font-size: 24px !important;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
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
