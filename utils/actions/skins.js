/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Monday October 18th 2021
**	@Filename:				skins.js
******************************************************************************/

export async function	getSkinNFT({contractAddress, tokenID}) {
	try {
		const	contract = new ethers.Contract(
			contractAddress, [
				'function tokenURI(uint256 tokenId) external view returns (string memory)'
			]		
		);
		const skin = contract.tokenURI(tokenID)
		return skin
	} catch (error) {
		console.error(error);
		return;
	}
}