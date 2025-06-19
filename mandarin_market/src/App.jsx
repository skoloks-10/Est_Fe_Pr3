import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // App.css import 추가

import SplashScreen from "./pages/SplashScreen";
import LoginPage from "./pages/LoginPage";
import EmailLoginPage from "./pages/EmailLoginPage";
import EmailSignupPage from "./pages/EmailSignupPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ChatPage from "./pages/ChatPage";
import PostUploadPage from "./pages/PostUploadPage";
import ProfilePage from "./components/profile/ProfilePage";
import FollowListPage from "./pages/FollowListPage"; // FollowListPage import 추가
import ProfileEditPage from "./pages/ProfileEditPage";
import ProductUploadPage from "./pages/ProductUploadPage";
import PostDetailPage from "./pages/PostDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 인증 및 시작 */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/email" element={<EmailLoginPage />} />
        <Route path="/signup/email" element={<EmailSignupPage />} />
        <Route path="/signup/profile" element={<ProfileSetupPage />} />

        {/* 메인 화면 */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/post/upload" element={<PostUploadPage />} />
        <Route path="/profile/:accountname" element={<ProfilePage />} />
        {/* 팔로워/팔로잉 경로 추가 */}
        <Route
          path="/profile/:accountname/followers"
          element={<FollowListPage />}
        />
        <Route
          path="/profile/:accountname/followings"
          element={<FollowListPage />}
        />
        {/* 프로필 편집 페이지 추가 */}
        <Route path="/profile/edit" element={<ProfileEditPage />} />
        <Route path="/product/upload" element={<ProductUploadPage />} />
        <Route path="/post/:postId" element={<PostDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
