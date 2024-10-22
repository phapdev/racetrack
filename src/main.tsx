import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./config/i18n.ts";
import { GlobalStyle } from "./GlobalStyle.ts";
import { NotFound, LoginPage } from "./pages";
import { LeaderBoard, UnityGame } from "./components";
import "./fonts/fonts.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Provider store={store}>
          <GlobalStyle />
          <Routes>
            <Route index element={<App />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
            <Route path="game" element={<UnityGame />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Provider>
      </AuthProvider>
    </I18nextProvider>
  </BrowserRouter>
);