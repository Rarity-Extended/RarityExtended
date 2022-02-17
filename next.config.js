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

		//RARITY CORE
		RARITY_ADDR: '0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb',
		RARITY_ATTR_ADDR: '0xb5f5af1087a8da62a23b08c00c6ec9af21f397a1',
		RARITY_GOLD_ADDR: '0x2069B76Afe6b734Fb65D1d099E7ec64ee9CC76B2',
		RARITY_SKILLS_ADDR: '0x51C0B29A1d84611373BA301706c6B4b72283C80F',
		RARITY_FEATS_ADDR: '0x4F51ee975c01b0D6B29754657d7b3cC182f20d8a',
		RARITY_CRAFTING_ADDR: '0xf41270836dF4Db1D28F7fd0935270e3A603e78cC',
		RARITY_ATTR_ABI: require('./utils/abi/rarityAttr.abi.json'),
		RARITY_SKILLS_ABI: require('./utils/abi/raritySkills.abi.json'),
		RARITY_FEATS_ABI: require('./utils/abi/rarityFeats.abi.json'),

		//RARITY ECOSYSTEM
		RARE_SKINS_ADDR: '0x6fEd400dA17f2678C450aA1D35e909653B3b482A',

		//RARITY HELPERS
		RARITY_CRAFTING_HELPER_ADDR: '0x19DDBf12517bB827C14aDb544485073950Dc8F10',
		RARITY_COOKING_HELPER_ADDR: '0xFE23ea8C57Ee4f28E9C60cA09C512Ce80e90E6F5',
		RARITY_SKIN_HELPER_ADDR: '0xbe570c81e8bc6a4ca2675fe619044b389df32566',

		//RARITY EXTENDED
		RARITY_EXTENDED_COOKING_ADDR: '0x7474002fe5640d612c9a76cb0b6857932ff891e8',
		RARITY_EXTENDED_NAME: '0x4762AF980240eFEBbc2D6E46C408A720C20D0e10',
		RARITY_EXTENDED_CARE: '0xc066618F5c84D2eB002b99b020364D4CDDE6245D',
		RARITY_EXTENDED_XP_ADDR: '0x640bdeff13ae5527424acd868F65357270b05eB8',

		//DUNGEONS
		DUNGEON_THE_CELLAR_ADDR: '0x2A0F1cB17680161cF255348dDFDeE94ea8Ca196A',
		DUNGEON_THE_FOREST_ADDR: '0x48e6F88F1Ab05677675dE9d14a705f8A137ea2bC',
		DUNGEON_THE_FOREST_V1_ADDR: '0xb37d3d79ea86B0334d9322c695339D577A3D57be',		
		DUNGEON_BOARS_ADDR: '0x5412a3c353426dfc14443c0fe6032c5d70fe3437',
		DUNGEON_OPEN_MIC_V2_ADDR: '0x29d51E8736FCC8C2662aA1B2cf46753d5918606F',
		DUNGEON_THE_CELLAR_ABI: require('./utils/abi/dungeonTheCellar.abi.json'),
		DUNGEON_THE_FOREST_ABI: require('./utils/abi/dungeonTheForest.abi.json'),
		DUNGEON_BOARS_ABI: require('./utils/abi/dungeonBoars.abi.json'),
		DUNGEON_OPEN_MIC_V2_ABI: require('./utils/abi/dungeonOpenMic.abi.json'),


		//LOOTS
		LOOT_MUSHROOM_ADDR: '0xcd80cE7E28fC9288e20b806ca53683a439041738',
		LOOT_BERRIES_ADDR: '0x9d6C92CCa7d8936ade0976282B82F921F7C50696',
		LOOT_WOOD_ADDR: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1',
		LOOT_LEATHER_ADDR: '0xc5E80Eef433AF03E9380123C75231A08dC18C4B6',
		LOOT_MEAT_ADDR: '0x95174B2c7E08986eE44D65252E3323A782429809',
		LOOT_TUSKS_ADDR: '0x60bFaCc2F96f3EE847cA7D8cC713Ee40114be667',
		LOOT_CANDIES_ADDR: '0x18733f3C91478B122bd0880f41411efd9988D97E',
		LOOT_ERC20_ABI: require('./utils/abi/lootERC20.abi.json'),

		//MEALS
		MEAL_GRILLED_MEAT: '0x97e8f1061224cb532F808b074786C76e977BA6EE',
		MEAL_MUSHROOM_SOUP: '0x2e3e1C1F49A288ebF88be66a3ED3539B5971f25D',
		MEAL_BERRIES_PIE: '0x57e4cD55289da26aa7cb607c00c5dDcd0f7980a2',
		MEAL_MUSHROOM_MEAT_SKEWER: '0x65567a2fBC14B4aBCd414bb6902384745d4353f6',
		MEAL_MUSHROOM_BERRIES_MIX: '0xF06FfE67CB96641eEC55eA19126BD8F0107Ff0Ad',
		MEAL_BERRIES_WINE: '0xA0e9159EfC4407c4465bbCDF0e7538D6869d81a3',

		RARITY_EQUIPEMENT_WRAPPER_ADDR: '0x9e22037eDC472b9b46E35635220411FeEdC53386',
		RARITY_EQUIPEMENT_ARMOR_HEAD_ADDR: '0xC180006Cd8bAe7E10bbF3dcf02EbcE3324Ef3126',
		RARITY_EQUIPEMENT_ARMOR_BODY_ADDR: '0x3d2B819591cbf1967C5D240dF1040d1FfCb368A3',
		RARITY_EQUIPEMENT_ARMOR_HAND_ADDR: '0xa1C1B1248485D04D94F55D01860632B548043322',
		RARITY_EQUIPEMENT_ARMOR_FOOT_ADDR: '0x9eC3D72843b1cf9DcA99F0d152068e3dd751c6Fd',
		RARITY_EQUIPEMENT_WEAPON_PRIMARY_ADDR: '0xF261B23eD575826D4e4473c46abD1BbcB2697695',
		RARITY_EQUIPEMENT_WEAPON_SECONDARY_ADDR: '0x698f6df058eF4360891c3F4985a01Db77F4497d1',
		RARITY_EQUIPEMENT_WEAPON_SHIELD_ADDR: '0x3EcDc472Dff94a0c1fC4C429D30638fC483c521F',
		RARITY_EXTENDED_EQUIPEMENT_BASIC_SET_ADDR: '0xe7D290dCc497A9bc40B0aa051036cf7456933294',
		RARITY_EXTENDED_EQUIPEMENT_BASIC_SET_ARMOR_CODEX_ADDR: '0x8aDf5CA7E4e8aeB2A77ff61EdD5F153d9d12f0cE',
		RARITY_EXTENDED_EQUIPEMENT_BASIC_SET_WEAPON_CODEX_ADDR: '0x4823B79c9f66292caD4156Fcf3c1a220ae6EC9DB',
		
		RARITY_EXTENDED_FARM_CORE:   '0x11871B9f987C4F356728211CADB7cC867FCbDf1F',
		RARITY_EXTENDED_WOOD_LOOT_0: '0xdcE321D1335eAcc510be61c00a46E6CF05d6fAA1',
		RARITY_EXTENDED_WOOD_LOOT_1: '0x0b86177A217FF65a1A30bDf125BCb51d9Cf086Df',
		RARITY_EXTENDED_WOOD_LOOT_2: '0x3546F880e55e158E11D4DCA6ee5aA5B98f2bca44',
		RARITY_EXTENDED_WOOD_LOOT_3: '0xC38fE36a93036A51d0Ac65dFccd39f403834F00f',
		RARITY_EXTENDED_WOOD_LOOT_4: '0xD41B44a36F39f640FbcB07bdd246323fb137c322',
		RARITY_EXTENDED_WOOD_LOOT_5: '0x4c4d4Fb069F40495CAbAc1EC5ff8E7Cc2E5eB6F1',
		RARITY_EXTENDED_WOOD_FARM_0: '0xA706791D35E4d3F927B61Dc0De549de1506B0f3D',
		RARITY_EXTENDED_WOOD_FARM_1: '0xd282dBE42941066538767Fc8fa1D8AFAF027a16E',
		RARITY_EXTENDED_WOOD_FARM_2: '0x368903A88109e67DEA9d0643C8C7B2c2571Ad689',
		RARITY_EXTENDED_WOOD_FARM_3: '0x1C203e8a81D82c6A5D559b18386285A8C717ff77',
		RARITY_EXTENDED_WOOD_FARM_4: '0xB26b2cc2a7e4b7d7E33A034D7B393a7e930EBC68',
		RARITY_EXTENDED_WOOD_FARM_5: '0xaFBe9d0d3D7Ba2eB0CeA57187A7a96EDccE80047',

		RARITY_EXTENDED_ORE_LOOT_0: '0xC61b5762b51459DD46Bd3C3878701a606B4B82b7',
		RARITY_EXTENDED_ORE_LOOT_1: '0x0fD01F026563d8c72Dd06D5B9c91Dd4553fEaE54',
		RARITY_EXTENDED_ORE_LOOT_2: '0x0ef9f72dC06867b5279a7e41cAa7e856714577dC',
		RARITY_EXTENDED_ORE_LOOT_3: '0x7E931B6C0B6b01bF4862410b8C29f459e2803316',
		RARITY_EXTENDED_ORE_LOOT_4: '0x987432C7762cA8fCd7f05D54811160a4C6157cee',
		RARITY_EXTENDED_ORE_LOOT_5: '0x41052b4996740de191f72a32B91F114a93a1390d',
		RARITY_EXTENDED_ORE_FARM_0: '0xd2d0602727F979E8C61b87aBbBDb875012Bbd18F',
		RARITY_EXTENDED_ORE_FARM_1: '0x71023122ab41bFe1A79D53A1414a57045D395771',
		RARITY_EXTENDED_ORE_FARM_2: '0x7FFBEACF9209AEb52Afe641f584F680961718F73',
		RARITY_EXTENDED_ORE_FARM_3: '0xaEa0707D9EBa3659852C5FdC98eab5360f22e124',
		RARITY_EXTENDED_ORE_FARM_4: '0xA6bDc7180260335a4deB25ED0454fDeA7C55792d',
		RARITY_EXTENDED_ORE_FARM_5: '0x844CC3EceA7D66B10F944296B6cD5245B17a4A04',

		RARITY_EXTENDED_FARM_TYPE_WOOD: 1,
		RARITY_EXTENDED_FARM_TYPE_ORE: 2,

		// Bank Section - Yearn
		ZAP_VAULT_ADDR: '0xfCE6CbeF3867102da383465cc237B49fF4B9d48F',
		FTM_VAULT_ADDR: '0x0dec85e74a92c52b7f708c4b10207d9560cefaf0',
		DAI_VAULT_ADDR: '0x637eC617c86D24E421328e6CAEa1d92114892439',
		DAI_TOKEN_ADDR: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
		WFTM_TOKEN_ADDR: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83'
	}
});
