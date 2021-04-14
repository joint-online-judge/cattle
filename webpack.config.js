const webpack = require('webpack');
const path = require('path');

// variables
const isProduction = process.env.NODE_ENV === 'prod';
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'dev', // use 'development' unless process.env.NODE_ENV is defined
    DEBUG: false,
  }),
  new HtmlWebpackPlugin({
    template: 'assets/index.html',
  }),
];
if (isProduction) {
  // use mini-css-extract-plugin for css only when production
  plugins.push(new MiniCssExtractPlugin({
    filename: isProduction ? '[contenthash].css' : '[fullhash].css',
  }));
}

module.exports = {
  context: sourcePath,
  entry: {
    app: './main.tsx',
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: isProduction ? '[contenthash].js' : '[id].js',
    chunkFilename: isProduction
        ? '[name].[contenthash].js'
        : '[name].[fullhash].js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      app: path.resolve(__dirname, 'src/app/'),
      'react-dom': '@hot-loader/react-dom',
      client: path.resolve(__dirname, 'src/client/'),
    },
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
    },
  },
  module: {
    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use: [
          !isProduction && {
            loader: 'babel-loader',
            options: {plugins: ['react-hot-loader/babel']},
          },
          'ts-loader',
        ].filter(Boolean),
      },
      // css
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
              importLoaders: 1,
              modules: {
                localIdentName: isProduction
                    ? '[hash:base64]'
                    : '[path][name]__[local]',
                mode: (resourcePath) => {
                  if (/pure.css$/i.test(resourcePath)) {
                    return 'pure';
                  }
                  if (/global.css$/i.test(resourcePath)) {
                    return 'global';
                  }
                  if (/react-markdown-editor-lite/g.test(resourcePath)) {
                    return 'global';
                  }
                  return 'local';
                },
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-import')({addDependencyTo: webpack}),
                  require('postcss-url')(),
                  require('postcss-preset-env')({
                    stage: 0,
                  }),
                  require('postcss-reporter'),
                  require('postcss-browser-reporter'),
                ],
              },
            },
          },
        ],
      },
      // less
      {
        test: /\.(less)$/,
        exclude: [
          /\.(css)$/,
          /src/,
        ],
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true,
              },
              // modifyVars: get_theme(),
            },
          },
        ],
      },
      // static assets
      {test: /\.html$/, use: 'html-loader'},
      {test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000'},
      {
        test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10,
          filename: isProduction
              ? 'vendor.[contenthash].js'
              : 'vendor.[fullhash].js',
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
  plugins,
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    stats: 'minimal',
    clientLogLevel: 'warning',
    proxy: {
      '/api': {
        // url of backend dev server
        target: 'http://localhost:34765',
        changeOrigin: true,
      },
    },
  },
  // https://webpack.js.org/configuration/devtool/
  devtool: isProduction ? undefined : 'eval-cheap-module-source-map',
};

if (isProduction) {

}
