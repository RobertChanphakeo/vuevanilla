const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bundleOutputDir = './wwwroot/dist';
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const devMode = isDevBuild ? 'development':'production';

    return [{
        mode: devMode,
        stats: { modules: false },
        context: __dirname,
        resolve: { extensions: ['.js'] },
        entry: { 'main': './ClientApp/boot.js' },
        module: {
            rules: [
                {
                    test: /\.vue$/, include: /ClientApp/,
                    loader: 'vue-loader'
                },
                // this will apply to both plain `.js` files
                // AND `<script>` blocks in `.vue` files
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                // this will apply to both plain `.css` files
                // AND `<style>` blocks in `.vue` files
                {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader'
                    ]
                },
                // this will apply to both plain .scss files
                // AND <style lang="scss"> blocks in vue files
                {
                    test: /\.scss$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                data: '$color: red;'
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/, use: isDevBuild ? ['style-loader',
                        'css-loader'] : ExtractTextPlugin.extract(
                            { use: 'css-loader?minimize' })
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: 'url-loader?limit=25000'
                }
            ]
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: 'dist/'
        },
        plugins: [
            // make sure to include the plugin for the magic
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new UglifyJsPlugin(),
            new ExtractTextPlugin('site.css')
        ])
    }];
};