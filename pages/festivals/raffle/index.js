import React, {useState, useEffect} from 'react'
import useWeb3 from 'contexts/useWeb3'
import useRarity from 'contexts/useRarity'
import CandyIcon from 'components/icons/Candy'
import Adventurer from 'components/Adventurer'
import Button from 'components/Button'
import ButtonCounterBase from 'components/ButtonCounterBase'
import { endTime, enterRaffle } from 'utils/actions/candyRaffle'

function	Index({ router }) {
  const	{provider} = useWeb3()
	const	{currentAdventurer, rNonce} = useRarity()
  const [summonerId, setSummonerId] = useState(currentAdventurer.tokenID)
  const [prizeCount, setPrizeCount] = useState(11)
  const [candiesPerTicket, setCandiesPerTicket] = useState(25)
  const [candiesPerSum, setCandiesPerSum] = useState(150)
  const	[candies, setCandies] = useState(Number(currentAdventurer?.inventory[9]) || 0)
  const [hasCandies, setHasCandies] = useState(Number(currentAdventurer?.inventory[9]) > 0 || false)
  const [tickets, setTickets] = useState(0)
  const [ticketPurchase, setTicketPurchase] = useState(0)
  const [endDate, setEndDate] = useState()

  useEffect(() => {
    (async () => {
      setEndDate(await endTime({ provider }))
    })()
  }, [])

	useEffect(() => {
    if(summonerId !== currentAdventurer.tokenID) {
      setTicketPurchase(0)
      setSummonerId(currentAdventurer.tokenID)
    }
    const ownedCandies = Number(currentAdventurer?.inventory[9]) || 0
		setCandies(ownedCandies - (candiesPerTicket * ticketPurchase))
    setHasCandies(Number(currentAdventurer?.inventory[9]) > 0)
	}, [rNonce, currentAdventurer, ticketPurchase, summonerId])

  function plusTicket() {
    if(candies >= candiesPerTicket) {
      setTicketPurchase(ticketPurchase + 1)
    }
  }

  function minusTicket() {
    if(ticketPurchase > 0) {
      setTicketPurchase(ticketPurchase - 1)
    }
  }

  async function buyTickets() {
    if(ticketPurchase > 0) {
      await enterRaffle({ provider, summoner: currentAdventurer?.tokenID, amount: ticketPurchase })
    }
  }

  function sellCandies() {
    return <>
      <div className={'w-96 flex flex-row items-center justify-between'}>
        <div>{`Candies`}</div>
        <div className={'flex flex-row items-center text-2xl'}>{candies} <CandyIcon className={'ml-4'} width={48} height={48} /></div>
      </div>
      <div className={'my-4 w-96 flex flex-row items-center justify-between'}>
        <div>{`Odds`}</div>
        <div className={'flex flex-row items-center'}>1/10,000</div>
      </div>
      <div className={'my-2 w-96 flex flex-row items-center justify-between'}>
        <div>{`Tickets`}</div>
        <div>
          <ButtonCounterBase
            className={'bg-gray-principal hover:bg-white focus:bg-white dark:bg-dark-400 dark:hover:bg-dark-600 dark:focus:bg-dark-600'}
            backgroundColor={'bg-gray-principal dark:bg-dark-400'}
            value={tickets + ticketPurchase}
            onIncrement={plusTicket}
            onDecrement={minusTicket} />
        </div>
      </div>
      <Button onClick={buyTickets}
        className={'mt-8 cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
        backgroundColor={'bg-gray-principal dark:bg-dark-400'}>
        <span className={'text-lg'}>Buy Tickets</span>
      </Button>
    </>
  }

	return (
		<section className={'max-w-full'}>
			<div className={'max-w-prose w-full relative mt-8 mx-auto px-3 flex flex-col items-center'}>
				<div>
					<p onClick={() => router.back()}
						className={'text-black dark:text-white text-megaxs absolute left-4 top-2 hover:underline cursor-pointer'}>
						{'< Back'}
					</p>
					<h1 className={'text-black dark:text-white text-base text-2xl'}>
						{'CANDY RAFFLE'}
					</h1>
					<div className={'text-black dark:text-white text-xxs absolute right-4 top-2 flex flex-row items-center'}>
            {}
					</div>
				</div>

        <p className={'mt-12 text-black dark:text-white text-base text-center'}>
					{'What\'s the one thing every summoner wants this holiday season?'}
				</p>
        <p className={'mb-6 text-black dark:text-white text-base text-center'}>
					{`Tickets are only ${candiesPerTicket} candies each. Buy some quick to find out!`}
				</p>
        <p className={'text-black dark:text-white text-base text-center'}>
					{prizeCount} winning tickets will be drawn in
				</p>
        <p className={'mt-8 text-2xl animate-pulse'}>00d 00h 00m</p>

				<div className={'mt-16 flex flex-row'}>
          <Adventurer adventurer={currentAdventurer} width={240} height={240} noHover={true}></Adventurer>
          {hasCandies && <div className={'ml-12 flex flex-col justify-evenly'}>
            {sellCandies()}
          </div>}
				</div>

        {currentAdventurer.level > 3 && <>
          <div className={'mt-24 flex flex-col items-center text-center'}>
            <h2 className={'text-xl'}>More ways to get tickets</h2>
            <Button 
              onClick={() => router.push('/festivals/raffle/sacrifice')}
              className={'my-8 button-bloody'}
              borderStyle={'bg-blood-600'}
              backgroundColor={'bg-gray-principal dark:bg-dark-400'}>
              <div className={'text-lg'}>
                {`Sacrifice ${currentAdventurer.name || currentAdventurer.tokenID}`}
              </div>
            </Button>
            <p className={'mb-4 text-sm'}>
              The raffle committee has a special offer for you: <span className={'text-lg text-blood-400'}>Blood Sacrifice!</span>&nbsp;
              Sacrifice your summoner for <span className='text-lg text-blood-400'>{candiesPerSum} candies</span> and give them to another member of your party.
              Then trade those for <span className='text-lg text-blood-400'>{candiesPerSum / candiesPerTicket} tickets</span> !
            </p>
          </div>
        </>}

      </div>
		</section>
	)
}

export default Index