export interface JwtPayload {
  sub: string;
  name: string;
  session_id: string;
  exp: number;
}

export interface UserData {
  mail: string;
  username: string;
}

export interface LeaderboardEntry {
  totalScore: number;
  timeScore: number;
  user: UserData;
  rank: number;
}

export interface UserRankData {
  user: UserData;
  totalScore: number;
  timeScore: number;
  rank: number;
}
