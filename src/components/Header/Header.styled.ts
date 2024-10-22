import styled from 'styled-components';


export const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #0E3B38;
  color: #FFD700;
  padding: 0.2rem 0.2rem;
  border: 2px solid #08A499;
  border-radius: 0 0 25px 25px;
  z-index: 1000;
  text-align: center;
  max-width: calc(100vw / 1.3);
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "VT323", monospace;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);

  transition: all 0.1s;

  &:hover {
    border-color: #FFD700;
  }
`;
export const StyledInput = styled.input`
  padding: 2rem;
  background: transparent;
  border: 1px solid #219890;
  border-radius: 5px;
  transition: border-color 0.3s ease;
  font-size: 1.2rem;
  font-family: "VT323", monospace;
  color: #219890;

  &:focus {
    outline: none;
    padding: 1rem;
    border-color: #FFD700;
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
    font-size: 1.3rem;
  }

  &:hover {
    border-color: #FFD700;
    font-size: 1.3rem;
  }
`;
interface ButtonProps {
  guild?: boolean;
  docs?: boolean;
  link?: boolean;
  leaderboard?: boolean;
  admin?: boolean;
}
export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.guild ? '#4B8B3B' : props.docs ? '#9A9F1F' : props.link ? '#2BB6AD' : props.leaderboard ? '#8B0000' : props.admin ? '#FF0000' : 'transparent'};
  border: ${(props) => props.guild ? '2px solid #38FF35' : props.docs ? '2px solid #EDF517' : props.link ? '2px solid #00FFEE' : props.leaderboard ? '2px solid #FF0000' : props.admin ? '2px solid #FF0000' : 'none'};
  cursor: pointer;
  color: ${(props) => props.guild ? 'white' : props.docs ? 'white' : props.link ? 'white' : props.leaderboard ? 'white' : props.admin ? 'white' : '#F35656'};
  font-size: 1rem;
  margin-left: 0;
    padding: 0.7rem 1rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  transition: all 0.1s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  font-family: "VT323", monospace;

  &:hover {
    background-color: #FFD700;
    color: #0E3B38;
    border-color: #0E3B38;
  }
`;

export const ButtonSave = styled(Button)`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #FFD700;
  font-size: 1rem;
  margin-left: 0;
`;

export const ButtonEdit = styled(Button)`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #FFD700;
  font-size: 1rem;
  margin-left: 0;
`;  