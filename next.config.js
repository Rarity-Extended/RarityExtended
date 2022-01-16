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
		RARITY_ABI: require('./utils/abi/rarity.abi.json'),

		RARITY_ATTR_ADDR: '0xb5f5af1087a8da62a23b08c00c6ec9af21f397a1',
		RARITY_ATTR_ABI: require('./utils/abi/rarityAttr.abi.json'),
		
		RARITY_GOLD_ADDR: '0x2069B76Afe6b734Fb65D1d099E7ec64ee9CC76B2',
		RARITY_GOLD_ABI: require('./utils/abi/rarityGold.abi.json'),
		
		RARITY_SKILLS_ADDR: '0x51C0B29A1d84611373BA301706c6B4b72283C80F',
		RARITY_SKILLS_ABI: require('./utils/abi/raritySkills.abi.json'),
		
		RARITY_FEATS_ADDR: '0x4F51ee975c01b0D6B29754657d7b3cC182f20d8a',
		RARITY_FEATS_ABI: require('./utils/abi/rarityFeats.abi.json'),
		
		RARITY_CRAFTING_ADDR: '0xf41270836dF4Db1D28F7fd0935270e3A603e78cC',
		RARITY_CRAFTING_ABI: require('./utils/abi/rarityCrafting.abi.json'),
		RARITY_CRAFTING_HELPER_ADDR: '0x348CAcd552e9fb1B36a7B5CA43516b6BD9e6F8F7',
		RARITY_CRAFTING_HELPER_ABI: require('./utils/abi/rarityCraftingHelper.abi.json'),
		RARITY_CRAFTING_ID: '1758709',

		RARITY_EXTENDED_NAME: '0x4762AF980240eFEBbc2D6E46C408A720C20D0e10',
		RARITY_EXTENDED_NAME_ABI: require('./utils/abi/rarityExtendedName.abi.json'),

		RARITY_EXTENDED_CARE: '0xc066618F5c84D2eB002b99b020364D4CDDE6245D',
		RARITY_EXTENDED_XP: '0x640bdeff13ae5527424acd868F65357270b05eB8',

		DUNGEON_THE_CELLAR_ADDR: '0x2A0F1cB17680161cF255348dDFDeE94ea8Ca196A',
		DUNGEON_THE_CELLAR_ABI: require('./utils/abi/dungeonTheCellar.abi.json'),

		DUNGEON_THE_FOREST_ADDR: '0x48e6F88F1Ab05677675dE9d14a705f8A137ea2bC',
		DUNGEON_THE_FOREST_ABI: require('./utils/abi/dungeonTheForest.abi.json'),

		DUNGEON_THE_FOREST_V1_ADDR: '0xb37d3d79ea86B0334d9322c695339D577A3D57be',		
		DUNGEON_THE_FOREST_V1_ABI: require('./utils/abi/dungeonTheForestV1.abi.json'),

		LOOT_MUSHROOM_ADDR: '0xcd80cE7E28fC9288e20b806ca53683a439041738',
		LOOT_BERRIES_ADDR: '0x9d6C92CCa7d8936ade0976282B82F921F7C50696',
		LOOT_WOOD_ADDR: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1',
		LOOT_LEATHER_ADDR: '0xc5E80Eef433AF03E9380123C75231A08dC18C4B6',
		LOOT_MEAT_ADDR: '0x95174B2c7E08986eE44D65252E3323A782429809',
		LOOT_TUSKS_ADDR: '0x60bFaCc2F96f3EE847cA7D8cC713Ee40114be667',
		LOOT_ERC20_ABI: require('./utils/abi/lootERC20.abi.json'),

		DUNGEON_BOARS_ADDR: '0xa79358CB5aefa3c550A8773848Dbb6E99e74300f',
		DUNGEON_BOARS_ABI: require('./utils/abi/dungeonBoars.abi.json'),

		DUNGEON_OPEN_MIC_V2_ADDR: '0x29d51E8736FCC8C2662aA1B2cf46753d5918606F',
		DUNGEON_OPEN_MIC_V2_ABI: require('./utils/abi/dungeonOpenMic.abi.json'),

		LOOT_CANDIES_ADDR: '0x18733f3C91478B122bd0880f41411efd9988D97E',
		FESTIVAL_SPOOKY_ADDR: '0xcEef9A54fDae249DD613F0058d29Fb179e58Abf2',
		FESTIVAL_SPOOKY_ABI: require('./utils/abi/festivalSpooky.abi.json'),
		FESTIVAL_SPOOKY_ID: '4158642',

		CANDY_RAFFLE_ADDR: '0xaE60Cc1a1Df258Ad28413f11e13C687ec14Aaac5',
		RARE_SKINS_ADDR: '0x6fEd400dA17f2678C450aA1D35e909653B3b482A',

		RARITY_EXTENDED_SKIN_HELPER_ADDR: '0xbe570c81e8bc6a4ca2675fe619044b389df32566',
		RARITY_EXTENDED_SKIN_HELPER_ABI: require('./utils/abi/rarityExtendedSkinHelper.abi.json'),

		ZAP_VAULT_ADDR: '0xfCE6CbeF3867102da383465cc237B49fF4B9d48F',
		FTM_VAULT_ADDR: '0x0dec85e74a92c52b7f708c4b10207d9560cefaf0',
		DAI_VAULT_ADDR: '0x637eC617c86D24E421328e6CAEa1d92114892439',
		DAI_TOKEN_ADDR: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
		WFTM_TOKEN_ADDR: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83'
	}
});
