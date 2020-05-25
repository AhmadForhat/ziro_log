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
			sheet_url,
			sheet_token,
			sheet_id,
			sheet_suppliers_id,
			continue_url,
			cnpj_url,
			cnpj_token,
			zoop_token,
			zoop_url_sellers,
			zoop_url_token_bank,
			zoop_url_bank_associate,
			zoop_url_upload_file,
			sheet_id_charge,
			seller_id_ziro,
			zoop_url_boleto,
			user_email,
			pdw_email
		} = require('./credentials')
		config.devtool = 'cheap-module-eval-source-map'
		config.devServer = { historyApiFallback: true }
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env': {
					SHEET_URL: JSON.stringify(sheet_url),
					SHEET_TOKEN: JSON.stringify(sheet_token),
					SHEET_ID: JSON.stringify(sheet_id),
					CONTINUE_URL: JSON.stringify(continue_url),
					CNPJ_URL: JSON.stringify(cnpj_url),
					CNPJ_TOKEN: JSON.stringify(cnpj_token),
					SHEET_SUPPLIERS_ID: JSON.stringify(sheet_suppliers_id),
					ZOOP_TOKEN: JSON.stringify(zoop_token),
					ZOOP_URL_SELLERS: JSON.stringify(zoop_url_sellers),
					ZOOP_URL_TOKEN_BANK: JSON.stringify(zoop_url_token_bank),
					ZOOP_URL_BANK_ASSOCIATE: JSON.stringify(zoop_url_bank_associate),
					ZOOP_URL_UPLOAD_FILE: JSON.stringify(zoop_url_upload_file),
					SHEET_ID_CHARGE: JSON.stringify(sheet_id_charge),
					SELLER_ID_ZIRO: JSON.stringify(seller_id_ziro),
					ZOOP_URL_BOLETO: JSON.stringify(zoop_url_boleto),
					USER_EMAIL: JSON.stringify(user_email),
					PDW_EMAIL: JSON.stringify(pdw_email),
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
					SHEET_URL: JSON.stringify(process.env.SHEET_URL),
					SHEET_TOKEN: JSON.stringify(process.env.SHEET_TOKEN),
					SHEET_ID: JSON.stringify(process.env.SHEET_ID),
					CONTINUE_URL: JSON.stringify(process.env.CONTINUE_URL),
					CNPJ_URL: JSON.stringify(process.env.CNPJ_URL),
					CNPJ_TOKEN: JSON.stringify(process.env.CNPJ_TOKEN),
					SHEET_SUPPLIERS_ID: JSON.stringify(process.env.SHEET_SUPPLIERS_ID),
					ZOOP_TOKEN: JSON.stringify(process.env.ZOOP_TOKEN),
					ZOOP_URL_SELLERS: JSON.stringify(process.env.ZOOP_URL_SELLERS),
					ZOOP_URL_TOKEN_BANK: JSON.stringify(process.env.ZOOP_URL_TOKEN_BANK),
					ZOOP_URL_BANK_ASSOCIATE: JSON.stringify(process.env.ZOOP_URL_BANK_ASSOCIATE),
					ZOOP_URL_UPLOAD_FILE: JSON.stringify(process.env.ZOOP_URL_UPLOAD_FILE),
					SHEET_ID_CHARGE: JSON.stringify(process.env.SHEET_ID_CHARGE),
					SELLER_ID_ZIRO: JSON.stringify(process.env.SHEET_ID_CHARGE),
					ZOOP_URL_BOLETO: JSON.stringify(process.env.ZOOP_URL_BOLETO),
					USER_EMAIL: JSON.stringify(process.env.USER_EMAIL),
					PDW_EMAIL: JSON.stringify(process.env.PDW_EMAIL),
				}
			})
		)
	}
	return config
}