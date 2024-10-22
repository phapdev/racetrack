import styled from "styled-components";

export const FullScreenContainer = styled.div`
  background: rgb(2, 0, 36);
  background: -moz-linear-gradient(
    164deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(32, 32, 113, 1) 35%,
    rgba(29, 49, 126, 1) 41%,
    rgba(24, 77, 148, 1) 51%,
    rgba(0, 212, 255, 1) 100%
  );
  background: -webkit-linear-gradient(
    164deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(32, 32, 113, 1) 35%,
    rgba(29, 49, 126, 1) 41%,
    rgba(24, 77, 148, 1) 51%,
    rgba(0, 212, 255, 1) 100%
  );
  background: linear-gradient(
    164deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(32, 32, 113, 1) 35%,
    rgba(29, 49, 126, 1) 41%,
    rgba(24, 77, 148, 1) 51%,
    rgba(0, 212, 255, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#020024",endColorstr="#00d4ff",GradientType=1);

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* Ẩn thanh cuộn nếu nội dung quá lớn */
  display: flex;
  justify-content: center; /* Căn giữa nội dung theo chiều ngang */
  align-items: center; /* Căn giữa nội dung theo chiều dọc */

  /* Tùy chọn thêm */
  background-color: #f0f0f0; /* Màu nền */
  user-select: none; /* Ngăn chọn văn bản */

  /* Ngăn zoom */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
export const BackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: transparent;
  // làm mờ màu nền
  color: #ffd700;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: scale(1.1); // Phóng to nt khi di chuột
    border: 1px solid white;
  }

  &:focus {
    outline: none; // Bỏ viền khi nút được chọn
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); // Hiệu ứng bóng khi nút được chọn
  }

  &:active {
    transform: scale(1); // Trở lại kích thước ban đầu
    background-color: #48d1cc; // Trở lại màu nền ban đầu
  }
`;

export const PopupContainer = styled.div`
  position: fixed;
  top: 10vh;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  font-family: "VT323", monospace; /* Font pixel */
  z-index: 1000;
`;

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 10vh; /* Positioned near the bottom */
  right: 0px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  font-family: "VT323", monospace; /* Font pixel */
  z-index: 1000;
`;