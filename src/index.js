import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css"
import { AkubadauraApp } from './AkubadauraApp';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { esES } from '@material-ui/x-grid';

require('dotenv').config()



const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#003D14",
      fontSize: '0.7rem'

    },
    secondary: {
      main: "#A7D79F",
      fontSize: '0.7rem'

    }
  },
  typography: {
    fontFamily: 'Reem Kufi',
    fontSize: '0.7rem',
    // fontSize: 12
    // fontWeightMedium: 600
  },
  MuiTabs: {
    indicator: {
      backgroundColor: '#003D14'
    }
  },
  overrides: {
    '.MuiTab-root': {
      fontWeight: 400,
    },
    'MuiFab-label': {
      fontSize: '0.7rem'
      // fontSize: 13
    }
  }
}, esES);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AkubadauraApp />
  </ThemeProvider>,
  document.getElementById('root')
);
