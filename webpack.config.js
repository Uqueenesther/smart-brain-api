// webpack.config.js

const path = require('path');

module.exports = {
  mode: 'production', // or 'development' depending on your needs
  entry: './src/index.js', // the entry point of your application
  output: {
    filename: 'bundle.js', // the name of the output bundle
    path: path.resolve(__dirname, 'dist'), // the path to the output directory
  },
};

