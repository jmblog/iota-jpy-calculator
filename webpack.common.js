const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZopfliPlugin = require('zopfli-webpack-plugin');
const lazyResources = require('./src/lazy-resources.json');

const entry = {};
lazyResources.forEach(resource => {
  entry[resource] = `./src/${resource}`;
});

module.exports = {
  entry: {
    'iota-app': './src/iota-app.js',
    ...entry,
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin(['manifest.json', { from: 'images/', to: 'images/' }]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './index.html',
      minify: {
        caseSensitive: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
    new ZopfliPlugin({
      asset: '[path].gz[query]',
      algorithm: 'zopfli',
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
