module.exports = {
  staticFileGlobs: [
    '/index.html',
    '/manifest.json',
    '/bower_components/webcomponentsjs/webcomponents-loader.js',
    '/images/*',
  ],
  runtimeCaching: [
    {
      urlPattern: /\/bower_components\/webcomponentsjs\/.*.js/,
      handler: 'fastest',
      options: {
        cache: {
          name: 'webcomponentsjs-polyfills-cache',
        },
      },
    },
    {
      urlPattern: /https:\/\/fonts\.googleapis\.com\/css/,
      handler: 'cacheFirst',
    },
    {
      urlPattern: /cdn\.pubnub\.com/,
      handler: 'cacheFirst',
    },
    {
      urlPattern: /cdnjs\.cloudflare\.com/,
      handler: 'cacheFirst',
    },
  ],
};
