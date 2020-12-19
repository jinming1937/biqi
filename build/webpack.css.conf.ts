import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path'
import webpack from 'webpack'

function resolve(dir: string): string {
	return path.join(__dirname, '..', dir)
}

export default {
	context: path.resolve(__dirname, '../'),
	entry: {
		main: './packages/ui/src/theme/index.less',
	},
	output: {
    path: path.resolve(__dirname, '../packages/ui/dist/theme'),
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
	resolve: {
		extensions: ['.less', '.css'],
		alias: {
			'@': resolve('src'),
			'@biqi/ui': resolve('packages/ui'),
		},
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader!less-loader?javascriptEnabled=true',
				}),
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader',
				}),
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
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
			},
		}),

		new ExtractTextPlugin({
			filename: './index.css',
			allChunks: true,
		}),
		new OptimizeCSSPlugin(),
	],
	mode: 'production',
	optimization: {
		minimize: false,
		namedModules: true,
		noEmitOnErrors: true,
	},
}
