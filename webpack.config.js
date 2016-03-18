"use strict";

module.exports = {
  entry: "./index.js",
  output: {
    filename: "app.js"
  },
  module: {
	 loaders: [{
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel'],
        exclude: /relationship-viewer\/node_modules/
    }, {
        test: /\.css$/,
        loaders: ['style', 'css?modules&localIdentName=[path][name]---[local]---[hash:base64:5]'],
        exclude: /relationship-viewer\/node_modules/
    }]
  }
};