const colors = require('tailwindcss/colors');

module.exports = {
	purge: [
		'./pages/**/*.js',
		'./components/**/*.js'
	],
	darkMode: false,
	corePlugins: {
		ringColor: false,
	},
	theme: {
		fontFamily: {
			title: ['"Press Start 2P"', 'monospace'],
			mono: ['IBM Plex Mono', 'monospace']
		},
		colors: {
			gray: colors.coolGray,
			black: '#000000',
			tag: {
				new: '#10B981',
				info: '#167df0',
				warning: '#fff257',
				withdraw: '#EF4444'
			},
			red: colors.red,
			white: colors.white,
			sky: colors.sky,
			error: '#FF005E',
			pending: '#FFB800',
			success: '#A5DF00',
			ygray: {
				50: '#F5F5F5',
				100: '#E1E1E1',
				200: '#DBDBDB',
				400: '#7A7A7A',
				600: '#767676',
				700: '#2c3e50',
				900: '#363636',
			}
		},
		extend: {
			lineHeight: {
				11: '3.25rem',
				'120px': '120px'
			},
			fontSize: {
				'xxs': '0.6rem',
				'3xl': '2rem',
				'7xl': '5rem',
				'sm': '0.8rem',
			}
		},
	},
	variants: {
		extend: {
			animation: ['hover', 'focus'],
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms')
	],
};