import React, { useState } from "react";
import axios from "axios";
import usePopup from "../../hook/usePopup";
import {
  ModalOverlay,
  ModalContent,
  Title,
  TaskList,
  Button,
  CloseButton,
  SelectButtonGroup,
  SelectButton,
} from "./Dailytask.styled";
import { useTranslation } from "react-i18next";
import { PopupContainer } from "../../Styled/CustomStyled";
import { Task } from "./Task";

import XIcon from "../../../public/icons/icons8-twitterx-48.png";
import DiscordIcon from "../../../public/icons/discord-48.png";

interface DailyTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

type TaskType = "daily" | "weekly" | "once";

const DailyTask: React.FC<DailyTaskProps> = ({ isOpen, onClose }) => {
  const [twitterUsername, setTwitterUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState<TaskType>("daily");
  const { t } = useTranslation();
  const { message, showPopup } = usePopup();

  const handleCheck = async (task: string) => {
    setIsLoading(true);
    const twitterLinkAccount = "avail_vietnam";
    const twitterName = twitterUsername.replace("@", "");
    const retweetid = import.meta.env.VITE_RETWEET_ID;
    const tagerturl = "https://x.com/avail_vietnam/status/1842769057201987940";

    try {
      let response;
      switch (task) {
        case "dailyTask1":
          response = await axios.get(
            `${
              import.meta.env.VITE_WE_API_URL
            }/tw/check_follower/${twitterName}/${twitterLinkAccount}`
          );
          break;
        case "dailyTask2":
          response = await axios.get(
            `${
              import.meta.env.VITE_WE_API_URL
            }/tw/check_like/${twitterName}?targetpost=${tagerturl}`
          );
          break;
        case "dailyTask3":
          response = await axios.get(
            `${
              import.meta.env.VITE_WE_API_URL
            }/tw/check_retweet/${twitterName}/${retweetid}`
          );
          break;
        case "dailyTask4":
          response = await axios.get(
            `${
              import.meta.env.VITE_WE_API_URL
            }/tw/check_cmt/${twitterName}?targetpost=${tagerturl}`
          );
          break;
      }

      if (response && (response.status === 200 || response.status === 201)) {
        showPopup("Nhiệm vụ hoàn thành! Bạn đã được cộng thêm lượt chơi.");
      } else {
        showPopup("Không thể xác minh nhiệm vụ. Vui lòng thử lại.");
      }
    } catch (error) {
      showPopup("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTwitterUsername("");
    if (e.target.value.startsWith("@") || e.target.value !== " ") {
      setTwitterUsername(e.target.value);
    }
  };

  const renderTasks = () => {
    switch (selectedTaskType) {
      case "daily":
        return (
          <>
            <Task
              taskKey="dailyTask1"
              taskNumber="1"
              icon={XIcon}
              twitterLink="https://x.com/avail_vietnam"
              onCheck={handleCheck}
              twitterUsername={twitterUsername}
              onInputChange={handleInputChange}
              isLoading={isLoading}
            />
            {/* Thêm các nhiệm vụ hàng ngày khác ở đây */}
            <Task
              taskKey="dailyTask2"
              taskNumber="2"
              icon={XIcon}
              twitterLink="https://x.com/avail_vietnam"
              onCheck={handleCheck}
              twitterUsername={twitterUsername}
              onInputChange={handleInputChange}
              isLoading={isLoading}
            />
            <Task
              taskKey="dailyTask3"
              taskNumber="3"
              icon={XIcon}
              twitterLink="https://discord.gg/avail"
              onCheck={handleCheck}
              twitterUsername={twitterUsername}
              onInputChange={handleInputChange}
              isLoading={isLoading}
            />
            <Task
              taskKey="dailyTask4"
              taskNumber="4"
              icon={XIcon}
              twitterLink="https://x.com/avail_vietnam"
              onCheck={handleCheck}
              twitterUsername={twitterUsername}
              onInputChange={handleInputChange}
              isLoading={isLoading}
            />
          </>
        );
      case "weekly":
        return (
          <>
            {/* Thêm các nhiệm vụ hàng tuần ở đây */}
            <Task
              taskKey="dailyTask3"
              taskNumber="3"
              icon={DiscordIcon}
              twitterLink="https://discord.gg/avail"
              onCheck={handleCheck}
              twitterUsername={twitterUsername}
              onInputChange={handleInputChange}
              isLoading={isLoading}
            />
          </>
        );
      case "once":
        return (
          <>
            {/* Thêm các nhiệm vụ một lần ở đây */}
            <p>{t("daily-task.one-time-tasks-coming-soon")}</p>
          </>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Title>{t("daily-task.title")}</Title>
        <SelectButtonGroup>
          <SelectButton
            onClick={() => setSelectedTaskType("daily")}
            isSelected={selectedTaskType === "daily"}
          >
            {t("daily-task.daily")}
          </SelectButton>
          <SelectButton
            onClick={() => setSelectedTaskType("weekly")}
            isSelected={selectedTaskType === "weekly"}
          >
            {t("daily-task.weekly")}
          </SelectButton>
          <SelectButton
            onClick={() => setSelectedTaskType("once")}
            isSelected={selectedTaskType === "once"}
          >
            {t("daily-task.one-time")}
          </SelectButton>
        </SelectButtonGroup>
        <TaskList>{renderTasks()}</TaskList>
        {message && <PopupContainer>{message}</PopupContainer>}
      </ModalContent>
    </ModalOverlay>
  );
};

export default DailyTask;
