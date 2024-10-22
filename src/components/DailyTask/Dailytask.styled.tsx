import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: #f0e68c;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  height: 80vh;
  max-height: 600px;
  border: 4px solid #8b4513;
  box-shadow: 0 0 0 4px #f4a460, 0 0 0 8px #8b4513;
  overflow-y: auto;

  /* Tùy chỉnh thanh cuộn */
  &::-webkit-scrollbar {
    width: 5px; /* Độ rộng của thanh cuộn */
  }

  &::-webkit-scrollbar-track {
    background: #d2b48c; /* Màu nền của track */
    border-radius: 10px; /* Bo góc track */
  }

  &::-webkit-scrollbar-thumb {
    background: #8b4513; /* Màu của thanh cuộn */
    border-radius: 10px; /* Bo góc thanh cuộn */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #daa520; /* Màu khi hover */
  }
`;

export const Title = styled.h2`
  color: #8b4513;
  text-align: center;
  font-family: "VT323", monospace;
  font-size: 28px;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-family: "VT323", monospace;
  font-size: 18px;
  color: #8b4513;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  font-family: "VT323", monospace;
  font-size: 16px;
  border: 2px solid #8b4513;
  border-radius: 5px;
  background-color: #fff8dc;
`;

export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "VT323", monospace;
  font-size: 18px;
  margin-right: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const TwitterLink = styled.a`
  color: #1da1f2;
  text-decoration: none;
  font-family: "VT323", monospace;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

export const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  font-family: "VT323", monospace;
  font-size: 16px;
  color: #8b4513;

  /* Tùy chỉnh thanh cuộn */
  &::-webkit-scrollbar {
    width: 5px; /* Độ rộng của thanh cuộn */
  }

  &::-webkit-scrollbar-track {
    background: #d2b48c; /* Màu nền của track */
    border-radius: 10px; /* Bo góc track */
  }

  &::-webkit-scrollbar-thumb {
    background: #8b4513; /* Màu của thanh cuộn */
    border-radius: 10px; /* Bo góc thanh cuộn */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #daa520; /* Màu khi hover */
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff6347;
  border: 2px solid #8b4513;
  width: 30px;
  height: 30px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  line-height: 1;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff4500;
  }
`;

export const SelectButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SelectButton = styled.button<{ isSelected: boolean }>`
  padding: 10px 20px;
  border: 2px solid #8b4513;
  background-color: ${props => props.isSelected ? '#daa520' : '#f4a460'};
  color: #8b4513;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "VT323", monospace;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;

  &:hover {
    background-color: ${props => props.isSelected ? '#b8860b' : '#e6a756'};
  }
`;
