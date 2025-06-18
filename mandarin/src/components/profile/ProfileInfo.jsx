import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProfileContainer = styled.section`
  padding: 16px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  cursor: pointer;

  .number {
    font-size: 18px;
    font-weight: bold;
  }

  .label {
    font-size: 12px;
    color: #767676;
  }
`;

const ProfileImageContainer = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DefaultAvatar = styled.div`
  width: 80%;
  height: 80%;
  background-color: #e0e0e0;
  border-radius: 50%;
`;

const ProfileName = styled.h1`
  font-size: 16px;
  font-weight: bold;
  margin: 12px 0 6px;
`;

const Username = styled.p`
  font-size: 12px;
  color: #767676;
  margin-bottom: 16px;
`;

const Bio = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
`;

const IconButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PrimaryButton = styled.button`
  background-color: #f26e22;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 8px 0;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  max-width: 120px;
`;

const SecondaryButton = styled.button`
  background-color: white;
  color: #767676;
  border: 1px solid #dbdbdb;
  border-radius: 30px;
  padding: 8px 0;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  max-width: 120px;
`;

const ProfileInfo = ({
  profile,
  isMyProfile,
  onFollowersClick,
  onFollowingClick,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    // 실제 API 호출은 구현하지 않음, 요구사항에 따라 버튼 상태만 변경
  };

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  const handleChatClick = () => {
    navigate("/chat");
  };

  const handleShareClick = () => {
    // 공유 기능 구현 (실제로는 공유 API 또는 네이티브 공유 기능 연동)
    if (navigator.share) {
      navigator.share({
        title: `${profile.name}의 프로필`,
        text: profile.bio,
        url: window.location.href,
      });
    } else {
      // 공유 API가 지원되지 않는 경우 클립보드에 복사
      navigator.clipboard.writeText(window.location.href);
      alert("프로필 주소가 클립보드에 복사되었습니다.");
    }
  };

  return (
    <ProfileContainer>
      <StatsContainer>
        <Stat onClick={onFollowersClick}>
          <span className="number">{profile.followers}</span>
          <span className="label">followers</span>
        </Stat>

        <ProfileImageContainer>
          {profile.profileImage ? (
            <ProfileImage src={profile.profileImage} alt={profile.name} />
          ) : (
            <DefaultAvatar />
          )}
        </ProfileImageContainer>

        <Stat onClick={onFollowingClick}>
          <span className="number">{profile.following}</span>
          <span className="label">followings</span>
        </Stat>
      </StatsContainer>

      <ProfileName>{profile.name}</ProfileName>
      <Username>@{profile.accountname}</Username>
      <Bio>{profile.bio}</Bio>

      <ButtonContainer>
        {isMyProfile ? (
          /* 내 프로필인 경우 프로필 수정 버튼 */
          <>
            <IconButton onClick={handleChatClick}>💬</IconButton>
            <SecondaryButton onClick={handleEditProfile}>
              프로필 수정
            </SecondaryButton>
            <SecondaryButton onClick={handleEditProfile}>
              상품 등록
            </SecondaryButton>
            <IconButton onClick={handleShareClick}>🔗</IconButton>
          </>
        ) : (
          /* 다른 사용자 프로필인 경우 팔로우/언팔로우 버튼 */
          <>
            <IconButton onClick={handleChatClick}>💬</IconButton>
            <PrimaryButton onClick={handleFollowClick}>
              {isFollowing ? "취소" : "팔로우"}
            </PrimaryButton>
            <IconButton onClick={handleShareClick}>🔗</IconButton>
          </>
        )}
      </ButtonContainer>
    </ProfileContainer>
  );
};

export default ProfileInfo;
