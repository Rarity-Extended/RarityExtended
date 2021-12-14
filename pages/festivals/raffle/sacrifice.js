import React, {useState, useEffect} from 'react'
import useRarity from 'contexts/useRarity'
import Adventurer from 'components/Adventurer'
import Button from 'components/Button'
import Box from 'components/Box'
import ModalSelectAdventurer from 'components/ModalSelectAdventurer'
import toast from 'react-hot-toast'

function Index({ router }) {
  const [ selectAdventurerIsOpen, setSelectAdventurerIsOpen ] = useState(false)
  const [ beneficiary, setBeneficiary ] = useState(null)
  const	{currentAdventurer} = useRarity()

  function onSelectAdventurer(adventurer) {
    setBeneficiary(adventurer);
  }

  function onSacrifice() {
    const name = currentAdventurer.name || currentAdventurer.tokenID
    const	_toast = toast.loading(`The sacrifice of ${name} has begun...`);
  }

  function selectBeneficiary() {
    return <div className={'w-adventure-card h-adventure-card'}>
      <Box
        onClick={() => setSelectAdventurerIsOpen(true)}
        className={'w-full h-full p-4 flex justify-center items-center flex-col group hover:bg-gray-principal dark:hover:bg-dark-900 cursor-pointer\'} transition-colors relative mb-4 md:mb-0 cursor-pointer'}>
        <p className={'w-full h-full text-6xl flex items-center justify-center'}>?</p>
      </Box>
      <p className={'mt-10 text-black dark:text-white text-center'}>
        {`Select a beneficiary`}
      </p>
    </div>
  }

  function beneficiaryCard() {
    return <div className={'w-adventure-card h-adventure-card'}>
      <Adventurer adventurer={beneficiary} onClick={() => setSelectAdventurerIsOpen(true)} width={240} height={240}></Adventurer>
      <p className={'mt-8 text-black dark:text-white text-center'}>
      This beneficiary will receive <br /><span className="text-blood-500">N tickets</span>
      </p>
    </div>
  }

  return <section className={'max-w-full'}>
    <div className={'max-w-prose w-full relative mt-8 mx-auto px-3 flex flex-col items-center'}>
      <div>
        <p onClick={() => router.back()}
          className={'text-black dark:text-white text-megaxs absolute left-4 top-2 hover:underline cursor-pointer'}>
          {'< Back'}
        </p>
        <h1 className={'text-blood-500 text-base text-2xl'}>
          {'BLOOD SACRIFICE!'}
        </h1>
        <div className={'text-black dark:text-white text-xxs absolute right-4 top-2 flex flex-row items-center'}>
          {}
        </div>
      </div>

      <div className={'mt-24 flex flex-row'}>
        <div>
          <Adventurer adventurer={currentAdventurer} 
            width={240} height={240} 
            borderStyle={'bg-blood-600'} 
            bgStyle={'bg-blood-200 dark:bg-blood-900'} 
            noHover={true}></Adventurer>
          <Button onClick={onSacrifice}
            disabled={!beneficiary}
            className={'mt-8 button-bloody'}
            disabledClassName={'mt-8 button-bloody-disabled'}
            borderStyle={'bg-blood-600'}
            disabledBorderStyle={'bg-blood-200 dark:bg-blood-800'}>
            <div className={'text-lg'}>
              {`Sacrifice`}
            </div>
          </Button>
        </div>
        <div className={'mx-16 h-adventure-card text-2xl flex items-center justify-center text-black dark:text-dark-100'}>
          -&gt;
        </div>
        <div>
          {!beneficiary && selectBeneficiary()}
          {beneficiary && beneficiaryCard()}
          <ModalSelectAdventurer 
            isOpen={selectAdventurerIsOpen} 
            onClose={() => setSelectAdventurerIsOpen(false)} 
            onSelect={onSelectAdventurer} 
            exclusions={[currentAdventurer.tokenID]}>
          </ModalSelectAdventurer>
        </div>

      </div>
    </div>
  </section>
}

export default Index