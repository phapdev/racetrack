import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./features/gameSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store: any = configureStore({
  reducer: {
    game: gameReducer,
  },
  // Thêm type cho store
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(/* middleware khác nếu cần */),
});

// Định nghĩa type cho store
export type RootState = ReturnType<typeof store.getState>; // Kết hợp với GameState
export type AppDispatch = typeof store.dispatch;

export default store;