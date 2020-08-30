const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = '../src/';
const distDir = '../dist';
const configFile = '../.eslintrc';

module.exports = {
  entry: {
    popup: path.join(__dirname, srcDir + 'popup.ts'),
    options: path.join(__dirname, srcDir + 'options.ts'),
    background: path.join(__dirname, srcDir + 'background.ts'),
    backgroundStorage: path.join(__dirname, srcDir + 'backgroundStorage.ts'),
    backgroundCookies: path.join(__dirname, srcDir + 'backgroundCookies.ts'),
    backgroundWebRequest: path.join(__dirname, srcDir + 'backgroundWebRequest.ts'),
  },
  output: {
    path: path.join(__dirname, distDir, '/js'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              cache: true,
              eslintPath: require.resolve('eslint'),
              resolvePluginsRelativeTo: __dirname,
              configFile: path.join(__dirname, configFile),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: /src/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    // exclude locale files in moment
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyPlugin([{ from: '.', to: '../' }], { context: 'public' }),
  ],
};
