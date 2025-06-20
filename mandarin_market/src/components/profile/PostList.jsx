import React, { useState } from "react";
import { Link } from "react-router-dom";
import { generateImageUrl } from "../../utils/imageUrl";
import defaultImage from "../../assets/images/basic-profile.png";
import listIcon from "../../assets/images/icon-list.png";
import listIconFill from "../../assets/images/icon-list-fill.png";
import albumIcon from "../../assets/images/icon-album.png";
import albumIconFill from "../../assets/images/icon-album-fill.png";
import moreIcon from "../../assets/images/icon-more-vertical.svg";
import heartIcon from "../../assets/images/icon-heart.png";
import commentIcon from "../../assets/images/icon-message-circle.png";
import "../../styles/profile/PostList.css";
import Modal from "../common/Modal";
import Alert from "../common/Alert";

const PostList = ({ posts = [], showViewToggle = true }) => {
  const myAccountname = localStorage.getItem("accountname");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [alertConfig, setAlertConfig] = useState({
    message: "",
    confirmText: "",
    onConfirm: null,
  });
  const [view, setView] = useState("list");

  const openPostModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const openAlert = (config) => {
    setAlertConfig(config);
    setIsModalOpen(false);
    setIsAlertOpen(true);
  };

  const handleDelete = () => {
    console.log(`${selectedPost.id} 게시글 삭제 실행`);
    // 여기에 실제 삭제 API 호출 로직 추가
    setIsAlertOpen(false);
  };

  const handleReport = () => {
    console.log(`${selectedPost.id} 게시글 신고 실행`);
    // 여기에 실제 신고 API 호출 로직 추가
    setIsAlertOpen(false);
  };

  const getModalOptions = () => {
    if (!selectedPost) return [];
    const isMyPost = selectedPost.author.accountname === myAccountname;

    if (isMyPost) {
      return [
        {
          text: "삭제",
          action: () =>
            openAlert({
              message: "게시글을 삭제할까요?",
              confirmText: "삭제",
              onConfirm: handleDelete,
            }),
        },
        {
          text: "수정",
          action: () => console.log("수정 페이지로 이동"),
        },
      ];
    } else {
      return [
        {
          text: "신고하기",
          action: () =>
            openAlert({
              message: "게시글을 신고할까요?",
              confirmText: "신고",
              onConfirm: handleReport,
            }),
        },
      ];
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const handleImgError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <>
      <section className="post-list-section">
        {showViewToggle && (
          <div className="view-toggle-bar">
            <button onClick={() => setView("list")}>
              <img
                src={view === "list" ? listIcon : listIconFill}
                alt="목록형"
              />
            </button>
            <button onClick={() => setView("album")}>
              <img
                src={view === "album" ? albumIconFill : albumIcon}
                alt="앨범형"
              />
            </button>
          </div>
        )}
        {posts.length > 0 && (
          <>
            {view === "list" && (
              <div className="post-list-view">
                {posts.map((post) => (
                  <div key={post.id} className="post-item-list">
                    <div className="post-author-info">
                      <Link
                        to={`/profile/${post.author.accountname}`}
                        className="post-author-link"
                      >
                        <img
                          // 2. generateImageUrl 함수를 사용하여 올바른 URL 생성
                          src={generateImageUrl(post.author.image)}
                          alt={`${post.author.username}의 프로필 이미지`}
                          className="post-author-image"
                          onError={handleImgError}
                        />
                      </Link>
                      <div>
                        <p className="author-name">{post.author.username}</p>
                        <p className="author-account">
                          @ {post.author.accountname}
                        </p>
                      </div>
                      <button
                        className="post-more-button"
                        onClick={() => openPostModal(post)}
                      >
                        <img src={moreIcon} alt="더보기" />
                      </button>
                    </div>

                    <div className="post-content-list">
                      <Link to={`/post/${post.id}`}>
                        <p>{post.content}</p>
                      </Link>

                      {/* ▼▼▼ 핵심 구현 부분 ▼▼▼ */}
                      {post.image &&
                        // 1. post.image에 쉼표가 있는지 확인하여 여러 이미지인지 판단
                        (post.image.includes(",") ? (
                          // 2. 여러 이미지일 경우: 가로 스크롤 갤러리 렌더링
                          <div className="post-image-gallery">
                            {post.image.split(",").map((imgName, index) => (
                              <img
                                key={index}
                                src={generateImageUrl(imgName.trim())} // .trim()으로 공백 제거
                                alt={`게시물 이미지 ${index + 1}`}
                                className="gallery-image"
                              />
                            ))}
                          </div>
                        ) : (
                          // 3. 단일 이미지일 경우: 기존 방식대로 렌더링
                          <Link to={`/post/${post.id}`}>
                            <img
                              src={generateImageUrl(post.image)}
                              alt="게시물 이미지"
                              className="post-image-list"
                            />
                          </Link>
                        ))}
                    </div>
                    <div className="post-interactions">
                      <button
                        className={`like-button ${post.hearted ? "liked" : ""}`}
                      >
                        <img src={heartIcon} alt="좋아요" />
                        <span>{post.heartCount}</span>
                      </button>
                      {/* 이 부분을 Link 컴포넌트로 수정하여 클릭 시 상세 페이지로 이동시킵니다. */}
                      <Link to={`/post/${post.id}`} className="comment-link">
                        <img src={commentIcon} alt="댓글" />
                        <span>{post.commentCount}</span>
                      </Link>
                    </div>
                    <p className="post-date">{formatDate(post.createdAt)}</p>
                  </div>
                ))}
              </div>
            )}
            {view === "album" && (
              <div className="post-album-view">
                {posts.map((post) => {
                  // 1. 게시물에 이미지가 있는지, 여러 개인지 확인
                  if (!post.image) return null;
                  const images = post.image.split(",");
                  const firstImage = images[0].trim();

                  return (
                    <Link
                      to={`/post/${post.id}`}
                      key={post.id}
                      className="post-item-album"
                    >
                      <img
                        // 2. generateImageUrl 함수를 사용하여 썸네일 표시
                        src={generateImageUrl(firstImage)}
                        alt="게시물 썸네일"
                        onError={handleImgError} // 3. 이미지 로딩 실패 처리
                      />
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}
        {posts.length === 0 && <p className="no-posts">게시물이 없습니다.</p>}
      </section>
      {isModalOpen && (
        <Modal
          options={getModalOptions()}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isAlertOpen && (
        <Alert
          message={alertConfig.message}
          confirmText={alertConfig.confirmText}
          onConfirm={alertConfig.onConfirm}
          onCancel={() => setIsAlertOpen(false)}
        />
      )}
    </>
  );
};

export default PostList;
