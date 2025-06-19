import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/images/icon-arrow-left.png";
import moreIcon from "../../assets/images/icon-more-vertical.png";
import "../../styles/common/ProfileHeader.css";
import Modal from "./Modal"; // Modal import
import Alert from "./Alert"; // Alert import

const ProfileHeader = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const modalOptions = [
    { text: "설정 및 개인정보", action: () => {} },
    {
      text: "로그아웃",
      action: () => {
        setIsModalOpen(false);
        setIsAlertOpen(true);
      },
    },
  ];

  return (
    <>
      <header className="profile-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <img src={backIcon} alt="뒤로 가기" />
        </button>
        <button className="more-button" onClick={() => setIsModalOpen(true)}>
          <img src={moreIcon} alt="더보기" />
        </button>
      </header>
      {isModalOpen && (
        <Modal options={modalOptions} onClose={() => setIsModalOpen(false)} />
      )}
      {isAlertOpen && (
        <Alert
          message="로그아웃하시겠습니까?"
          confirmText="로그아웃"
          onConfirm={handleLogout}
          onCancel={() => setIsAlertOpen(false)}
        />
      )}
    </>
  );
};

export default ProfileHeader;
