module.exports = {
  staticFileGlobs: ['manifest.json', 'images/*'],
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
