<template>
    <div class="mathfield" :id="id"><slot></slot></div>
</template>

<script>
    /* eslint no-unused-vars: ["error", { "args": "none" }] */
    import { makeMathField } from 'mathlive';
    export default {
        name: 'MathLiveComponent',
        props: {
            id: { type: String, default: '' },
            value: { type: String, default: '' },
            options: { type: Object, default: () => ({}) },
            onKeystroke: { type: Function, default: (t, e) => !0 },
            onMoveOutOf: { type: Function, default: t => !0 },
            onTabOutOf: { type: Function, default: t => !0 },
        },
        watch: {
            value: function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.$el.mathfield.setValue(newValue, {
                        suppressChangeNotifications: true,
                    });
                }
            },
            options: {
                deep: true,
                handler(t, e) {
                    JSON.stringify(t) !== JSON.stringify(e) && this.$el.mathfield.setOptions(t);
                },
            },
        },
        mounted: function () {
            const vm = this;
            this.$nextTick(function () {
                makeMathField(vm.$el, {
                    ...vm.options,
                    onContentDidChange: _ => {
                        vm.$emit('input', vm.$el.mathfield.getValue());
                    },
                    onFocus: _ => {
                        vm.$emit('focus');
                    },
                    onBlur: _ => {
                        vm.$emit('blur');
                    },
                    onContentWillChange: _ => {
                        vm.$emit('content-will-change');
                    },
                    onSelectionWillChange: _ => {
                        vm.$emit('selection-will-change');
                    },
                    onUndoStateWillChange: (_, command) => {
                        vm.$emit('undo-state-will-change', command);
                    },
                    onUndoStateDidChange: (_, command) => {
                        vm.$emit('undo-state-did-change', command);
                    },
                    onReadAloudStatus: (_, status) => {
                        vm.$emit('read-aloud-status-change', status);
                    },
                    onKeystroke: function (_, keystroke, ev) {
                        return vm.onKeystroke(keystroke, ev);
                    },
                    onMoveOutOf: (_, direction) => {
                        return vm.onMoveOutOf(direction);
                    },
                    onTabOutOf: (_, direction) => {
                        return vm.onTabOutOf(direction);
                    },
                });
            });
        },
        methods: {
            executeCommand(t) {
                this.$el.mathfield.executeCommand(t);
            },
            hasFocus() {
                return this.$el.mathfield.hasFocus();
            },
            focus() {
                this.$el.mathfield.focus();
            },
            blur() {
                this.$el.mathfield.blur();
            },
            getValue(t) {
                return this.$el.mathfield.getValue(t);
            },
            selectedText(t) {
                return this.$el.mathfield.$selectedText(t);
            },
            insert(t, e) {
                this.$el.mathfield.insert(t, e);
            },
            select() {
                this.$el.mathfield.select();
            },
        },
    };
</script>
