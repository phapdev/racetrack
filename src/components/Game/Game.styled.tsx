import styled from "styled-components";
import bg from "../../assets/Background.png";

const aspectRatio = 9 / 16;

export const UnityContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${bg});
  background-size: cover;
  background-position: bottom;

  scrollbar-width: none !important;
  scrollbar-color: transparent !important;
  scrollbar-hide: always !important;
  overflow: hidden;
  // không cho phép người dng dng con lăn chuột phóng to nhỏ
  user-select: none;
  // không cho phép người dng chọn vào nội dung
  -webkit-user-select: none;
  // chặn con lăn chuột
  -webkit-user-drag: none;
  // chặn con lăn chuột
  -webkit-app-region: no-drag;

  @media (max-width: 768px) {
  
  }

`

export const UnityContent = styled.div`
  width: 70vw;
  height: calc(70vw * ${aspectRatio});
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem !important;
`
