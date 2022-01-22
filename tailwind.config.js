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
			rune: ['Runes', ...defaultTheme.fontFamily.mono],
			nordic: ['Nordic', ...defaultTheme.fontFamily.mono],
		},
		colors: {
			transparent: 'transparent',
			white: colors.white,
			black: colors.black,
			red: '#EF4444',
			gray: {
				100: '#7F8DA9',
				200: '#CED5E3'
			},
			difficulty: {
				easy: '#a3e635',
				medium: '#f3d942',
				hard: '#f44336',
				extreme: '#f44336'
			},
			dark: {
				'background': '#09162E',
				'primary': '#eab308',
				'primary-lighter': '#09162E',
				'primary-darker': '#FBBF24',
				900: '#09162E',
				600: 'rgb(19,38,75)',
				400: 'rgb(24,48,95)',
				300: '#2f446f',
				200: '#46597e',
				100: '#5d6e8f'
			},
			light: {
				'background': '#F4F7FB',
				'primary': '#167df0',
				'primary-lighter': '#E0EAFF',
				'primary-darker': '#004ADF',
				600: '#F4F7FB',
				400: '#E0EAFF',
				300: '#dcdcde',
				200: '#b4b4c3',
				0: '#FFFFFF'
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
				'base': ['0.95rem', '24px'],
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
				18: '4.5rem',
				57: '14.25rem',
				75: '18.75rem',
				77: '19.25rem',
				screen: '100vw',
				'adventure-card': '272px'
			},
			height: {
				15: '60px',
				18: '4.5rem',
				'adventure-card': '307px'
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
				'min-height': 'min-height',
				'max-height': 'max-height',
				'height': 'height',
			},
			animation: {
				'bounce-r': 'bounce-r 1s infinite',
			},
			keyframes: {
				'bounce-r': {
					'0%,to': {
						transform: 'none',
						'animation-timing-function': 'cubic-bezier(0,0,.2,1)'
					},
					'50%': {
						transform: 'translateX(-25%)',
						'animation-timing-function': 'cubic-bezier(.8,0,1,1)'
					}
				},
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