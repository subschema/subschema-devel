/**
 0 *   useCssModule     : {
        loader : "css-loader",
        options: {
            modules       : true,
            importLoaders : 1,
            localIdentName: SUBSCHEMA_LOCAL_IDENT,
        }
    },
 useCss           : {
        loader : "css-loader",
        options: {
            importLoaders: 1,
        }
    },
 * @param isUseStyleLoader
 * @param useNameHash
 * @param publicPath
 * @param css
 * @param webpack
 */
module.exports = function ({
                               isUseStyleLoader,
                               useNameHash = '[hash].style.css',
                               publicPath = '/public',
                               modules = false,
                               autoprefixer = true,
                           }, webpack) {

    let useStyle;
    if (!isUseStyleLoader) {
        useNameHash             = useNameHash === true ? '[hash].style.css'
            : typeof useNameHash === 'string' ? useNameHash.replace(/(\.js)$/,
                '.css') : 'style.css';
        const ExtractTextPlugin = require('extract-text-webpack-plugin');
        const extractCSS        = new ExtractTextPlugin(useNameHash);

        useStyle = this.useStyle = function useStyleExtractText(...args) {
            const conf = { use: args.filter(Boolean) };
            if (publicPath) {
                conf.publicPath = publicPath;
            }
            return extractCSS.extract(conf);
        };

        webpack.plugins.push(extractCSS);
    } else {
        useStyle = this.useStyle = function useStyleWithStyleLoader(...args) {
            return ['style-loader'].concat(args.filter(Boolean));
        };
    }
    webpack.module.rules.push({
        test: /\.css$/,
        use : useStyle({
                loader : "css-loader",
                options: {
                    modules,
                    importLoaders: 1,
                }
            },
            autoprefixer && {
                loader : 'postcss-loader',
                options: {
                    plugins: [
                        require('autoprefixer')()
                    ]
                }
            }
        )
    });

    return webpack;
};
