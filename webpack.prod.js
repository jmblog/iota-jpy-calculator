const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ZopfliPlugin = require('zopfli-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new UglifyJsPlugin(),
    new ZopfliPlugin({
      asset: '[path].gz[query]',
      algorithm: 'zopfli',
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
});
