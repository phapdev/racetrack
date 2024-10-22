import styled from "styled-components";

export const NotFoundContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  background: black;
  display: flex;
  height: 100%;
  justify-content: center; 
  align-items: center;
  font-family: 'Press Start 2P', cursive;

html, body {  
   width: 100%;
   height: 100%;
   margin: 0;
}
* {
   font-family: 'Press Start 2P', cursive;
   box-sizing: border-box;
}

@keyframes blink {
    0%   {opacity: 0}
    49%  {opacity: 0}
    50%  {opacity: 1}
    100% {opacity: 1}
}

.blink {
   animation-name: blink;
   animation-duration: 1s;
   animation-iteration-count: infinite;
}
`;

export const Content = styled.div`
  padding: 1rem;
  background: black;
   display: flex;
   justify-content: center; 
   align-items: center;
   color: #54FE55;
   text-shadow: 0px 0px 10px #54FE55;
   font-size: 6rem;
   flex-direction: column;
   .txt {
      font-size: 1.8rem;
   }
`;