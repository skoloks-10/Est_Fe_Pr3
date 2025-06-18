import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  background-color: white;
  border-bottom: 1px solid #dbdbdb;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <BackButton onClick={() => navigate(-1)}>←</BackButton>
      <div></div> {/* 중앙 여백 */}
      <MoreButton>⋮</MoreButton>
    </HeaderContainer>
  );
};

export default Header;
