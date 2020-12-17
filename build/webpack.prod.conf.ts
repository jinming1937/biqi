// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import FriendlyErrorsPlugin, {Severity} from 'friendly-errors-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import UglifyjsWebpackPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path'
import webpack from 'webpack'
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function resolve(dir: string): string {
	return path.join(__dirname, '..', dir)
}

export default {
	context: path.resolve(__dirname, '../'),
	entry: {
		main: './src/index.tsx'
	},
	output: {
		library: 'BiQi',
    filename: 'static/[name].[hash:8].js',
    publicPath: '/ui/',
    libraryTarget: 'var',
    path: resolve('dist')
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less', '.css'],
		alias: {
      '@': resolve('src'),
      '@biqi/ui': resolve('packages/ui'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				use: [
          'cache-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: resolve('tsconfig.json'),
              compilerOptions: {
                module: 'commonjs',
                target: 'es6',
                jsx: 'react'
              }
            }
          }
        ],
				include: [resolve('src'), resolve('packages')],
        exclude: [resolve('node_modules')],
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
				loaders: ['html-loader', 'markdown-loader'],
			},
			{
				test: /\.(jpeg|jpg|png|gif|svg)$/,
				loaders: [
					'url-loader?limit=10000&name=static/img/[name].[hash:8].[ext]',
				],
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loaders: ['file-loader?name=static/font/[name].[hash:8].[ext]'],
			},
		],
	},
	plugins: [
    // new UglifyjsWebpackPlugin(),
		// new ForkTsCheckerWebpackPlugin({}),
		// new ForkTsCheckerNotifierWebpackPlugin({
		// 	title: 'TypeScript',
		// 	excludeWarnings: false,
		// }),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
			},
		}),

		new ExtractTextPlugin({
			filename: './static/css/[name].[hash:8].css',
			allChunks: true,
		}),
		// new MiniCssExtractPlugin({
		// // Options similar to the same options in webpackOptions.output
		// // both options are optional
		//     filename: "[name].css",
		//     chunkFilename: "[id].css"
    // }),

		new HtmlWebpackPlugin({
			title: '小鱼工具',
			filename: 'index.html',
			chunks: ['main'],
			template: path.join(__dirname, 'index.html'),
			inject: true,
      favicon: resolve('favicon.ico'),
      package_version: 'production.min'
    }),
    new OptimizeCSSPlugin(),

		// new FriendlyErrorsPlugin({
		// 	compilationSuccessInfo: {
		// 		messages: [`Your application [toolbox] has built successlly!!!`],
		// 		notes: [],
		// 	},
		// 	onErrors(_: Severity, errors: string) {
		// 		console.error(errors)
		// 	},
		// }),
		// new CopyWebpackPlugin([
		//     {
		//         from: resolve('static'),
		//         to: 'static',
		//         ignore: ['.*']
		//     }
		// ])
	],
	mode: 'production',
	optimization: {
		minimize: false,
		namedModules: true,
		noEmitOnErrors: true,
	},
}