import Renderer from './markdown';
import MarkdownIt from 'markdown-it';

const stringify = (str) => {
    if (str == null) {
        return '';
    }

    return JSON.stringify(str);
};

//cache this thing;
let md;

module.exports = function (source) {

    if (!md) {
        const langMap     = this.query.extensions;
        const highlighter = this.query.highlighter;
        const theme       = this.query.theme;
        const renderer    = new Renderer();

        md = MarkdownIt({
            xhtmlOut : true,
            highlight: function (str, lang) {
                lang = lang && lang.trim() || 'text';


                const lng          = langMap[lang] || lang;
                const resolvedLang = `react-syntax-highlighter/languages/${highlighter}/${lng}`;
                let resolved       = false;
                try {
                    require.resolve(resolvedLang);
                    resolved = true;
                } catch (e) {
                    console.log(`no language highlighting for ${resolvedLang}`);
                }

                if (!resolved) {
                    return `<code className="unknown-lang lang-${lang
                                                                 || 'nolang'}">{${JSON.stringify(
                        str)}}</code>`;
                }
                renderer.imports['MDhighlighter$, { registerLanguage  as $mdRl} '] =
                    'react-syntax-highlighter/light';
                renderer.imports['$mdLang']                                        =
                    resolvedLang;
                renderer.imports['$mdStyle']                                       =
                    `react-syntax-highlighter/styles/${highlighter}/${theme}`;

                renderer.prelude[`$mdRl(${stringify(lng)}, $mdLang);\n`] = true;

                return `<MDhighlighter$ style={$mdStyle} language={${stringify(
                    lng)}}>{${stringify(str.trim())}}</MDhighlighter$>`; // use
                                                                         // external
                                                                         // default
                                                                         // escaping
            }
        });


        md.renderer = renderer;
    }
    this.cacheable && this.cacheable();
    return md.render(source);
};
