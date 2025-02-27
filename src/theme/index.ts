import { DefaultTheme } from 'styled-components'

export type Theme = {
  theme: DefaultTheme
}

const theme: DefaultTheme = {
  primaryFont: 'Mulish, Inter, sans-serif',
  borderRadiusFit: '0.5rem',
  borderRadiusExtraSmall: '1rem',
  borderRadiusSmall: '1.2rem',
  borderRadius: '1.2rem',
  baseFontSize: '1.4rem',
  baseLineHeight: '2rem',
  boxShadow: '0 2px 4px rgba(114, 129, 167, 0.08)',
  boxShadowElevated: '0 1px 2px rgba(114, 129, 167, 0.16)',
  boxShadowXl: '0 19px 38px rgba(0,0,0,0.02), 0 15px 12px rgba(0,0,0,0.04)',

  colours: {
    backgroundLight: '#FBFBFC',
    background: '#F7F6F4',
    primaryBg: '#F2F4F8',
    primary: '#003171',
    primaryDarker: '#05172e',
    primaryDark: '#00255a',
    primaryMediumDark: '#335A8D',
    primaryMedium: '#6683AA',
    primaryLight: '#B3C2D5',
    primaryLighter: '#E6EBF1',
    error: '#da2f58',
    errorLight: '#FDF8F9',
    success: '#2FB182',
    successLight: '#EBF8F3',
    info: '#2EAABA',
    infoDark: '#335A8D',
    infoLight: '#92F3EF',
    warningDark: '#CC8B00',
    warning: '#F2AA0D',
    warningLight: '#FFE7B3',
    warningLighter: '#FFF8EB;',
    activeSelection: '#FCFCFD',
    black: '#121212',
    white: 'white',
    bright: '#005DD6',
    greyBorder: '#F2F4F8',
    greyLightest: '#F8F9FB',
    greyLighter: '#e7e8eb',
    greyLight: '#c7c9cc',
    greyLightBorder: '#F2F3F4',
    grey: '#828A96',
    greyDark: '#585F67',
    greyMedium: '#374558',
    greyDarker: '#17202C',
    greyShadow: 'rgba(114, 129, 167, 0.08)',
    blue: '#7F97B7',
  },

  table: {
    columnPadding: '2.5rem',
  },

  breakpoints: {
    mobile: '0px',
    mobileXl: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopXl: '1440px',
    desktop: '2560px',
  },
}

export default theme
