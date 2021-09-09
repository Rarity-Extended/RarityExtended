/******************************************************************************
**	@Author:				The Ape Community
**	@Twitter:				@ape_tax
**	@Date:					Wednesday August 11th 2021
**	@Filename:				next.config.js
******************************************************************************/

const Dotenv = require('dotenv-webpack');

module.exports = ({
	plugins: [
		new Dotenv()
	],
	env: {
		FMT_KEY: process.env.FMT_KEY,
		WEBSITE_URI: process.env.WEBSITE_URI || 'https://adventure.major.tax/',
		RARITY_ADDR: '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb',
		RARITY_ATTR_ADDR: '0xb5f5af1087a8da62a23b08c00c6ec9af21f397a1',
		RARITY_GOLD_ADDR: '0x2069B76Afe6b734Fb65D1d099E7ec64ee9CC76B2',

		DUNGEON_THE_CELLAR_ADDR: '0x2A0F1cB17680161cF255348dDFDeE94ea8Ca196A'
	},
	optimization: {
		minimize: true,
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: 25,
			minSize: 20000
		}
	},
	webpack: (config, {webpack}) => {
		config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
		return config;
	},
	webpackDevMiddleware: (config) => {
		// Perform customizations to webpack dev middleware config
		// Important: return the modified config
		return config;
	},
});
