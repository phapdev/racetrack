import React, { useState } from 'react';
import axios from 'axios';

interface LeaderboardEntry {
  _id: string;
  userId: string;
  totalScore: number;
  timeScore: number;
  rank: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  message: string;
  status: number;
  metadata: LeaderboardEntry;
}

const TotalRankComponent = () => {
  const [leaderboardEntry, setLeaderboardEntry] = useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState('');

  const fetchLeaderboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ApiResponse>(`https://dev-battle-server.weminal.com/leaderboard/${userId}`);
      setLeaderboardEntry(response.data.metadata);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      setError('Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeaderboardData();
  };

  return (
    <div>
      <h1>Bảng xếp hạng</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Nhập User ID"
          required
        />
        <button type="submit">Tìm kiếm</button>
      </form>

      {loading && <p>Đang tải...</p>}
      {error && <p>{error}</p>}
      {leaderboardEntry && (
        <table>
          <thead>
            <tr>
              <th>Xếp hạng</th>
              <th>User ID</th>
              <th>Tổng điểm</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{leaderboardEntry.rank}</td>
              <td>{leaderboardEntry.userId}</td>
              <td>{leaderboardEntry.totalScore}</td>
              <td>{leaderboardEntry.timeScore}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TotalRankComponent;