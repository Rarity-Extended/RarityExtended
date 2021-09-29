/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Wednesday September 29th 2021
**	@Filename:				Runes.js
******************************************************************************/

import	React	from	'react';

import	FragmentR					from	'components/Letters/FragmentR';
import	FragmentA					from	'components/Letters/FragmentA';
import	FragmentI					from	'components/Letters/FragmentI';
import	FragmentT					from	'components/Letters/FragmentT';
import	FragmentY					from	'components/Letters/FragmentY';
import	FragmentX					from	'components/Letters/FragmentX';
import	FragmentE					from	'components/Letters/FragmentE';
import	FragmentD					from	'components/Letters/FragmentD';

function	Runes() {
	return (
		<>
			<div className={'w-full h-1 mb-2.5 bg-black'} />
			<div className={'relative h-9 flex w-full justify-between'}>
				<FragmentR />
				<FragmentA />
				<FragmentR />
				<div />
				<FragmentI />
				<FragmentT />
				<FragmentI />
				<div className={'w-0.5'} />
				<FragmentY />
				<FragmentX />
				<FragmentT />
				<FragmentY />
				<FragmentE />
				<FragmentD />
			</div>
			<div className={'w-full h-1 mt-2.5 bg-black'} />
		</>
	);
}

export default Runes;