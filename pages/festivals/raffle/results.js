import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { TwitterShareButton } from 'react-share'
import useWeb3 from 'contexts/useWeb3'
import Button from 'components/Button'
import { useConfetti } from 'components/ConfettiContext'
import { getWinners, getSkinId, getSkin } from 'utils/actions/candyRaffle'


function	Index({ router }) {
  const	{ provider } = useWeb3()
  const [ prizeId, setPrizeId ] = useState(0)
  const [ prizeImage, setPrizeImage ] = useState()

  const { setShowConfetti } = useConfetti()

  useEffect(() => {
    (async () => {
      if(provider) {
        const signerAddress = await provider.getSigner().getAddress()
        const winners = await getWinners({ provider })
        const index = winners.indexOf(signerAddress)
        if(index > -1) {
          const skinId = await getSkinId({ provider, index })
          setPrizeId(skinId)
          const skin = await getSkin({ provider, skinId })
          const img = JSON.parse(skin).image
          setPrizeImage(img)
          setShowConfetti(true)
        }
      }
    })()
    return () => {
      setShowConfetti(false)
    }
  }, [provider])

  return <section className={'max-w-full'}>
    <div className={'max-w-prose w-full relative mt-8 mx-auto px-3 flex flex-col items-center'}>
      <div>
        <p onClick={() => router.back()}
          className={'text-black dark:text-white text-megaxs absolute left-4 top-2 hover:underline cursor-pointer'}>
          {'< Back'}
        </p>

        <h1 className={'text-base text-2xl'}>
          {prizeId 
            ? <>You Won a <span className="text-items-rare">rare skin</span> !!</> 
            : 'You didn\'t win =('}
        </h1>

        <div className={'text-black dark:text-white text-xxs absolute right-4 top-2 flex flex-row items-center'}>
          {}
        </div>
      </div>

      {prizeId !== 0 && prizeImage && <>
        <div className="mt-16 mb-2 animate-bounce">
          <Image
            src={prizeImage}
            loading={'eager'}
            quality={90}
            width={340}
            height={340} />
        </div>

        <TwitterShareButton
          url={'https://rarityextended.com/'}
          title={'Whoa.. I just won a rare skin on Rarity Extended!!'}
          hashtags={['rarity', 'gamefi', 'ftm']}
          related={['RXtended', 'RaritySkins']}
          resetButtonStyle={true}
          className={'mb-8'}
          style={{ font: null }}>
          <Button onClick={() => {}}
            className={'button-regular'}
            backgroundColor={'bg-gray-principal dark:bg-dark-400'}>
            <span className={'text-lg'}>Tweet!</span>
          </Button>
        </TwitterShareButton>

        <p className="mb-4">.~ Adventure in style ~.</p>
        <p>Head over to <a className="text-items-rare" href="https://rarity-skins.com" target="_blank" rel="noreferrer">rarity-skins.com</a> and suit up!</p>
      </>}

      {!prizeId && <>
        <p className="my-16">
          And you bought all those tickets! Alas, the lottery gods had other plans...
        </p>
        <p className="mb-4">.~ You can still adventure in style ~.</p>
        <p>Check out <a className="text-items-rare" href="https://rarity-skins.com" target="_blank" rel="noreferrer">rarity-skins.com</a> for more skins</p>
      </>}

    </div>
  </section>
}

export default Index