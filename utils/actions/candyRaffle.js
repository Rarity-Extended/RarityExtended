import { ethers } from 'ethers'
import toast from 'react-hot-toast'

const CONFIRMATIONS = 1

export const CANDIES_PER_TICKET = 25
export const CANDIES_PER_SUMMONER = 150
export const PRIZE_COUNT = 11

export async function endTime({ provider }) {
  const signer = provider.getSigner()
  const raffle = new ethers.Contract(
    process.env.CANDY_RAFFLE_ADDR, [
      'function endTime() external view returns (uint)',
    ], signer
  )
  return await raffle.endTime()
}

export async function getTicketsPerSummoner({ provider, summoner }) {
  const signer = provider.getSigner()
  const raffle = new ethers.Contract(
    process.env.CANDY_RAFFLE_ADDR, [
      'function getTicketsPerSummoner(uint summoner) external view returns (uint)',
    ], signer
  )
  return await raffle.getTicketsPerSummoner(summoner)
}

export async function getWinningOdds({ provider, summoner, plusTickets }) {
  const signer = provider.getSigner()
  const raffle = new ethers.Contract(
    process.env.CANDY_RAFFLE_ADDR, [
      'function getWinningOdds(uint summoner, uint plusTickets) external view returns (uint, uint)',
    ], signer
  )
  return await raffle.getWinningOdds(summoner, plusTickets)
}

export async function enterRaffle({ provider, summoner, amount }) {
  const tickets = amount / CANDIES_PER_TICKET
  const signer = provider.getSigner()
  const rarityCore = new ethers.Contract(
    process.env.RARITY_ADDR, [
    'function approve(address operator, uint summoner) external',
    'function getApproved(uint summoner) external view returns (bool)',
    ], signer
  )

  const raffle = new ethers.Contract(
    process.env.CANDY_RAFFLE_ADDR, [
      'function enterRaffle(uint summoner, uint amount)',
    ], signer
  )

  let toastHandle = toast.loading(`(1/2) Approve raffle..`)

  try {
    await rarityCore.callStatic.approve(process.env.CANDY_RAFFLE_ADDR, summoner)
  } catch (error) {
    toast.dismiss(toastHandle)
    toast.error('Impossible to submit transaction')
    console.log(error)
    return
  }

  try {
    const tx = await rarityCore.approve(process.env.CANDY_RAFFLE_ADDR, summoner)
    const result = await tx.wait(CONFIRMATIONS)
    toast.dismiss(toastHandle)
    if(result.status === 1) {

      toastHandle = toast.loading(`(2/2) Buy ${tickets} tickets for ${amount} candies..`)

      try {
        await raffle.callStatic.enterRaffle(summoner, amount)
      } catch (error) {
        toast.dismiss(toastHandle)
        toast.error('Impossible to submit transaction')
        console.log(error)
        return
      }

      try {
        const tx = await raffle.enterRaffle(summoner, amount)
        const result = await tx.wait(CONFIRMATIONS)
        toast.dismiss(toastHandle)
        if(result.status === 1) {
          toast.success(`${tickets} tickets purchased!`)
        } else {
          toast.error('Transaction failed')
          console.log('transaction failed, reason not given')
          return
        }

      } catch (error) {
        toast.dismiss(toastHandle)
        toast.error('Impossible to submit transaction')
        console.log(error)
        return
      }

    } else {
			toast.error('Transaction failed')
      console.log('transaction failed, reason not given')
      return
    }

  } catch(error) {
    toast.dismiss(toastHandle)
    toast.error('Impossible to submit transaction')
    console.log(error)
    return
  }
}

export async function sacrifice({ provider, summonerToSacrifice, summonerToSacrificeName, summonerToReceive, summonerToReceiveName }, onSuccess) {
  const signer = provider.getSigner()
  const rarityCore = new ethers.Contract(
    process.env.RARITY_ADDR, [
    'function approve(address operator, uint summoner) external',
    'function getApproved(uint summoner) external view returns (address)',
    ], signer
  )

  const raffle = new ethers.Contract(
    process.env.CANDY_RAFFLE_ADDR, [
      'function sacrifice(uint summonerToSacrifice, uint summonerToReceive) external',
    ], signer
  )

  const approvedAddress = await rarityCore.getApproved(summonerToSacrifice)
  const approved = approvedAddress === process.env.CANDY_RAFFLE_ADDR

  if(!approved) {
    let toastHandle = toast.loading(`(1/2) Approve sacrifice..`)
    try {
      await rarityCore.callStatic.approve(process.env.CANDY_RAFFLE_ADDR, summonerToSacrifice)
    } catch (error) {
      toast.dismiss(toastHandle)
      toast.error('Impossible to submit transaction')
      console.log(error)
      return
    }

    try {
      const tx = await rarityCore.approve(process.env.CANDY_RAFFLE_ADDR, summonerToSacrifice)
      const result = await tx.wait(CONFIRMATIONS)
      toast.dismiss(toastHandle)

      if(result.status !== 1) {
        toast.error('Transaction failed')
        console.log('transaction failed, reason not given')
        return
      }
    } catch(error) {
      toast.dismiss(toastHandle)
      toast.error('Impossible to submit transaction')
      console.log(error)
      return
    }
  }

  let toastHandle = toast.loading(`${approved?'':'(2/2) '}The sacrifice of ${summonerToSacrificeName} has begun..`)
  try {
    await raffle.callStatic.sacrifice(summonerToSacrifice, summonerToReceive)
  } catch (error) {
    toast.dismiss(toastHandle)
    toast.error('Impossible to submit transaction')
    console.log(error)
    return
  }

  try {
    const tx = await raffle.sacrifice(summonerToSacrifice, summonerToReceive)
    const result = await tx.wait(CONFIRMATIONS)
    toast.dismiss(toastHandle)

    if(result.status === 1) {
      toast.success(`Sacrifice complete. ${summonerToReceiveName} received ${CANDIES_PER_SUMMONER} candies!`)
      if(onSuccess) onSuccess()

    } else {
      toast.error('Transaction failed')
      console.log('transaction failed, reason not given')
      return
    }
  } catch(error) {
    toast.dismiss(toastHandle)
    toast.error('Impossible to submit transaction')
    console.log(error)
  }
}