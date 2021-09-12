const colors = require('tailwindcss/colors');

module.exports = {
	purge: [
		'./pages/**/*.js',
		'./components/**/*.js',
		'./sections/**/*.js'
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
			item: {
				common: 'gray-300',
				uncommon: 'rgb(73,122,42)',
				rare: 'rgb(42,94,161)',
				epic: 'rgb(138,47,146)',
				legendary: 'rgb(192,109,44)',
				relic: 'rgb(133,33,24)',
			}
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
			spacing: {
				'7.5': '1.875rem',
				'8.5': '2.125rem',
			},
			width: {
				screen: '100vw'
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
			rotate: ['hover', 'focus', 'group-hover'],
			animation: ['hover', 'focus', 'group-hover'],
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio')
	],
};