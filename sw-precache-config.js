module.exports = {
  staticFileGlobs: ['manifest.json', 'images/*', 'src/*.js', 'index.html'],
  stripPrefix: 'src/',
  runtimeCaching: [
    {
      urlPattern: /cdnjs\.cloudflare\.com/,
      handler: 'cacheFirst',
    },
  ],
};
