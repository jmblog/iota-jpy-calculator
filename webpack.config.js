const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './index.html',
    }),
    new UglifyJsPlugin(),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
