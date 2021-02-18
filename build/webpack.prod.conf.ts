import ExtractTextPlugin from 'extract-text-webpack-plugin'
// import HtmlWebpackPlugin from 'html-webpack-plugin'
import UglifyjsWebpackPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

function resolve(dir: string): string {
  return path.join(__dirname, '..', dir)
}

export default {
  context: path.resolve(__dirname, '../'),
  entry: {
    biqi: './packages/ui/index.ts',
    style: './packages/ui/src/theme/index.less'
  },
  output: {
    library: 'BiQi',
    filename: '[name].mini.js',
    publicPath: '/ui/',
    libraryTarget: 'var',
    path: resolve('dist')
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
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    loose: true,
                    targets: {
                      browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
                    }
                  }
                ],
                '@babel/preset-react'
              ],
              plugins: ['@babel/plugin-transform-runtime', ['@babel/plugin-proposal-class-properties', {loose: false}]]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: resolve('tsconfig.json'),
              compilerOptions: {module: 'EsNext', target: 'es2018'}
            }
          }
        ],
        include: [resolve('src'), resolve('packages')],
        exclude: [resolve('dist'), resolve('node_modules')]
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
      // {
      //   test: /\.md(\?.*)?$/,
      //   loaders: ['html-loader', 'markdown-loader']
      // },
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
    new UglifyjsWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    // new ExtractTextPlugin({
    //   filename: './static/css/[name].[hash:8].css',
    //   allChunks: true
    // }),

    // new HtmlWebpackPlugin({
    //   title: 'biqiui',
    //   filename: 'index.html',
    //   chunks: ['main'],
    //   template: path.join(__dirname, 'index.html'),
    //   inject: true,
    //   favicon: resolve('favicon.ico'),
    //   package_version: 'production.min'
    // }),
    new ExtractTextPlugin({
      filename: './index.mini.css',
      allChunks: true
    }),
    new OptimizeCSSPlugin()
    // new CopyWebpackPlugin([
    //   {from: resolve('dist/biqi.mini.js'), to: resolve('packages/ui/dist/')},
    //   {from: resolve('dist/index.css'), to: resolve('packages/ui/dist/theme/')},
    // ])
  ],
  mode: 'production',
  optimization: {
    minimize: false,
    namedModules: true,
    noEmitOnErrors: true
  }
}
