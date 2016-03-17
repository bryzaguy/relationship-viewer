"use strict";

module.exports = {
  entry: "./index.js",
  output: {
    filename: "app.js"
  },
    loaders: [{
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: /node_modules/
    }]
};