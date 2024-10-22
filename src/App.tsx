import { jwtDecode } from "jwt-decode";
import UnityGame from "./components/Game/UnityGame";
import { useState, useEffect } from "react";
import TutorialModal from "./modal/TutorialModal";
import Header from "./components/Header/Header";
import { JwtPayload } from "./types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useMaintenanceMode from "./hook/useMaintenanceMode";
import Maintenance from "./components/Maintenance/Maintenance";
import DailyTask from "./components/DailyTask/Dailytask";

const ErrorDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

function App() {
  const navigate = useNavigate();
  const [isTutorialOpen, setIsTutorialOpen] = useState(() => {
    return localStorage.getItem("tutorialShown") !== "true";
  });
  // const [showHeader, setShowHeader] = useState(true);
  const [showError, setShowError] = useState(false);
  const [isDailyTaskOpen, setIsDailyTaskOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function getUserInfo() {
      try {
        if (token) {
          const decoded = jwtDecode<JwtPayload>(token);
          const resp = await fetch(
            `${import.meta.env.VITE_WE_API_OPENEDU_URL}/${decoded.sub}`
          );
          if (!resp.ok) {
            throw new Error("Token không hợp lệ");
          }
          const json = await resp.json();
          setUserName(json.data?.id);
          setUserEmail(json.data?.email);
        } else {
          throw new Error("Không có token");
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    }
    getUserInfo();
  }, [token, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTutorialOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   const handleMouseMove = (event: MouseEvent) => {
  //     if (!isTutorialOpen) {
  //       const windowHeight = window.innerHeight;
  //       const threshold = windowHeight * 0.1; // 10% của chiều cao màn hình
  //       if (event.clientY <= threshold) {
  //         setShowHeader(true);
  //       } else {
  //         setShowHeader(false);
  //       }
  //     }
  //   };

  //   document.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     document.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, [isTutorialOpen]);

  // useEffect(() => {
  //   if (isTutorialOpen) {
  //     setShowHeader(true);
  //   }
  // }, [isTutorialOpen]);

  const handleCloseTutorial = () => {
    setIsTutorialOpen(false);
    localStorage.setItem("tutorialShown", "true");
  };

  const handleCloseDailyTask = () => {
    setIsDailyTaskOpen(false);
  };

  const isInMaintenance = useMaintenanceMode();
  if (isInMaintenance) {
    return <Maintenance />;
  } else {
    return (
      <div style={{ position: "relative" }}>
        {/* {(showHeader || isTutorialOpen) && ( */}
        <Header
          onOpenTutorial={() => setIsTutorialOpen(true)}
          onOpenDailyTask={() => setIsDailyTaskOpen(true)}
          userName={userName}
          userEmail={userEmail}
        />
        {/* )} */}
        <UnityGame />
        <TutorialModal isOpen={isTutorialOpen} onClose={handleCloseTutorial} />
        <DailyTask isOpen={isDailyTaskOpen} onClose={handleCloseDailyTask} />
        {showError && (
          <ErrorDialog>
            <div className="nes-dialog is-rounded">
              <form method="dialog">
                <p className="title">Lỗi đăng nhập</p>
                <p>Không thể đăng nhập. Vui lòng thử lại.</p>
                <menu className="dialog-menu">
                  <button
                    className="nes-btn is-primary"
                    onClick={() => setShowError(false)}
                  >
                    Đóng
                  </button>
                </menu>
              </form>
            </div>
          </ErrorDialog>
        )}
      </div>
    );
  }
}

export default App;
