const path = require('path');

module.exports = {
    entry: {
        exam: './exam.js',
        exam2: './exam2.js',
        tabularquestion: './tabularquestion.js'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
