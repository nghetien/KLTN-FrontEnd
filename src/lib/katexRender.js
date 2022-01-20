import katex from 'katex';

const renderKatex = text => {
    try {
        return text
            .replace(/\$\$(.*?)\$\$/g, function (outer, inner) {
                return katex.renderToString(inner, { displayMode: true });
            })
            .replace(/\$(.*?)\$/g, function (outer, inner) {
                return katex.renderToString(inner, { displayMode: false });
            })
            .replace(/\\\[(.*?)\\\]/g, function (outer, inner) {
                return katex.renderToString(inner, { displayMode: true });
            })
            .replace(/\\\((.*?)\\\)/g, function (outer, inner) {
                return katex.renderToString(inner, { displayMode: false });
            });
    } catch (e) {
        return e;
    }
};

export default renderKatex;
