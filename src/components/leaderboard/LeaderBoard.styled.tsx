import styled from "styled-components";

export const LeaderboardContainer = styled.div`
  width: calc(100vw - 50px); /* Giảm khoảng cách để tăng không gian */
  height: calc(100vh - 50px); /* Giảm khoảng cách để tăng không gian */
  padding: 25px; /* Thêm padding để tạo khoảng cách */
  background-color: #1a1a1a; /* Màu nền tối hơn */
  border-radius: 15px; /* Bo góc cho container */
`;

export const PodiumContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  margin-right: 30px; /* Khoảng cách giữa podium và leaderboard */
  align-items: center;
  justify-content: center;
  background-color: #2a2a2a; /* Màu nền tối hơn cho podium */
  border-radius: 10px; /* Bo góc cho podium container */
  padding: 20px; /* Thêm padding */
`;

export const PodiumPlace = styled.div<{ place: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
  position: relative; /* Thêm để cho phép đặt khối hình chữ nhật phía sau */

  transition: transform 0.3s; /* Hiệu ứng động cho podium */

  &:hover {
    transform: scale(1.1); /* Phóng to khi hover */
  }

  .place {
    font-size: 2.5rem; /* Tăng kích thước font */
    font-weight: bold;
    color: white;
    margin-top: 10px;
  }

  .podium {
    width: ${props => (props.place === 1 ? '150px' : props.place === 2 ? '130px' : '110px')}; 
    height: ${props => (props.place === 1 ? '150px' : props.place === 2 ? '130px' : '110px')};
    background-color: ${props =>
      props.place === 1 ? '#FFD700' :
      props.place === 2 ? '#C0C0C0' :
      '#CD7F32'};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    
    img {
      width: 90%;
      height: 90%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  /* Thêm khối hình chữ nhật phía sau làm background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #bce3db; /* Màu xanh cho khối hình chữ nhật */
    z-index: -1; /* Đảm bảo khối hình chữ nhật nằm phía sau */
    transform: scale(1.1); /* Phóng to khối hình chữ nhật */
    border-radius: 20px; /* Bo góc cho khối hình chữ nhật */
    opacity: 0.6; /* Độ mờ cho khối hình chữ nhật */
  }
`;

export const LeaderboardScrollContainer = styled.div`
  flex-grow: 1;
  max-height: calc(100vh - 200px);
  overflow-y: scroll; // Cho phép cuộn

  height: 60vh; /* Giữ chiều cao cố định */

  &::-webkit-scrollbar {
    display: none; // Ẩn thanh cuộn
  }
`;

export const LeaderboardItem = styled.li<{ rank: number }>`
  display: flex;
  align-items: center;
  background-color: ${props =>
    props.rank === 1 ? 'rgba(255, 215, 0, 0.2)' :
    props.rank === 2 ? 'rgba(192, 192, 192, 0.2)' :
    props.rank === 3 ? 'rgba(205, 127, 50, 0.2)' :
    'rgba(255, 255, 255, 0.1)'};
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 0 20px gold;
  }

  ${props => props.rank <= 5 && `
    background-color: rgba(255, 215, 0, 0.5); /* Màu nền cho top 5 */
    border: 2px solid gold; /* Viền cho top 5 */
  `}
`;

export const Title = styled.h1`
  color: white;
  text-align: center;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px; /* Thêm khoảng cách dưới */
`;

export const PlayerInfo = styled.div`
  flex-grow: 1;
`;

export const PlayerName = styled.span`
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const PlayerPoints = styled.span`
  color: #FFD700;
  font-weight: bold;
  margin-right: 15px;
`;

export const PlayerTime = styled.span`
  color: #A0A0A0;
`;

export const Rank = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  margin-right: 15px;
  text-align: center;
  align-self: center;
`;

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

export const LeaderboardList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh; /* Đặt chiều cao cố định */
  overflow: hidden; /* Ngăn cuộn */
  position: relative;
  z-index: 1;
  background-color: black;
  width: 100vw;
  padding: 20px; /* Thêm padding */
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10vh; /* Đặt khoảng cách trên là 10% chiều cao màn hình */
  padding: 0 20px; /* Thêm padding ngang */
`;