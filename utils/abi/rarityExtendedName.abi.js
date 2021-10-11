/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday October 5th 2021
**	@Filename:				rarityExtendedName.abi.js
******************************************************************************/

const	ABI = [
	{
		'inputs': [
			{
				'internalType': 'uint256',
				'name': '_adventurer',
				'type': 'uint256'
			}
		],
		'name': 'get_name',
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
				'name': '_adventurer',
				'type': 'uint256'
			},
			{
				'internalType': 'string',
				'name': '_name',
				'type': 'string'
			}
		],
		'name': 'set_name',
		'outputs': [],
		'stateMutability': 'nonpayable',
		'type': 'function'
	}
];

export default ABI;