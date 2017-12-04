module.exports = ({
                      test = /\.(png|je?pg|gif?f|bmp|ppm|bpg|mpe?g)$/,
                      limit = 1000,
                  }, webpack) => {

    webpack.module.rules.push({
        test,
        use: {
            loader : 'file-loader',
            options: {
                limit,
            }
        }
    });

    return webpack;
};
