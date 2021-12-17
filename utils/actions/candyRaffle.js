import { ethers } from 'ethers'
import toast from 'react-hot-toast'

export async function endTime({ provider }) {
  const signer = provider.getSigner()
  const raffle = new ethers.Contract(
    process.env.CANDY_RAFFLE_ADDR,
    ['function endTime() external view returns (uint)'],
    signer
  )
  return await raffle.endTime()
}

export async function enterRaffle({ provider, summoner, amount }, onSuccess) {
  let hadApprove = false
  let toastHandle = null
  const signer = provider.getSigner()
  const rarityCore = new ethers.Contract(
    process.env.RARITY_ADDR, [
    'function ownerOf(uint summoner) external view returns (address)',
    'function approve(address operator, uint summoner) external',
    'function getApproved(uint summoner) external view returns (bool)',
    'function isApprovedForAll(address owner, address operator) external view returns (bool)',
    ], signer
  )
  const raffle = new ethers.Contract(
    process.env.CANDY_RAFFLE_ADDR,
    [
      'function enterRaffle(uint summoner, uint amount)',
    ], signer
  )

  console.log(await signer.getAddress(), 'signer')
  console.log(await rarityCore.ownerOf(summoner), 'rarityCore.ownerOf(summoner)')

  try {
    if(await rarityCore.getApproved(summoner)) {
      toastHandle = toast.loading(`Buying ${amount} tickets for ${25 * amount} candies..`)
      try {
        await raffle.callStatic.enterRaffle(summoner, amount * 25);
        toast.dismiss(toastHandle);

      } catch (error) {
        toast.dismiss(toastHandle);
        toast.error('Impossible to submit transaction');
        console.log(error);
        return;

      }
    } else {
      toastHandle = toast.loading(`(1/2) Approve summoner`)

    }
  } catch(error) {

  }

}