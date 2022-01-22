/******************************************************************************
**	@Author:				Rarity Extended
**	@Twitter:				@RXtended
**	@Date:					Tuesday August 31st 2021
**	@Filename:				_document.js
******************************************************************************/

import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {mediaStyles} from 'contexts/useUI';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return {...initialProps};
	}

	render() {
		return (
			<Html lang={'en'} className={'bg-white dark:bg-dark-600'}>
				<Head>
					<style type={'text/css'} dangerouslySetInnerHTML={{__html: mediaStyles}} />
					<link rel={'preconnect'} href={'https://fonts.googleapis.com'} />
					<link rel={'preconnect'} href={'https://fonts.gstatic.com'} crossOrigin={'true'} />
					<link href={'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'} rel={'stylesheet'} />
					<link href={'https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@400;500;600;700&display=swap'} rel={'stylesheet'} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
