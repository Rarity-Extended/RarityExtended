const colors = require('tailwindcss/colors');

module.exports = {
	purge: [
		'./pages/**/*.js',
		'./components/**/*.js',
		'./screens/**/*.js'
	],
	darkMode: 'class',
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
			white: colors.white,
			dark: {
				900: '#09162E',
				600: 'rgb(19,38,75)',
				400: 'rgb(24,48,95)',
				300: '#2f446f',
				200: '#46597e',
				100: '#5d6e8f',
			},
		},
		extend: {
			lineHeight: {
				11: '3.25rem',
				'120px': '120px'
			},
			fontSize: {
				'xxs': '0.6rem',
				'xss': '8px',
				'sx': '10px',
				'3xl': '2rem',
				'7xl': '5rem',
				'sm': '0.8rem',
			},
			animation: {
				'bounce-r': 'bounce-r 1s infinite'
			},
			keyframes: {
				'bounce-r': {
					'0%,to': {
						transform: 'translateX(-25%)',
						'animation-timing-function': 'cubic-bezier(.8,0,1,1)'
					},
					'50%': {
						transform: 'none',
						'animation-timing-function': 'cubic-bezier(0,0,.2,1)'
					}
				}
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
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio')
	],
};