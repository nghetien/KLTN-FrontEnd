import markdownIt from 'markdown-it';
import markdownItContainer from 'markdown-it-container';
import markdownItCheckbox from 'markdown-it-checkbox';
import markdownItDiv from 'markdown-it-div';
import markdownItAttrs from 'markdown-it-attrs';

const markdownItRender = text => {
    try {
        const md = markdownIt({
            injected: true,
            breaks: true,
            html: true,
            linkify: true,
            typography: true,
        })
            .use(markdownItContainer)
            .use(markdownItCheckbox, {
                disabled: true,
                divWrap: true,
                divClass: 'u-cb',
            })
            .use(markdownItDiv)
            .use(markdownItAttrs);
        return md.render(text);
    } catch (e) {
        return e;
    }
};

export default markdownItRender;
