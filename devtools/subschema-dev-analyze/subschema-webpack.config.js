module.exports = ({
                      reportFileName = 'report.html',
                      analyzerMode = 'server',
                  }, webpack) => {
    //only include for analyzer.
    const BundleAnalyzerPlugin = require(
        'webpack-bundle-analyzer').BundleAnalyzerPlugin;

    const analyze = {
        analyzerMode
    };

    switch (analyzerMode) {
        case 'server':
            break;
        case 'static': {
            analyze.reportFilename = reportFileName;
            analyze.analyzerMode   = analyzerMode;
            break;
        }
        default: {
            return webpack;
        }
    }
    webpack.plugins.push(new BundleAnalyzerPlugin(analyze));
    return webpack;
};
