/**
 * Created by Yurii on 06.12.2017.
 */
var path = require('path');
module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    }
};
