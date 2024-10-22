import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEditSquare } from "react-icons/md";
import { IoSave } from "react-icons/io5";

import {
  HeaderContainer,
  StyledInput,
  Button,
} from "./Header.styled";
import axios from "axios";
import usePopup from "../../hook/usePopup";
import { PopupContainer } from "../../Styled/CustomStyled";

interface HeaderProps {
  onOpenTutorial: () => void;
  userName: string | null;
  userEmail: string | null;
  onOpenDailyTask: () => void;
  //onUpdateUserName: (newUserName: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onOpenTutorial,
  userName,
  userEmail,
  onOpenDailyTask,
}) => {
  const navigate = useNavigate();
  const [newUserName, setNewUserName] = useState(() => {
    return userName;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [admin, setAdmin] = useState("");
  const token = localStorage.getItem("token");


  const {message, showPopup} = usePopup();

  const handleLeaderboardClick = async () => {
    try {
      navigate("/leaderboard");
    } catch (error) {
      showPopup("Lỗi khi tải dữ liệu leaderboard");
    }
  };

  const handleDocsClick = () => {
    window.open(import.meta.env.VITE_DOCS_LINK || "", "_blank");
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(import.meta.env.VITE_INVITE_LINK || ""); // Thay thế bằng URL bạn muốn sao chép
    showPopup("Đã sao chép link");
  };

  const handleUserNameChange = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WE_API_URL}/users/update-user`,
        {
          userId: userName,
          username: newUserName,
        }, 
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": `${token}`,
          },
        }
      );
      if (response.status !== 200) throw new Error("Lỗi khi cập nhật tên người dùng");
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    setNewUserName(userName);
  }, [userName]);

  useEffect(() => {
    const handleGetUserName = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_WE_API_URL}/users/get-user?userId=${userName}`
        );
        if (!response.ok) throw new Error("Lỗi khi cập nhật tên người dùng");
        const data = await response.json();
        setNewUserName(data.metadata.username);
        setAdmin(data.metadata.role);
      } catch (error) {
        await fetch(`${import.meta.env.VITE_WE_API_URL}/users/create-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": `${token}`,
          },
          body: JSON.stringify({ userId: userName, email: userEmail }),
        });
      }
    };
    handleGetUserName();
  }, [userName]);

  const handleEditClick = async () => {
    setIsEditing(true);
  };

  const renderEditingMode = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <StyledInput
        type="text"
        value={newUserName || ""}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder="Đổi tên"
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <IoSave size={20} onClick={handleUserNameChange} />
    </div>
  );

  const renderDisplayMode = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h1
        style={{
          fontSize: "1.5rem",
          margin: "0 5px 0 0",
          color: "#fff",
          textShadow: "1px 1px #000",
        }}
      >
        {newUserName}
      </h1>
      <MdEditSquare size={20} onClick={handleEditClick} /> 
    </div>
  );

  const handleExport = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_WE_API_URL}/users/export-all?start-date=2024-08-15&end-date=2024-08-25`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": `${token}`,
          },
          responseType: "blob", // Thêm dòng này để chỉ định kiểu phản hồi,
        }
      );
      const blob = await response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "exported_data.xlsx"; // Tên file tải về
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <HeaderContainer>
      <div>
        <Button guild onClick={onOpenTutorial}>
          Guide
        </Button>
        <Button docs onClick={handleDocsClick}>
          Docs
        </Button>
        {admin === "admin" && (
          <Button admin onClick={handleExport}>
            Export
          </Button>
        )}
      </div>
      {isEditing ? renderEditingMode() : renderDisplayMode()}
      <div>
        <Button link onClick={onOpenDailyTask}>
          Mision
        </Button>
        <Button link onClick={handleCopyUrl}>
          Invite
        </Button>
        <Button onClick={handleLeaderboardClick} leaderboard>
          Leaderboard
        </Button>
      </div>
      {message && <PopupContainer>{message}</PopupContainer>}
    </HeaderContainer>
  );
};

export default Header;