// webpack.config.js
const path = require('path');

module.exports = {
    // ... other configurations

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
        // Configuration for polyfills:
        fallback: {
            "http": require.resolve("stream-http"),
            // Add other polyfills if necessary, for example:
            "https": require.resolve("https-browserify"),
            "url": require.resolve("url/"),
            // ... other Node core modules
        }
    },

    // ... other configurations
};