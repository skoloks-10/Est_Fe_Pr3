import React from "react";
import styled from "styled-components";
import PostItem from "../post/PostItem";

const PostListContainer = styled.div`
  margin-top: 6px;
`;

const AlbumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background-color: white;
`;

const AlbumItem = styled.div`
  aspect-ratio: 1;
`;

const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostList = ({ posts, viewMode }) => {
  if (!posts || posts.length === 0) return null;

  if (viewMode === "album") {
    return (
      <AlbumGrid>
        {posts.map(
          (post) =>
            post.image && (
              <AlbumItem key={post.id}>
                <AlbumImage src={post.image} alt="게시글 이미지" />
              </AlbumItem>
            )
        )}
      </AlbumGrid>
    );
  }

  return (
    <PostListContainer>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </PostListContainer>
  );
};

export default PostList;
