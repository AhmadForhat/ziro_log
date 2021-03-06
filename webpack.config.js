const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const webpack = require('webpack')

module.exports = (env, { mode }) => {
	const config = {
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: ['@babel/plugin-transform-runtime']
						}
					}
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'raw-loader']
				}
			]
		},
		plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })]
	}
	if (mode === 'development') {
		const {
			ziro_correios_token,
			sheet_url,
			sheet_id,
			sheet_token
		} = require('./credentials')
		config.devtool = 'cheap-module-eval-source-map'
		config.devServer = { historyApiFallback: true }
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env': {
					ZIRO_CORREIOS_TOKEN: JSON.stringify(ziro_correios_token),
					SHEET_URL: JSON.stringify(sheet_url),
					SHEET_ID: JSON.stringify(sheet_id),
					SHEET_TOKEN: JSON.stringify(sheet_token)
				}
			})
		)
	}
	if (mode === 'production') {
		config.devtool = 'cheap-module-source-map'
		config.plugins.push(
			new CompressionPlugin(),
			new CopyWebpackPlugin([
				{ from: './_redirects', to: '_redirects', toType: 'file' },
				{ from: './src/sw.js', to: 'sw.js', toType: 'file' }
			]),
			new WebpackPwaManifest({
				name: 'Fabricantes',
				short_name: 'Fabricantes',
				start_url: '/',
				background_color: '#FFF',
				theme_color: '#FFF',
				display: 'standalone',
				icons: [{ src: './logo.png', sizes: [96, 128, 192, 256, 384, 512] }]
			}),
			new webpack.DefinePlugin({
				'process.env': {
					ZIRO_CORREIOS_TOKEN: JSON.stringify(process.env.ZIRO_CORREIOS_TOKEN),
					SHEET_URL: JSON.stringify(process.env.SHEET_URL),
					SHEET_ID: JSON.stringify(process.env.SHEET_ID),
					SHEET_TOKEN: JSON.stringify(process.env.SHEET_TOKEN)
				}
			})
		)
	}
	return config
}