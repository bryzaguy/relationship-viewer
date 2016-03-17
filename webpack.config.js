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
    }]
  }
};