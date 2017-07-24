const path = require("path");
const webpack = require("webpack");
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const ENV = process.env.NODE_ENV || 'development';
const isProd = ENV === 'production';
let plugins = [
    //new webpack.IgnorePlugin(/angular/)
];

console.log('Building for ' + ENV);


if (isProd) {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
} else {
}

const config = {
    watch: !isProd,
    devtool: isProd ? "cheap-source-map" : "cheap-module-source-map",
    entry: {
      'kafka-ui-lib': "./src/index.js"
    },
    output: {
        filename: isProd ? '[name].min.js' : '[name].js',
        library: 'kafka-ui-lib',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    externals: {
        'angular': { 
            root: 'angular', 
            commonjs: 'angular', 
            commonjs2: 'angular', 
            amd: 'angular' 
        }
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-decorators-legacy',
                        'transform-runtime',
                        'transform-object-rest-spread',
                        'transform-class-properties'],
                    presets: ['es2015', 'stage-1']//
                }
            }
        ]
    },
    resolve: {
        alias: {

        },
        modules: [
            path.resolve('./src/'),
            path.resolve('./node_modules'),
        ]
    },
    plugins: plugins
};


module.exports = config;