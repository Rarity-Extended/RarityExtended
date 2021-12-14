import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import useRarity from 'contexts/useRarity'
import useUI from 'contexts/useUI'

function	Index({ router }) {
	const	{ currentAdventurer, rNonce } = useRarity()
  const [ won, setWon ] = useState(false)
  const	{ raritySkins } = useUI()
	const	{ skins } = useRarity()

  useEffect(() => {
    setWon(true)
  }, [currentAdventurer, rNonce])

  return <section className={'max-w-full'}>
    <div className={'max-w-prose w-full relative mt-8 mx-auto px-3 flex flex-col items-center'}>
      <div>
        <p onClick={() => router.back()}
          className={'text-black dark:text-white text-megaxs absolute left-4 top-2 hover:underline cursor-pointer'}>
          {'< Back'}
        </p>

        <h1 className={'text-base text-2xl'}>
          {won 
            ? <>You Won a <span className="text-items-rare">rare skin</span> !!</> 
            : 'You didn\'t win =('}
        </h1>

        <div className={'text-black dark:text-white text-xxs absolute right-4 top-2 flex flex-row items-center'}>
          {}
        </div>
      </div>

      {won && <>
        <div className="my-16">
          <Image
            src={raritySkins ? skins[currentAdventurer?.tokenID] || currentAdventurer?.skin : currentAdventurer?.skin}
            loading={'eager'}
            quality={90}
            width={340}
            height={340} />
        </div>
        <p className="mb-4">.~ Adventure in style ~.</p>
      </>}

      {!won && <>
        <p className="my-16">
          And you bought all those tickets! Alas, the lottery gods had other plans...
        </p>
        <p className="mb-4">.~ You can still adventure in style ~.</p>
      </>}

      <p>Check out <a className="text-items-rare" href="https://rarity-skins.com" target="_blank" rel="noreferrer">rarity-skins.com</a> for more skins</p>
    </div>
  </section>
}

export default Index