const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const theme = require('./src/helper/config/theme');

const isDevelopment = process.env.NODE_ENV !== 'production';

const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  target: 'web',
  context: paths.src,

  entry: {
    app: './index',
  },

  output: {
    path: paths.dist,
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@component': path.resolve(paths.src, 'component'),
      '@helper': path.resolve(paths.src, 'helper'),
      '@model': path.resolve(paths.src, 'model'),
      '@page': path.resolve(paths.src, 'page'),
      '@service': path.resolve(paths.src, 'service'),
      '@state': path.resolve(paths.src, 'state'),
    },
  },

  devtool: isDevelopment && 'source-map',
  devServer: isDevelopment ? {
    contentBase: path.resolve(__dirname, 'dist'),
    writeToDisk: true,
    historyApiFallback: {
      index: '/',
    },
  } : undefined,

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-typescript',
            '@babel/react'
          ],
          plugins: [
            isDevelopment && require.resolve('react-refresh/babel'),
            [
              'import', { 
                libraryName: 'antd',
                style: true,
              } 
            ],
            'babel-plugin-styled-components',
            '@babel/plugin-proposal-class-properties',
            [
              "@babel/plugin-transform-runtime",
              {
                "regenerator": true,
              }
            ]
          ].filter(Boolean),
        },
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': theme.primaryColor,
                  'link-color': theme.linkColor,
                  'border-radius-base': theme.borderRadiusBase,
                  'font-size-base': theme.fontSizeBase,
                },
                javascriptEnabled: true,
              }
            }
          }
        ]
      },
      { test: /\.test.(ts|js)x?$/, loader: 'ignore-loader' }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './asset/favicon.png',
      templateContent: `
        <html>
          <body>
            <div id="root"></div>
          </body>
        </html>
      `
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
