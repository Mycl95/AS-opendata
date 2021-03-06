const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const svelteConfig = require('./svelte.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: {
		bundle: ['./src/main.ts']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte'),
			'@Components': path.resolve(__dirname, 'src/Components/'),
			'@Services': path.resolve(__dirname, 'src/Services/'),
			'@Assets': path.resolve(__dirname, 'src/Assets/'),
			'@Utilities': path.resolve(__dirname, 'src/Utilities/'),
			'@Stores': path.resolve(__dirname, 'src/Stores/'),
			'@Types': path.resolve(__dirname, 'src/Types/'),
		},
		extensions: ['.mjs', '.js', '.svelte', '.ts'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|mjs|svelte)$/,
				exclude: /node_modules\/(?!svelte)/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: svelteConfig
				}
			},
			{
				test: /\.(js|mjs|svelte)$/,
				exclude: /node_modules/,
				use: ['eslint-loader']
			},
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						}
					}
				]
			},
			{
				test: /\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: !prod
						}
					},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif|mp4|svg|ttf)$/,
				use: [
					{
						loader: 'file-loader'
					},
				],
			},
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new Dotenv(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			title: 'svelte-boilerplate'
		}),
	],
	devtool: prod ? false : 'source-map',
	devServer: {
		port: 3000,
		writeToDisk: true,
		host: '0.0.0.0'
	}
};
