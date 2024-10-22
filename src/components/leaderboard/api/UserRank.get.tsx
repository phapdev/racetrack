import { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  LeaderboardItem,
  PlayerInfo,
  Rank,
  PlayerName,
  PlayerPoints,
  PlayerTime,
} from "../LeaderBoard.styled";
import { UserRankData } from "../../../types";

interface UserInfoData {
  username: string;
}

const UserRankComponent = ({ userId }: { userId: string }) => {
  const [userRank, setUserRank] = useState<UserRankData | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);
  const token = localStorage.getItem("token");
  const colors = [
    "rgba(255, 215, 0, 0.3)",
    "rgba(192, 192, 192, 0.3)",
    "rgba(205, 127, 50, 0.3)",
    "rgba(76, 175, 80, 0.3)",
    "rgba(33, 150, 243, 0.3)",
  ];
  const emojis = ["🥇", "🥈", "🥉", "🎖️", "🏅"];
  useEffect(() => {
    const fetchUserRank = async () => {
      try {
        const blockchainCourseId = import.meta.env.VITE_BLOCKCHAIN_COURSE_ID;
        const response = await axios.get(
          `${import.meta.env.VITE_WE_API_URL}/leaderboard/${blockchainCourseId}/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-token": `${token}`,
            },
          }
        );
        const data = response.data.metadata;
        setUserRank(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserRank();
  }, [userId]);
  // call api getuserinfo "http://localhost:3000/users/get-user?userId=${userId}"
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_WE_API_URL}/users/get-user?userId=${userId}`,
        {
          headers: {
            "x-token": `${token}`,
          },
        }
      );
      const data = response.data.metadata;
      setUserInfo(data);
    };
    fetchUserInfo();
  }, [userId]);

  if (userRank === null) {
    return (
      <LeaderboardItem rank={0} style={{ border: "1px solid white" }}>
        <Rank>...</Rank>
        {/* <Avatar src="" alt="..." /> */}
        <PlayerInfo>
          <PlayerName>{userInfo?.username || userId}</PlayerName>
        </PlayerInfo>
        <PlayerPoints>...</PlayerPoints>
        <PlayerTime>...</PlayerTime>
      </LeaderboardItem>
    );
  }
  return (
    <LeaderboardItem
      key={userRank.user.username}
      rank={userRank.rank}
      style={{
        border: "1px solid white",
        backgroundColor: colors[userRank.rank - 1],
      }}
    >
      <Rank>
        {userRank.rank} {userRank.rank <= 5 ? emojis[userRank.rank - 1] : ""}
      </Rank>
      <Avatar
        src={`https://robohash.org/${userRank.user.username}`}
        alt={userRank.user.username}
      />
      <PlayerInfo>
        <PlayerName>{userRank.user.username}</PlayerName>
      </PlayerInfo>
      <PlayerPoints>{userRank.totalScore} điểm</PlayerPoints>
      <PlayerTime>{userRank.timeScore} giây</PlayerTime>
    </LeaderboardItem>
  );
};

export default UserRankComponent;
