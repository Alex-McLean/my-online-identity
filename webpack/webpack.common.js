const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const srcDir = '../src/';
const distDir = '../dist/';
const configFile = '../.eslintrc';

module.exports = {
  entry: {
    popup: path.join(__dirname, srcDir + '/popup/popup.ts'),
    options: path.join(__dirname, srcDir + '/options/options.ts'),
    background: path.join(__dirname, srcDir + '/background/background.ts'),
    warnings: path.join(__dirname, srcDir + '/warnings/warnings.ts'),
    tabScript: path.join(__dirname, srcDir + '/background/tabScript.ts'),
  },
  output: {
    path: path.join(__dirname, distDir, 'build'),
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
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    new CopyPlugin([{ from: '.', to: '../' }], { context: 'public' }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
  ],
};
