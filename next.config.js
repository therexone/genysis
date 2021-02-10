const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')


module.exports = withPWA({
    pwa: {
        dest: 'public',
        runtimeCaching: [
            ...runtimeCaching,
            {
                urlPattern: /\/api\/.*\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'static-image-asset-api',
                  expiration: {
                    maxEntries: 128,
                    maxAgeSeconds: 24 * 60 * 60 // 24 hours
                  }
                }
              },
        ]
      }
})