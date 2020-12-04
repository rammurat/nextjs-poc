const path = require('path');

module.exports = {
    images: {
      deviceSizes: [320, 420, 768, 1024, 1200],
      iconSizes: [],
      domains: [],
      path: '/_next/image',
      loader: 'default'
    },
    serverRuntimeConfig: {
      databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/admin?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    }
  }