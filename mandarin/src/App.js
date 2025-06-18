import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import ProfilePage from "./pages/ProfilePage";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f8f8f8;
  }

  button {
    cursor: pointer;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<ProfilePage />} />{" "}
        {/* 임시로 프로필 페이지를 기본으로 설정 */}
      </Routes>
    </Router>
  );
}

export default App;
