const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	purge: [
		'./pages/**/*.js',
		'./components/**/*.js',
		'./sections/**/*.js',
		'./utils/**/*.js'
	],
	darkMode: 'class',
	corePlugins: {
		ringColor: false,
	},
	theme: {
		fontFamily: {
			title: ['"Press Start 2P"', 'monospace'],
			mono: ['IBM Plex Mono', 'monospace'],
			story: ['Noto Sans Mono', 'monospace'],
			sans: ['Roboto', ...defaultTheme.fontFamily.sans],
		},
		colors: {
			black: '#000000',
			blackLight: '#828282',
			darkWhite: '#F2F2F2',
			gray: {
				principal: '#F2F2F2',
				secondary: '#E0E0E0',
				darker: '#828282',
			},
			tag: {
				new: '#059669',
				info: '#167df0',
				warning: '#FBBF24',
				warningDarker: '#F59E0B',
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
			items: {
				common: '#5d6e8f',
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
				'regular': ['10px', '16px'],
				'megaxs': '0.5rem',
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
				'23': '5.75rem',
			},
			width: {
				57: '14.25rem',
				75: '18.75rem',
				77: '19.25rem',
				screen: '100vw'
			},
			height: {
				15: '60px'
			},
			minHeight: {
				120: '480px',
				133: '33.25rem'
			},
			maxHeight: {
				120: '480px',
				133: '33.25rem'
			},
			transitionProperty: {
				'visibility': 'visibility',
				'width': 'width',
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
			width: ['hover', 'focus', 'group-hover'],
			transform: ['hover', 'focus', 'group-hover'],
			animation: ['hover', 'focus', 'group-hover'],
			visibility: ['hover', 'focus', 'group-hover'],
			backgroundColor: ['hover'],
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio')
	],
};