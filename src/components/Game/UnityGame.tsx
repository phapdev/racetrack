import React from "react";
import axios from "axios";
import usePopup from "../../hook/usePopup";
import useSocket from "../../hook/useSocket";
import { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { UnityContainer, UnityContent } from "./Game.styled";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PopupContainer, ToastContainer } from "../../Styled/CustomStyled";

/**
 * The `UnityGame` component is responsible for rendering a Unity game within a React application.
 * It handles the initialization and communication with the Unity game, as well as managing the game's state and user interactions.
 *
 * The component uses the `react-unity-webgl` library to integrate the Unity game into the React application.
 * It also utilizes various hooks, such as `useEffect`, `useRef`, and `useState`, to manage the game's lifecycle and state.
 *
 * The component fetches quiz data from a server based on the game mode (official or non-official) and sends it to the Unity game. It also handles the submission of the user's quiz answers and updates the server accordingly.
 *
 * Additionally, the component listens for socket events related to quiz submission results and displays them in a toast container.
 */
const UnityGame: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({
    width: "960px",
    height: "540px",
  });
  const [quizSubmissionId, setQuizSubmissionId] = useState<string>("");
  const [gameData1, setGameData1] = useState<string>("");
  const [gameData2, setGameData2] = useState<string>("");
  const { message, showPopup } = usePopup();

  const blockchainCourseId = import.meta.env.VITE_BLOCKCHAIN_COURSE_ID;

  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "build/DevBuild.loader.js",
      dataUrl: "build/DevBuild.data",
      frameworkUrl: "build/DevBuild.framework.js",
      codeUrl: "build/DevBuild.wasm",
    });

  const token = localStorage.getItem("token");

  const socket = useSocket(import.meta.env.VITE_WE_API_URL);
  const [socketMsg, setSocketMsg] = useState<string>("");

  useEffect(() => {
    socket?.on('quiz_submission_result', (message) => {
      const obj = JSON.parse(message);

      setSocketMsg(`Quiz submission result: ${obj.userId} - Points: ${obj.totalPoints} - Finish Time: ${obj.totalFinishTime}`);
    });

    // Clean up listener on component unmount
    return () => {
      socket?.off('quiz_submission_result');
    };
  }, [socket]);

  // update dimensions when the window is resized
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width: `${width}px`, height: `${height}px` });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const checkHaveChangeTest = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_WE_API_URL}/quizzes/quiz-with-user-helper/${blockchainCourseId}?isOfficial=true`,
        {
          headers: {
            "x-token": `${token}`,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 429) {
          showPopup(
            "Bạn đã hết lượt làm bài hôm nay ngày mai hãy quay lại nhé."
          );
          sendMessage("GameController", "ShutDownTest");
        } else {
          console.error("Lỗi từ server:", error.response.status, error.message);
        }
      } else {
        console.error("Lỗi không xác định:", error);
      }
    }
  };

  const handleCheckHaveChangeTest = async () => {
    if (token) {
      await checkHaveChangeTest();
    } else {
      showPopup("Vui lòng đăng nhập để sử dụng chức năng này!");
    }
  };

  const handleRequireData = async (isOfficialGame: number) => {
    if (isOfficialGame === 0) {
      await axios.get(
        `${import.meta.env.VITE_WE_API_URL}/quizzes/quiz-with-user-helper/${blockchainCourseId}?isOfficial=false`,
        {
          headers: {
            "x-token": `${token}`,
          },
        }
      ).then((response) => {
        if (response.status === 201) {
          const data = response.data.metadata.data;
          sendMessage("GameController", "loadDataFromJson", data);
        }
      }).catch((_error) => {
        console.error("Lỗi dữ liệu không tồn tại");
        showPopup("Không có dữ liệu cho câu hỏi!");
      });
    } else if (isOfficialGame === 1) {
      const quizSubmissionResp = await axios.post(
        `${import.meta.env.VITE_WE_API_URL}/quizzes`,
        {
          blockchainCourseId,
        },
        {
          headers: {
            "x-token": `${token}`,
          },
        }
      );
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_WE_API_URL}/quizzes/quiz-with-user-helper/${blockchainCourseId}?isOfficial=true`,
          {
            headers: {
              "x-token": `${token}`,
            },
          }
        );
        if (response.status === 201) {
          const data = response.data.metadata.data;
          setQuizSubmissionId(quizSubmissionResp.data.metadata.data._id);
          sendMessage("GameController", "loadDataFromJson", data);
        }

      } catch (_error) {
        console.error("Lỗi dữ liệu không tồn tại");
        showPopup("Không có dữ liệu cho câu hỏi!");
      }
    } else {
      showPopup("Không có dữ liệu cho câu hỏi!");
    }
  };

  const handleCheckHaveChangeTestWrapper = () => {
    handleCheckHaveChangeTest();
  };

  const handleRequireDataWrapper = (_id: any) => {
    handleRequireData(_id);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSendDataWrapper = (data: any) => {
    setGameData1(data);
  };

  const handleSendCodeWrapper = (data: any) => {
    setGameData2(data);
  };

  useEffect(() => {
    const handleSubmitData = async () => {
      if (gameData1 && gameData2) {
        if (token) {
          const obj = {
            data1: gameData1,
            data2: gameData2,
            quizSubmissionId,
          };
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_WE_API_URL}/quizzes/submit`,
              obj,
              {
                headers: {
                  "Content-Type": "application/json",
                  "x-token": `${token}`,
                },
              }
            );
            // reset state
            setGameData1("");
            setGameData2("");
            setQuizSubmissionId("");
            showPopup("Submit quizz thành công!");
            if (response.status !== 201) {
              throw new Error("Lưu dữ liệu không thành công");
            }
          } catch (error) {
            if (error instanceof Error) {
              if (error.message === "Lưu dữ liệu không thành công") {
                showPopup(
                  "Có lỗi xảy ra khi lưu dữ liệu. Vui lòng đăng nhập lại!"
                );
              } else {
                console.error(error.message);
              }
            }
          }
        }
      }
    };
    handleSubmitData();
  }, [gameData1, gameData2]);

  useEffect(() => {
    addEventListener("CheckHaveChangeTest", handleCheckHaveChangeTestWrapper);
    addEventListener("RequireData", handleRequireDataWrapper);
    addEventListener("SendData", handleSendDataWrapper);
    addEventListener("SendCode", handleSendCodeWrapper);

    return () => {
      removeEventListener(
        "CheckHaveChangeTest",
        handleCheckHaveChangeTestWrapper
      );
      removeEventListener("RequireData", handleRequireDataWrapper);
      removeEventListener("SendData", handleSendDataWrapper);
      removeEventListener("SendCode", handleSendCodeWrapper);
    };
  }, [
    addEventListener,
    removeEventListener,
    handleCheckHaveChangeTestWrapper,
    handleRequireDataWrapper,
    handleSendDataWrapper,
    handleSendCodeWrapper,
  ]);

  useEffect(() => {
    if (socketMsg) {
      const timer = setTimeout(() => {
        setSocketMsg("");
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [socketMsg]);

  return (
    <UnityContainer>
      {message && <PopupContainer>{message}</PopupContainer>}
      <UnityContent ref={containerRef}>
        <Unity unityProvider={unityProvider} style={dimensions} />
      </UnityContent>
      {socketMsg && <ToastContainer>{socketMsg}</ToastContainer>}
    </UnityContainer>
  );
};

export default UnityGame;
