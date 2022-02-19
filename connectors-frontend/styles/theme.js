import { extendTheme } from '@chakra-ui/react'

const colors = {
  warning: '#EB5757',
  pink: '#E8368F',
  teal: '#108289',
  brown1: '#9D482D',
  brown2: '#65482D',
  fluorescent: '#00FF94',
  white: '#ffffff',
  primary: '#67A2FF',
  primaryHover: '#5193FB',
  primaryActive: '#3D84F5',
  gray: {
    96: '#F4F3F9',
    79: '#C9C9CC',
    58: '#949496',
    50: '#7E7E83',
    36: '#5A5A5C',
    28: '#45474C',
    24: '#3A3B41',
    22: '#35363A',
    18: '#2C2D30',
    12: '#1D1E20'
  }
}

export const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        bg: 'white',
        color: 'gray.79'
      }
    }
  },
  colors,
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
  },
  // sizes: {
  //   container: {
  //     lg: 'calc(930px + 2rem)',
  //     xl: 'calc(1300px + 2rem)'
  //   }
  // },
})
