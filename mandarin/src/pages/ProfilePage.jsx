import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Header from "../components/common/Header";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProductList from "../components/profile/ProductList";
import PostList from "../components/profile/PostList";
import TabBar from "../components/common/TabBar";

const PageContainer = styled.div`
  max-width: 390px;
  margin: 0 auto;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Content = styled.div`
  padding-bottom: 60px;
`;

const ViewModeToggle = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 16px;
  background-color: white;
  margin-top: 6px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  margin-left: 16px;
  color: ${(props) => (props.isActive ? "#F26E22" : "#DBDBDB")};
`;

const NoContentMessage = styled.p`
  text-align: center;
  padding: 40px 20px;
  color: #767676;
  background-color: white;
  margin-top: 6px;
`;

const ProfilePage = () => {
  const { accountname } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("list");
  const [isMyProfile, setIsMyProfile] = useState(false);

  // 더미 데이터 - 실제 구현 시 API에서 가져옴
  const [profileData, setProfileData] = useState({
    name: "애월읍 위니브 감귤농장",
    accountname: "weniv_Mandarin",
    followers: 2950,
    following: 128,
    bio: "애월읍 감귤 직국 배송, 꿀따기 제철, 감귤 농장",
    profileImage: "/images/profile.png",
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "애월읍 노지 감귤",
      price: 35000,
      image: "/images/product1.jpg",
      link: "https://example.com/product1",
    },
    {
      id: 2,
      name: "애월읍 한라봉 10kg",
      price: 45000,
      image: "/images/product2.jpg",
      link: "https://example.com/product2",
    },
    {
      id: 3,
      name: "감귤 파치",
      price: 25000,
      image: "/images/product3.jpg",
      link: "https://example.com/product3",
    },
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: { ...profileData },
      content:
        "오늘 인생을 그대로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다. 이상의 정신의 배 따뜻한 그들의 그와 약동하다. 대고, 못할 봄은 풍부하게 뛰노는 인생의 힘있다.",
      image: "/images/post1.jpg",
      likes: 58,
      comments: 12,
      createdAt: "2020년 10월 21일",
    },
  ]);

  // 프로필 주인 여부 확인 (실제는 로그인 사용자와 비교)
  useEffect(() => {
    // 현재 로그인한 사용자의 계정명과 페이지 계정명 비교
    // 예제로 'weniv_Mandarin'이 현재 로그인한 사용자라고 가정
    const currentUserAccountname = "weniv_Mandarin";
    const pageAccountname = accountname || "weniv_Mandarin";

    setIsMyProfile(currentUserAccountname === pageAccountname);

    // 실제 구현에서는 API 호출하여 프로필 데이터 로드
    // fetchProfileData(accountname);
  }, [accountname]);

  // 팔로워 목록 페이지로 이동
  const navigateToFollowers = () => {
    navigate(`/profile/${profileData.accountname}/followers`);
  };

  // 팔로잉 목록 페이지로 이동
  const navigateToFollowing = () => {
    navigate(`/profile/${profileData.accountname}/following`);
  };

  return (
    <PageContainer>
      <Header title={isMyProfile ? "마이 프로필" : "프로필"} />
      <Content>
        <ProfileInfo
          profile={profileData}
          isMyProfile={isMyProfile}
          onFollowersClick={navigateToFollowers}
          onFollowingClick={navigateToFollowing}
        />

        {/* 판매 중인 상품 - 상품이 있을 경우만 표시 */}
        {products && products.length > 0 && (
          <ProductList products={products} isMyProfile={isMyProfile} />
        )}

        {/* 게시글 영역 - 게시글이 있을 때만 표시 */}
        {posts && posts.length > 0 ? (
          <>
            <ViewModeToggle>
              <ToggleButton
                isActive={viewMode === "list"}
                onClick={() => setViewMode("list")}
              >
                ☰
              </ToggleButton>
              <ToggleButton
                isActive={viewMode === "album"}
                onClick={() => setViewMode("album")}
              >
                ▦
              </ToggleButton>
            </ViewModeToggle>

            <PostList
              posts={posts}
              viewMode={viewMode}
              isMyProfile={isMyProfile}
            />
          </>
        ) : (
          <NoContentMessage>등록된 게시글이 없습니다.</NoContentMessage>
        )}
      </Content>
      <TabBar />
    </PageContainer>
  );
};

export default ProfilePage;
