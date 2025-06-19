import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { generateImageUrl } from "../utils/imageUrl";
import defaultProfileImg from "../assets/images/default-profile.svg";
import imageUploadIcon from "../assets/images/upload-file.png";
import removeIcon from "../assets/images/x.png";
import "../styles/PostUploadPage.css";

const PostUploadPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const fileInputRef = useRef(null);

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]); // File 객체 배열
  const [imagePreviews, setImagePreviews] = useState([]); // 미리보기 URL 배열
  const [isFormValid, setIsFormValid] = useState(false);

  // 1. 폼 유효성 검사 (내용 또는 이미지가 있으면 업로드 버튼 활성화)
  useEffect(() => {
    setIsFormValid(content.trim().length > 0 || images.length > 0);
  }, [content, images]);

  // 2. 이미지 선택 핸들러 (최대 3장)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 3) {
      alert("이미지는 최대 3장까지 업로드할 수 있습니다.");
      return;
    }

    setImages((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // 3. 이미지 미리보기에서 특정 이미지 제거
  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setImagePreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  // 4. 폼 제출 핸들러
  const handleSubmit = async () => {
    if (!isFormValid) return;

    let uploadedImageNames = "";
    const token = localStorage.getItem("token");

    // Step 1: 이미지가 있으면 서버에 업로드
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("image", image);
      });

      try {
        const res = await fetch(
          "https://estapi.mandarin.weniv.co.kr/image/uploadfiles",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        // 여러 파일 업로드 시 파일 이름이 콤마로 구분된 문자열로 올 경우를 처리
        // 만약 배열로 온다면 data.map(item => item.filename).join(',') 등으로 처리 필요
        uploadedImageNames = data.map((item) => item.filename).join(",");
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        alert("이미지 업로드에 실패했습니다.");
        return;
      }
    }

    // Step 2: 게시글 데이터 전송
    const postData = {
      post: {
        content: content,
        image: uploadedImageNames,
      },
    };

    try {
      const res = await fetch("https://estapi.mandarin.weniv.co.kr/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      if (data.post) {
        navigate(`/profile/${user.accountname}`);
      } else {
        alert(data.message || "게시글 업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글 업로드 실패:", error);
    }
  };

  const handleImgError = (e) => {
    e.target.src = defaultProfileImg;
  };

  return (
    <div className="post-upload-container">
      <header className="post-upload-header">
        <button onClick={() => navigate(-1)} className="back-button" />
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="upload-button"
        >
          업로드
        </button>
      </header>
      <main className="post-upload-main">
        <img
          src={generateImageUrl(user.image)}
          onError={handleImgError}
          alt="내 프로필"
          className="my-profile-image"
        />
        <div className="post-form-area">
          <textarea
            placeholder="게시글 입력하기..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="post-textarea"
          />
          <div className="image-preview-container">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="image-preview-item">
                <img src={preview} alt="미리보기" className="preview-image" />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="remove-image-button"
                >
                  <img src={removeIcon} alt="삭제" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="image-upload-fab"
      >
        <img src={imageUploadIcon} alt="이미지 업로드" />
      </button>
    </div>
  );
};

export default PostUploadPage;
