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
				lighter: '#fafafa'
			},
			difficulty: {
				easy: '#a3e635',
				medium: '#f3d942',
				hard: '#f44336',
				extreme: '#f44336'
			},
			tag: {
				new: '#059669',
				info: '#167df0',
				infoDarker: '#0e71de',
				warning: '#FBBF24',
				warningDarker: '#FACC15',
				withdraw: '#EF4444'
			},
			white: colors.white,
			dark: {
				900: '#09162E', //VERY DARK
				600: 'rgb(19,38,75)',
				400: 'rgb(24,48,95)',
				300: '#2f446f',
				200: '#46597e',
				100: '#5d6e8f', //VERY LIGHT
				50: '#c9c9d4'
			},
			light: {
				900: '#FFFFFF', //VERY LIGHT
				600: '#e7e7ec',
				400: '#f5f5f7',
				300: '#dcdcde',
				200: '#b4b4c3',
				50: '#696984',
				0: '#000000' //VERY DARK
			},
			items: {
				common: '#5d6e8f',
				uncommon: 'rgb(73,122,42)',
				rare: 'rgb(42,94,161)',
				epic: 'rgb(138,47,146)',
				legendary: 'rgb(192,109,44)',
				relic: 'rgb(133,33,24)',
			},
			blood: {
				50: '#ff9696',
				100: '#ff7878',
				200: '#ff5a5a',
				300: '#f13c3c',
				400: '#d31e1e',
				500: '#b50000',
				600: '#970000',
				700: '#790000',
				800: '#5b0000',
				900: '#3d0000'
			},
			fire: {
				50: '#ffffff',
				100: '#ffffdb',
				200: '#ffec7f',
				300: '#ffb043',
				400: '#df7407',
				500: '#c15600',
				600: '#851a00',
				700: '#670000',
				800: '#490000',
				900: '#2b0000'
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