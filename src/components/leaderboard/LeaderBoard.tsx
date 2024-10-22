import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Container,
  LeaderboardContainer,
  PodiumPlace,
  Title,
  PodiumContainer,
  PlayerInfo,
  PlayerName,
  PlayerTime,
  PlayerPoints,
  LeaderboardScrollContainer,
  LeaderboardItem,
  LeaderboardList,
  Rank,
  Avatar,
  PageContainer,
} from "./LeaderBoard.styled";
import axios from "axios";
import { PixelUniverse } from "../../pages/Login/LoginPage";
import UserRankComponent from "./api/UserRank.get";
import { jwtDecode } from "jwt-decode";
import { JwtPayload, LeaderboardEntry } from "../../types";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { BackButton } from "../../Styled/CustomStyled";
import { useTranslation } from "react-i18next";

const VT323Container = styled.div`
  font-family: "VT323", monospace;
`;

const colors = [
  "rgba(255, 215, 0, 0.3)",
  "rgba(192, 192, 192, 0.3)",
  "rgba(205, 127, 50, 0.3)",
  "rgba(76, 175, 80, 0.3)",
  "rgba(33, 150, 243, 0.3)",
];
const emojis = ["🥇", "🥈", "🥉", "🎖️", "🏅"];



const Leaderboard: React.FC = () => {
  const navigate = useNavigate(); // Khởi tạo navigate
  const [leaderboardData, setLeaderboardData] = useState<
    LeaderboardEntry[] | null
  >(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const token = localStorage.getItem("token");
  const { t } = useTranslation();

  useEffect(() => {
    async function getUserInfo() {
      try {
        if (token) {
          const decoded = jwtDecode<JwtPayload>(token); // Giải mã token
          const resp = await axios.get(
            `${import.meta.env.VITE_WE_API_OPENEDU_URL}/${decoded.sub}` // Gọi API để lấy thông tin người dng
          );
          if (resp.status !== 200) {
            throw new Error("Token không hợp lệ");
          }
          const json = await resp.data;
          setCurrentUserId(json.data.id); // Cập nhật userId cho game
        } else {
          throw new Error("Không có token");
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUserInfo();
  }, [token]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const blockchainCourseId = import.meta.env.VITE_BLOCKCHAIN_COURSE_ID;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WE_API_URL}/leaderboard/${blockchainCourseId}`
        );
        setLeaderboardData(response.data.metadata as LeaderboardEntry[]);
      } catch (error) {
        setLeaderboardData(null);
        console.error("Lỗi khi lấy dữ liệu bảng xếp hạng", error);
      }
    };
    fetchLeaderboardData();
  }, [currentUserId]);

  return (
    <VT323Container>
      <PageContainer>
        <PixelUniverse />
        <LeaderboardContainer>
          {!leaderboardData ? (
            <Title>{t("no-leaderboard")}</Title>
          ) : (
            <Title>{t("leaderboard-title")}</Title>
          )}
          <BackButton onClick={() => navigate("/")}>{t("back")}</BackButton>
          <Container>
            <PodiumContainer>
              {leaderboardData && leaderboardData.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "flex-end",
                  }}
                >
                  {leaderboardData.slice(0, 5).map((entry, index) => (
                    <PodiumPlace
                      key={entry.user.username}
                      place={index + 1}
                      style={{
                        flex: index === 0 ? "2 1 20%" : "1 1 20%",
                        margin: "10px",
                        order:
                          index === 0
                            ? 2
                            : index === 1
                              ? 1
                              : index === 2
                                ? 3
                                : index === 3
                                  ? 0
                                  : 4,
                      }}
                    >
                      <div className="podium">
                        <img
                          src={`https://robohash.org/${entry.user.username}`}
                          alt={entry.user.username}
                        />
                      </div>
                      <div className="place">🏆{index + 1}</div>
                      <PlayerInfo>
                        <PlayerName>{entry.user.username}</PlayerName>
                      </PlayerInfo>
                    </PodiumPlace>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </PodiumContainer>
            <LeaderboardScrollContainer>
              <LeaderboardList>
                {leaderboardData &&
                  leaderboardData.length > 0 &&
                  leaderboardData.map((entry, index) => (
                    <LeaderboardItem
                      key={entry.user.username}
                      rank={entry.rank}
                      style={{
                        fontFamily:
                          entry.rank <= 5 ? '"VT323", monospace' : "inherit",
                        backgroundColor:
                          entry.rank <= 5 ? colors[index] : "inherit",
                      }}
                    >
                      <Rank>
                        {entry.rank} {entry.rank <= 5 ? emojis[index] : ""}
                      </Rank>
                      <Avatar
                        src={`https://robohash.org/${entry.user.username}`}
                        alt={entry.user.username}
                      />
                      <PlayerInfo>
                        <PlayerName>{entry.user.username}</PlayerName>
                      </PlayerInfo>
                      <PlayerPoints>{entry.totalScore} điểm</PlayerPoints>
                      <PlayerTime>{entry.timeScore} giây</PlayerTime>
                    </LeaderboardItem>
                  ))}
              </LeaderboardList>
            </LeaderboardScrollContainer>
          </Container>
          {currentUserId && leaderboardData && (
            <UserRankComponent userId={currentUserId} />
          )}
        </LeaderboardContainer>
      </PageContainer>
    </VT323Container>
  );
};

export default Leaderboard;
