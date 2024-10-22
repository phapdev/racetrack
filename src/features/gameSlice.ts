import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
  userId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataGame: any;
}

const initialState: GameState = {
  userId: "",
  dataGame: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setDataGame(state, action: PayloadAction<any>) {
      state.dataGame = action.payload;
    },
  },
});

export const { setUserId, setDataGame } = gameSlice.actions;
export default gameSlice.reducer;
