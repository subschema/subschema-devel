module.exports = ({
                      test = /\.(png|je?pg|gif?f|bmp|ppm|bpg|mpe?g)$/,
                      limit = 1000,
                      loader = 'file-loader'
                  }, webpack) => {

    webpack.module.rules.push({
        test,
        use: {
            loader,
            options: {
                limit,
            }
        }
    });

    return webpack;
};
