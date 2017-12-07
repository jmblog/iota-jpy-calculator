module.exports = {
  staticFileGlobs: ['manifest.json', 'images/*', 'src/*.js', 'index.html'],
  stripPrefix: 'src/',
  runtimeCaching: [
    {
      urlPattern: /https:\/\/fonts\.googleapis\.com\/css/,
      handler: 'cacheFirst',
    },
    {
      urlPattern: /cdnjs\.cloudflare\.com/,
      handler: 'cacheFirst',
    },
  ],
};
