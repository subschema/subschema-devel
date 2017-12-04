module.exports = ({
                      defaultLoader = 'url-loader',
                      limit = 1000,
                      mimetype,
                      test,
                      fontTypes = [
                          {

                              test    : /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                              mimetype: 'application/font-woff',
                          },
                          {
                              test    : /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                              mimetype: 'application/octet-stream'
                          },
                          {
                              test  : /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                              loader: 'file-loader',
                          },
                          {
                              test    : /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                              mimetype: 'image/svg+xml'
                          }
                      ]
                  }, webpack) => {

    if (!defaultLoader) {
        defaultLoader = 'url-loader';
    }
    fontTypes.forEach(
        function (opts) {
            this.push({
                test: opts.test || test,
                use : {
                    loader : opts.loader || defaultLoader,
                    options: {
                        limit   : opts.limit || limit,
                        mimetype: opts.mimetype || mimetype,
                    }
                }
            })
        }, webpack.module.rules);

    return webpack;
};
