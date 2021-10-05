/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Wednesday September 15th 2021
**	@Filename:				dungeonTheForest.abi.js
******************************************************************************/

const	ABI = [
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': '_rarityAddr',
				'type': 'address'
			},
			{
				'internalType': 'address',
				'name': '_rarityForestAddr',
				'type': 'address'
			},
			{
				'internalType': 'address',
				'name': '_rarityForestV2Addr',
				'type': 'address'
			}
		],
		'stateMutability': 'nonpayable',
		'type': 'constructor'
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'uint256',
				'name': 'owner',
				'type': 'uint256'
			},
			{
				'indexed': true,
				'internalType': 'uint256',
				'name': 'approved',
				'type': 'uint256'
			},
			{
				'indexed': true,
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'Approval',
		'type': 'event'
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'uint256',
				'name': 'owner',
				'type': 'uint256'
			},
			{
				'indexed': true,
				'internalType': 'uint256',
				'name': 'operator',
				'type': 'uint256'
			},
			{
				'indexed': false,
				'internalType': 'bool',
				'name': 'approved',
				'type': 'bool'
			}
		],
		'name': 'ApprovalForAll',
		'type': 'event'
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'summonerId',
				'type': 'uint256'
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'initBlockTs',
				'type': 'uint256'
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'endBlockTs',
				'type': 'uint256'
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'timeInDays',
				'type': 'uint256'
			}
		],
		'name': 'ResearchStarted',
		'type': 'event'
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': true,
				'internalType': 'uint256',
				'name': 'from',
				'type': 'uint256'
			},
			{
				'indexed': true,
				'internalType': 'uint256',
				'name': 'to',
				'type': 'uint256'
			},
			{
				'indexed': true,
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'Transfer',
		'type': 'event'
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'summonerId',
				'type': 'uint256'
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'treasureId',
				'type': 'uint256'
			}
		],
		'name': 'TreasureDiscovered',
		'type': 'event'
	},
	{
		'anonymous': false,
		'inputs': [
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'treasureId',
				'type': 'uint256'
			},
			{
				'indexed': false,
				'internalType': 'uint256',
				'name': 'newLevel',
				'type': 'uint256'
			}
		],
		'name': 'TreasureLevelUp',
		'type': 'event'
	},
	{
		'inputs': [],
		'name': '_tokenIdCounter',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '_value',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'from',
				'type': 'uint256'
			},
			{
				'internalType': 'uint256',
				'name': 'to',
				'type': 'uint256'
			},
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'approve',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'owner',
				'type': 'uint256'
			}
		],
		'name': 'balanceOf',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'burner',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'summonerId',
				'type': 'uint256'
			}
		],
		'name': 'discover',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'getApproved',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'summonerId',
				'type': 'uint256'
			}
		],
		'name': 'getResearchBySummoner',
		'outputs': [
			{
				'components': [
					{
						'internalType': 'uint256',
						'name': 'timeInDays',
						'type': 'uint256'
					},
					{
						'internalType': 'uint256',
						'name': 'initBlockTs',
						'type': 'uint256'
					},
					{
						'internalType': 'bool',
						'name': 'discovered',
						'type': 'bool'
					},
					{
						'internalType': 'uint256',
						'name': 'summonerId',
						'type': 'uint256'
					},
					{
						'internalType': 'address',
						'name': 'owner',
						'type': 'address'
					},
					{
						'internalType': 'uint256',
						'name': 'endBlockTs',
						'type': 'uint256'
					}
				],
				'internalType': 'struct TheRarityForestV3.Research',
				'name': '',
				'type': 'tuple'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'summonerId',
				'type': 'uint256'
			}
		],
		'name': 'getTreasuresBySummoner',
		'outputs': [
			{
				'components': [
					{
						'internalType': 'uint256',
						'name': 'summonerId',
						'type': 'uint256'
					},
					{
						'internalType': 'uint256',
						'name': 'treasureId',
						'type': 'uint256'
					},
					{
						'internalType': 'string',
						'name': 'itemName',
						'type': 'string'
					},
					{
						'internalType': 'uint256',
						'name': 'magic',
						'type': 'uint256'
					},
					{
						'internalType': 'uint256',
						'name': 'level',
						'type': 'uint256'
					}
				],
				'internalType': 'struct TheRarityForestV3.Treasure[]',
				'name': '',
				'type': 'tuple[]'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'owner',
				'type': 'uint256'
			},
			{
				'internalType': 'uint256',
				'name': 'operator',
				'type': 'uint256'
			}
		],
		'name': 'isApprovedForAll',
		'outputs': [
			{
				'internalType': 'bool',
				'name': '',
				'type': 'bool'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'levelUp',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'name',
		'outputs': [
			{
				'internalType': 'string',
				'name': '',
				'type': 'string'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'ownerOf',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'rarityContract',
		'outputs': [
			{
				'internalType': 'contract IRarity',
				'name': '',
				'type': 'address'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'rarityForestContract',
		'outputs': [
			{
				'internalType': 'contract ITheRarityForest',
				'name': '',
				'type': 'address'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'rarityForestContractV2',
		'outputs': [
			{
				'internalType': 'contract ITheRarityForestV2',
				'name': '',
				'type': 'address'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'rescuer',
		'outputs': [
			{
				'internalType': 'address',
				'name': '',
				'type': 'address'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			},
			{
				'internalType': 'uint256',
				'name': 'receiver',
				'type': 'uint256'
			}
		],
		'name': 'restoreTreasure',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'rm',
		'outputs': [
			{
				'internalType': 'contract IRarity',
				'name': '',
				'type': 'address'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'saveTreasure',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'from',
				'type': 'uint256'
			},
			{
				'internalType': 'uint256',
				'name': 'operator',
				'type': 'uint256'
			},
			{
				'internalType': 'bool',
				'name': 'approved',
				'type': 'bool'
			}
		],
		'name': 'setApprovalForAll',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'address',
				'name': '_rescuer',
				'type': 'address'
			}
		],
		'name': 'setRescuer',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'summonerId',
				'type': 'uint256'
			},
			{
				'internalType': 'uint256',
				'name': 'timeInDays',
				'type': 'uint256'
			}
		],
		'name': 'startResearch',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'symbol',
		'outputs': [
			{
				'internalType': 'string',
				'name': '',
				'type': 'string'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'index',
				'type': 'uint256'
			}
		],
		'name': 'tokenByIndex',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'owner',
				'type': 'uint256'
			},
			{
				'internalType': 'uint256',
				'name': 'index',
				'type': 'uint256'
			}
		],
		'name': 'tokenOfOwnerByIndex',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'tokenURI',
		'outputs': [
			{
				'internalType': 'string',
				'name': '',
				'type': 'string'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [],
		'name': 'totalSupply',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'from',
				'type': 'uint256'
			},
			{
				'internalType': 'uint256',
				'name': 'to',
				'type': 'uint256'
			},
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'transferFrom',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'tokenId',
				'type': 'uint256'
			}
		],
		'name': 'treasure',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': '_summonerId',
				'type': 'uint256'
			},
			{
				'internalType': 'string',
				'name': '_itemName',
				'type': 'string'
			},
			{
				'internalType': 'uint256',
				'name': '_magic',
				'type': 'uint256'
			},
			{
				'internalType': 'uint256',
				'name': '_level',
				'type': 'uint256'
			}
		],
		'stateMutability': 'view',
		'type': 'function'
	},
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': 'currentLevel',
				'type': 'uint256'
			}
		],
		'name': 'xpRequired',
		'outputs': [
			{
				'internalType': 'uint256',
				'name': 'xpToNextLevel',
				'type': 'uint256'
			}
		],
		'stateMutability': 'pure',
		'type': 'function'
	}
];

export default ABI;
