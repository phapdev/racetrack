import styled, { keyframes } from "styled-components";

// Cập nhật PageContainer
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FlexButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const WhiteContainer = styled.div`
  background-color: rgb(60, 179, 113);
  width: 100%;
  min-width: 800px;
  padding: 30px;
  margin: 20px auto;
  box-sizing: border-box;
  border-radius: 25px;

  @media (max-width: 800px) {
    max-width: 100%;
    padding: 20px;
  }
  @media (max-width: 450px) {
    display: none;
}
`;

export const ErrorDialog = styled.div`
  background-color: #ffffff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

// Tạo animation cho các ngôi sao
const twinkle = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

interface PixelStarProps {
  size?: string;
  duration?: string;
}

export const PixelStar = styled.div<PixelStarProps>`
  position: absolute;
  width: ${(props) => props.size || "2px"};
  height: ${(props) => props.size || "2px"};
  background-color: #fff;
  box-shadow: 0 0 ${(props) => props.size || "2px"} #fff;
  animation: ${twinkle} ${(props) => props.duration || "3s"} infinite;
`;

export const moveRandom = (x: number, y: number) => keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(${x}vw, ${y}vh);
  }
  50% {
    transform: translate(${x * 2}vw, ${y * 2}vh);
  }
  75% {
    transform: translate(${x}vw, ${y}vh);
  }
`;

export interface CometProps {
  xOffset: number;
  yOffset: number;
  duration: string;
}

export const Comet = styled.div<CometProps>`
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: #fff;
  box-shadow: 0 0 20px 2px #fff;
  opacity: 1;
  animation: ${(props) => moveRandom(props.xOffset, props.yOffset)}
    ${(props) => props.duration} linear infinite;
`;

export const Spaceship = styled.div<CometProps>`
  position: absolute;
  width: 20px;
  height: 10px;
  background-color: #888;
  clip-path: polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%);
  animation: ${(props) => moveRandom(props.xOffset, props.yOffset)}
    ${(props) => props.duration} linear infinite;
`;

export interface Star {
  left: string;
  top: string;
  size: string;
  duration: string;
}

export interface CelestialObject {
  left: string;
  top: string;
  xOffset: number;
  yOffset: number;
  duration: string;
}

export const FullScreenPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  font-size: 24px;
  text-align: center;
  padding: 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 10px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 5px;
  }
`;

export const LoginContainer = styled.div`
  max-width: 90%;
  width: 100%;
  margin: 50px auto;
  padding: 20px;

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

export const PlayContainer = styled.div`
  max-width: 90%;
  width: 100%;
  margin: 50px auto;
  padding: 20px;

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

export const WelcomeText = styled.p`
  font-family: "VT323", monospace;
  font-size: 60px;
  margin-bottom: 30px;
  color: white;
  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

export const PlayButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 32px;

  @media (min-width: 768px) {
    width: auto;
    padding: 10px 20px;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 32px;

  @media (min-width: 768px) {
    width: auto;
    padding: 10px 20px;
  }
`;

export const slideAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

export const TrailerContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 50vh;
  margin-top: calc(50vh / 10);
  border-radius: 25px;
`;

export const TrailerContent = styled.div`
  display: flex;
  animation: ${slideAnimation} 20s linear infinite;
  height: 100%;
`;

export const TrailerItem = styled.div`
  flex-shrink: 0;
  width: 50vh;
  height: 100%;
  margin-right: calc(50vh / 5);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 25px;
`;