import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #f0e68c;
  padding: 20px;
  border-radius: 0;
  width: 800px;
  position: relative;
  border: 4px solid #8b4513;
  box-shadow: 0 0 0 4px #f4a460, 0 0 0 8px #8b4513;
  image-rendering: pixelated;
  height: 495px; /* Giới hạn chiều cao tối đa */
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 4px solid #8b4513;
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px 20px;
  border: none;
  background-color: ${props => props.active ? '#daa520' : '#d2b48c'};
  color: #8b4513;
  cursor: pointer;
  font-family: 'VT323', monospace;
  font-size: 28px;  
  &:not(:last-child) {
    margin-right: 6px;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 20px;
  font-family: 'VT323', monospace;
  font-size: 20px;
  line-height: 1.6;
  color: #8b4513;
  max-height: 80vh; /* Giới hạn chiều cao tối đa */
  overflow-y: auto; /* Thêm thanh cuộn nếu nội dung quá dài */
  
  /* Tùy chỉnh thanh cuộn */
  &::-webkit-scrollbar {
    width: 12px; /* Độ rộng của thanh cuộn */
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
const CloseButton = styled.button`
  position: absolute;
  font-family: 'VT323', monospace;
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
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'howToPlay' | 'scoring' | 'rewards'>('howToPlay');
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2 style={{ fontFamily: "'VT323', monospace", fontSize: '24px', color: '#8b4513' }}>{t('game-guide.title')}</h2>
        <TabContainer>
          <Tab active={activeTab === 'howToPlay'} onClick={() => setActiveTab('howToPlay')}>{t('game-guide.game-info.title')}</Tab>
          <Tab active={activeTab === 'scoring'} onClick={() => setActiveTab('scoring')}>{t('game-guide.scoring-rules.title')}</Tab>
          <Tab active={activeTab === 'rewards'} onClick={() => setActiveTab('rewards')}>{t('game-guide.reward.title')}</Tab>
        </TabContainer>
        <ContentSection style={{ maxHeight: '320px', overflowY: 'auto', fontSize: '30px' }}>
          {activeTab === 'howToPlay' && (
            <div>
              <StyledList>
                <li>- {t('game-guide.game-info.prerequisite')}</li>
                <li>- {t('game-guide.game-info.daily-attempts')}</li>
                <li>- {t('game-guide.game-info.game-structure')}</li>
                <li>- {t('game-guide.game-info.question-attributes')}</li>
                <li>- {t('game-guide.game-info.health-system')}</li>
              </StyledList>
            </div>
          )}

          {activeTab === 'scoring' && (
            <div>
              <h4>{t('game-guide.scoring-rules.question-points.title')}</h4>
              <StyledList>
                <li>- {t('game-guide.scoring-rules.question-points.level1')}</li>
                <li>- {t('game-guide.scoring-rules.question-points.level2')}</li>
                <li>- {t('game-guide.scoring-rules.question-points.level3')}</li>
                <li>- {t('game-guide.scoring-rules.question-points.level4')}</li>
                <li>- {t('game-guide.scoring-rules.question-points.level5')}</li>
                <li>- {t('game-guide.scoring-rules.question-points.level6')}</li>
                <li>- {t('game-guide.scoring-rules.question-points.wrong-answer')}</li>
                <li>- {t('game-guide.scoring-rules.question-points.hero-death')}</li>
              </StyledList>
              <h4>{t('game-guide.scoring-rules.time-bonus.title')}</h4>
              <StyledList>
                <li>- {t('game-guide.scoring-rules.time-bonus.fast')}</li>
                <li>- {t('game-guide.scoring-rules.time-bonus.medium')}</li>
              </StyledList>
              <h4>{t('game-guide.scoring-rules.streak-bonus.title')}</h4>
              <StyledList>
                <li>- {t('game-guide.scoring-rules.streak-bonus.consecutive')}</li>
                <li>- {t('game-guide.scoring-rules.streak-bonus.perfect')}</li>
              </StyledList>
              <h4>{t('game-guide.scoring-rules.attempt-bonus.title')}</h4>
              <StyledList>
                <li>- {t('game-guide.scoring-rules.attempt-bonus.first')}</li>
                <li>- {t('game-guide.scoring-rules.attempt-bonus.second')}</li>
              </StyledList>
              <h4>{t('game-guide.scoring-rules.boss-bonus.title')}</h4>
              <StyledList>
                <li>- {t('game-guide.scoring-rules.boss-bonus.daily')}</li>
              </StyledList>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div>
              <p>{t('game-guide.reward.description')}</p>
              <StyledList>
                { // @ts-expect-error - fix later
                t('game-guide.reward.prizes', { returnObjects: true }).map((prize, index) => (
                  <li key={index}>- {prize.rank}: {prize.amount}</li>
                ))}
              </StyledList>
            </div>
          )}
        </ContentSection>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TutorialModal;
