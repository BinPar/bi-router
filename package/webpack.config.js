/* global __dirname, require, module */
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');

const libraryName = pkg.name;

const plugins = [];

let outputFile;

if (env === 'build') {
  plugins.push(new UglifyJSPlugin());
  outputFile = `${libraryName}.min.js`;
} else {
  outputFile = `${libraryName}.js`;
}

const config = {
  entry: `${__dirname}/src/bi-router.js`,
  devtool: 'source-map',
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, './node_modules'), path.resolve(__dirname, './src')],
    extensions: ['.json', '.js'],
  },
  externals: [
    {
      'react-apollo': {
        root: 'react-apollo',
        commonjs2: 'react-apollo',
        commonjs: 'react-apollo',
        amd: 'react-apollo',
        umd: 'react-apollo',
      },
    },
    {
      next: {
        root: 'next',
        commonjs2: 'next',
        commonjs: 'next',
        amd: 'next',
        umd: 'next',
      },
    },
    {
      next: {
        root: 'http',
        commonjs2: 'http',
        commonjs: 'http',
        amd: 'http',
        umd: 'http',
      },
    },
  ],
  plugins,
};

module.exports = config;
