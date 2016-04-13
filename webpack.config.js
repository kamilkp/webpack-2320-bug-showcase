var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

function LoggingPlugin() {

}

LoggingPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compile', function(compilation) {
        console.log('Webpack starts compilation...');
    });

    compiler.plugin('done', function(stats) {
        console.log('Webpack finished compilation.');
    });
};

module.exports = {
    entry: {
        app: './src/js/main.js'
    },
    output: {
        path: path.join(__dirname, 'src/bundle'),
        filename: `[name].js`,
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", `css-loader`)
            },
            {
                test: /\.html$/,
                loader: `file-loader?name=templates/[name]-[hash].[ext]`
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(`[name].css`),
        new LoggingPlugin()
    ]
};
