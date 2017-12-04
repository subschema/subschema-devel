module.exports = function ({
                               test = /\.less$/,
                               options = {
                                   strictMath: true,
                                   noIeCompat: true
                               },
                               modules = true,
                               autoprefixer = true,
                               localIdentName = '[name]__[local]___[hash:base64:5]',
                           }, webpack) {


    webpack.module.rules.push({
        test,
        loader: this.useStyle(
            modules && {
                loader : 'css-loader',
                options: {
                    modules      : true,
                    importLoaders: 1,
                    localIdentName,
                }
            },
            {
                loader:'less-loader',
                options
            },
            autoprefixer && {
                loader : 'postcss-loader',
                options: {
                    plugins: [
                        require('autoprefixer')()
                    ]
                }
            })
    });


    return webpack;
};
