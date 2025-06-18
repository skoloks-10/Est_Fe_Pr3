import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const TabBarContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: white;
  border-top: 1px solid #dbdbdb;
  max-width: 390px;
  margin: 0 auto;
`;

const TabItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${(props) => (props.active ? "#F26E22" : "#767676")};
  font-size: 10px;
`;

const TabIcon = styled.div`
  font-size: 24px;
  margin-bottom: 4px;
`;

const TabBar = () => {
  const location = useLocation();

  return (
    <TabBarContainer>
      <TabItem to="/" active={location.pathname === "/"}>
        <TabIcon>🏠</TabIcon>
        <span>홈</span>
      </TabItem>
      <TabItem to="/chat" active={location.pathname === "/chat"}>
        <TabIcon>💬</TabIcon>
        <span>채팅</span>
      </TabItem>
      <TabItem to="/post/create" active={location.pathname === "/post/create"}>
        <TabIcon>➕</TabIcon>
        <span>게시물 작성</span>
      </TabItem>
      <TabItem to="/profile" active={location.pathname.includes("/profile")}>
        <TabIcon>👤</TabIcon>
        <span>프로필</span>
      </TabItem>
    </TabBarContainer>
  );
};

export default TabBar;
