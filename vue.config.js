const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@assets': path.resolve(__dirname, 'src/assets'),
                '@components': path.resolve(__dirname, 'src/components'),
                '@views': path.resolve(__dirname, 'src/views'),
                '@structures': path.resolve(__dirname, 'src/structures'),
                '@services': path.resolve(__dirname, 'src/services'),
                '@data': path.resolve(__dirname, 'src/data'),
                '@helpers': path.resolve(__dirname, 'src/helpers'),
            },
        },
    },
};