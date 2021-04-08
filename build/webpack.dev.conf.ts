// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import FriendlyErrorsPlugin, {Severity} from 'friendly-errors-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import {getIPAdress, resolve} from './util'
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const PORT = 9898

export default {
  context: path.resolve(__dirname, '../'),
  entry: {
    main: './src/index.tsx'
  },
  output: {
    filename: 'static/js/[name].[hash:8].js',
    publicPath: '/'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less', '.css'],
    alias: {
      '@': resolve('src'),
      '@biqi/ui': resolve('packages/ui')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.join(__dirname, 'src')],
        options: {
          fix: true
        }
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: [
          'cache-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: resolve('tsconfig.json'),
              compilerOptions: {
                module: 'commonjs',
                target: 'es5',
                jsx: 'react'
              }
            }
          }
        ],
        include: [resolve('src'), resolve('packages')],
        exclude: [resolve('node_modules')]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader?javascriptEnabled=true'
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.md(\?.*)?$/,
        loaders: ['html-loader', 'markdown-loader']
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/,
        loaders: ['url-loader?limit=10000&name=static/img/[name].[hash:8].[ext]']
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loaders: ['file-loader?name=static/font/[name].[hash:8].[ext]']
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      memoryLimit: 4096
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[hash:8].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'biqi ui',
      filename: 'index.html',
      chunks: ['main'],
      template: path.join(__dirname, 'index.html'),
      inject: true,
      package_version: 'development'
    }),
    new webpack.HotModuleReplacementPlugin(),

    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application [biqi] is running here: http://${getIPAdress()}:${PORT}`],
        notes: []
      },
      onErrors(_: Severity, errors: string) {
        console.error(errors)
      }
    })
    // new CopyWebpackPlugin([
    //     {
    //         from: resolve('static'),
    //         to: 'static',
    //         ignore: ['.*']
    //     }
    // ])
  ],
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/$/,
          to: '/index.html'
        }
      ]
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: '0.0.0.0',
    port: PORT,
    overlay: {warnings: false, errors: true},
    publicPath: '/',
    quiet: true,
    watchOptions: {
      poll: true
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9960',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    disableHostCheck: true
  },
  mode: 'development',
  devtool: 'cheap-source-map',
  optimization: {
    minimize: false,
    namedModules: true,
    noEmitOnErrors: true
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
