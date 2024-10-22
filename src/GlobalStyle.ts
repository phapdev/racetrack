import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Audiowide&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  html, body {
    margin: 0px;
    overflow: hidden;
  }
  :root {
    font-family: 'Audiowide', sans-serif;
  }
  body {
    font-family: 'VT323', monospace;
    background-color: #000011;
    overflow-x: hidden;
    overflow-y: auto; 
    margin: 0; 
    padding: 0; 
  }
`;