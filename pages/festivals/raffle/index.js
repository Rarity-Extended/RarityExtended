import React, {useState, useEffect} from 'react'
import useWeb3 from 'contexts/useWeb3'
import useRarity from 'contexts/useRarity'
import CandyIcon from 'components/icons/Candy'
import Adventurer from 'components/Adventurer'
import Button from 'components/Button'
import ButtonCounterBase from 'components/ButtonCounterBase'

import { 
  CANDIES_PER_TICKET, 
  CANDIES_PER_SUMMONER, 
  PRIZE_COUNT,
  endTime,
  getTicketsPerSummoner,
  getWinningOdds,
  enterRaffle
} from 'utils/actions/candyRaffle'

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(duration)
dayjs.extend(relativeTime)

function	Index({ router }) {
  const	{ provider } = useWeb3()
	const	{ currentAdventurer, set_currentAdventurer, rNonce } = useRarity()
  const [ summonerId, setSummonerId ] = useState(currentAdventurer.tokenID)
  const	[ candies, setCandies ] = useState(Number(currentAdventurer?.inventory[9]) || 0)
  const [ tickets, setTickets ] = useState(0)
  const [ ticketPurchase, setTicketPurchase ] = useState(0)
  const [ endDate, setEndDate ] = useState()
  const [ odds, setOdds ] = useState([100, 100])

  useEffect(() => {
    (async () => {
      setEndDate(await endTime({ provider }))
    })()
  }, [])

	useEffect(() => {
    (async () => {
      if(summonerId !== currentAdventurer.tokenID) {
        setTicketPurchase(0)
        setSummonerId(currentAdventurer.tokenID)
      }

      const ownedCandies = Number(currentAdventurer?.inventory[9]) || 0
      setCandies(ownedCandies - (CANDIES_PER_TICKET * ticketPurchase))
      setTickets((await getTicketsPerSummoner({ provider, summoner: currentAdventurer.tokenID })).toNumber())

      // Error: Transaction reverted without a reason string
      // setOdds(await getWinningOdds({ provider, summoner: currentAdventurer.tokenID, plusTickets: 0 }))

    })()
  }, [rNonce, currentAdventurer, ticketPurchase, summonerId])

  function plusTicket() {
    if(candies >= CANDIES_PER_TICKET) {
      setTicketPurchase(ticketPurchase + 1)
    }
  }

  function minusTicket() {
    if(ticketPurchase > 0) {
      setTicketPurchase(ticketPurchase - 1)
    }
  }

  function maxTickets() {
    const max = Math.round(candies / CANDIES_PER_TICKET)
    setTicketPurchase(ticketPurchase + max)
  }

  async function buyTickets() {
    const candieAmount = ticketPurchase * CANDIES_PER_TICKET
    if(ticketPurchase > 0) {
      await enterRaffle({ 
        provider, 
        summoner: currentAdventurer?.tokenID, 
        amount: candieAmount
      })
      currentAdventurer.inventory[9] = String(candies)
      set_currentAdventurer(currentAdventurer)
      setTickets(tickets + ticketPurchase)
      setTicketPurchase(0)
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
        <div className={'flex flex-row items-center'}>
          {1}/{Math.round(odds[1] / odds[0])}
        </div>
      </div>
      <div className={'my-2 w-96 flex flex-row items-center justify-between'}>
        <div>{`Tickets`}</div>
        <div className={'relative'}>
          <ButtonCounterBase
            className={'bg-gray-principal hover:bg-white focus:bg-white dark:bg-dark-400 dark:hover:bg-dark-600 dark:focus:bg-dark-600'}
            backgroundColor={'bg-gray-principal dark:bg-dark-400'}
            value={tickets + ticketPurchase}
            onIncrement={plusTicket}
            onDecrement={minusTicket} />
          <div onClick={maxTickets} className="absolute right-0 -bottom-6 text-xs cursor-pointer underline">max</div>
        </div>
      </div>
      <Button onClick={buyTickets}
        disabled={ticketPurchase < 1}
        className={'mt-8 button-regular'}
        disabledClassName={'mt-8 button-regular-disabled'}
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
          What's the one thing every adventurer wants this holiday season? Buy some tickets and find out. <span className="text-lg text-items-common">Tickets are {CANDIES_PER_TICKET} candies each!</span> {PRIZE_COUNT} winning tickets will be drawn in
				</p>

        <p className={'mt-8 text-2xl'}>
          ~ {dayjs.duration(dayjs.unix(endDate?.toNumber()).diff(dayjs())).format('DD[d] HH[h] mm[m]')} ~
        </p>

				<div className={'mt-16 flex flex-row'}>
          <Adventurer adventurer={currentAdventurer} width={240} height={240} noHover={true}></Adventurer>
          <div className={'ml-12 flex flex-col justify-evenly'}>
            {sellCandies()}
          </div>
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
              Sacrifice your summoner for <span className='text-lg text-blood-400'>{CANDIES_PER_SUMMONER} candies</span> and give them to another member of your party.
              Then trade those for <span className='text-lg text-blood-400'>{CANDIES_PER_SUMMONER / CANDIES_PER_TICKET} tickets</span> !
            </p>
          </div>
        </>}

      </div>
		</section>
	)
}

export default Index