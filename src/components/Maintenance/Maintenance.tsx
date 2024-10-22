import React from 'react';
import styled, { keyframes } from 'styled-components';

const MaintenancePage: React.FC = () => {
  return (
    <MaintenanceContainer>
      <MaintenanceContent>
        <Title>Nâng cấp Game Racetrack</Title>
        <Description>
          Chúng tôi đang nâng cấp hệ thống để mang đến trải nghiệm game tuyệt vời hơn cho bạn.
        </Description>
        <ProgressBar>
          <Progress />
        </ProgressBar>
        <Description>
          Trong thời gian chờ đợi, hãy theo dõi chúng tôi trên <strong>discord</strong> để cập nhật thông tin mới nhất:
        </Description>
        <SocialLinks>
          <SocialLink href="https://discord.gg/QvAdZjdr" target="_blank" rel="noopener noreferrer">
           Discord 
          </SocialLink>
        </SocialLinks>
      </MaintenanceContent>
    </MaintenanceContainer>
  );
};

// Styled Components
const MaintenanceContainer = styled.div`
  font-family: 'Arial', sans-serif;
  background-color: #1a1a2e;
  color: #ffffff;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  //background-image: url('https://example.com/path-to-your-game-background.jpg');
  background-size: cover;
  background-position: center;
`;

const MaintenanceContent = styled.div`
  background-color: rgba(16, 16, 32, 0.8);
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  max-width: 600px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  font-size: 36px;
  color: #ffd700;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  background-color: #2a2a4a;
  height: 30px;
  border-radius: 15px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const progressAnimation = keyframes`
  0% { width: 0%; }
  50% { width: 75%; }
  100% { width: 75%; }
`;

const Progress = styled.div`
  width: 75%;
  height: 100%;
  background-color: #4a4ae3;
  animation: ${progressAnimation} 2s ease-in-out infinite;
`;

const SocialLinks = styled.div`
  margin-top: 20px;
`;

const SocialLink = styled.a`
  color: #ffd700;
  text-decoration: none;
  margin: 0 10px;
  font-size: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

export default MaintenancePage;