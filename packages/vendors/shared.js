const vendorLibs = require('./package.json').dependencies

module.exports = {
    react: {
        singleton: true,
        requiredVersion: vendorLibs.react,
    },
    'react-dom': {
        singleton: true,
        requiredVersion: vendorLibs['react-dom'],
    },
    lodash: {
        singleton: true,
        requiredVersion: vendorLibs.lodash,
    },
}
