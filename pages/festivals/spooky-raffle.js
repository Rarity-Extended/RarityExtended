import	React, {useState, useEffect}	from	'react';
import	useRarity						from	'contexts/useRarity';
import	CandyIcon					from 	'components/icons/Candy';
import	Adventurer										from	'components/Adventurer';
import	Button							from	'components/Button';
import	ButtonCounter					from	'components/ButtonCounter';

function	Index({router}) {
	const	{currentAdventurer, rNonce} = useRarity();
	const	[numberOfCandies, set_numberOfCandies] = useState(Number(currentAdventurer?.inventory[9]) || 0);

	useEffect(() => {
		set_numberOfCandies(Number(currentAdventurer?.inventory[9]) || 0);
	}, [rNonce, currentAdventurer]);

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
					{'Tickets are only 25 candies each. Buy some quick to find out!'}
				</p>
        <p className={'text-black dark:text-white text-base text-center'}>
					{'10 winning tickets will be drawn in'}
				</p>
        <p className={'text-2xl animate-pulse'}>00d 00h 00m</p>

				<div className={'mt-24 flex flex-row'}>
          <Adventurer adventurer={currentAdventurer} width={240} height={240} noHover={true}></Adventurer>

          <div className={'ml-12 flex flex-col justify-evenly'}>
            <div className={'w-96 flex flex-row items-center justify-between'}>
              <div>{`Candies`}</div>
              <div className={'flex flex-row items-center text-2xl'}>{numberOfCandies} <CandyIcon className={'ml-4'} width={48} height={48} /></div>
            </div>

            <div className={'my-4 w-96 flex flex-row items-center justify-between'}>
              <div>{`Odds`}</div>
              <div className={'flex flex-row items-center'}>1/10,000</div>
            </div>

            <div className={'my-2 w-96 flex flex-row items-center justify-between'}>
              <div>{`Tickets`}</div>
              <div>
                <ButtonCounter
                  className={'bg-gray-principal hover:bg-white focus:bg-white dark:bg-dark-400 dark:hover:bg-dark-600 dark:focus:bg-dark-600'}
                  backgroundColor={'bg-gray-principal dark:bg-dark-400'}
                  value={0}
                  threshold={10}
                  inc={() => {}}
                  dec={() => {}}
                  setMin={() => {}}
                  max={20}
                  isMax={false} />
              </div>
            </div>

            <Button onClick={() => {}}
              className={'mt-8 cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
              backgroundColor={'bg-gray-principal dark:bg-dark-400'}>
              <span className={'text-lg'}>Buy Tickets</span>
            </Button>
          </div>
				</div>

        <div className={'mt-24 flex flex-col items-center'}>
          <h2 className={'mb-8 text-xl'}>No more candies?!</h2>
          <p className={'text-sm'}>
            The raffle committee has a special offer for you: <span className={'text-red-600'}>Blood Sacrifice!</span>&nbsp;
            Stake your summoner during the raffle for tickets.&nbsp;
            If you win, one of your summoner friends gets a rare prize.&nbsp;
            Unfortunately, you'll be visiting the City of Judgement.. forever!
          </p>

          <Button onClick={() => {}}
            className={'mt-8 cursor-pointer hover:bg-white focus:bg-white dark:hover:bg-dark-600 dark:focus:bg-dark-600 bg-gray-principal dark:bg-dark-400 text-center'}
            backgroundColor={'bg-gray-principal dark:bg-dark-400'}>
            <div className={'text-lg'}>
              {'💀 Stake your soul for N tickets 💀'}
            </div>
          </Button>
        </div>
			</div>
		</section>
	);
}

export default Index;
