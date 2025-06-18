import React, { useState } from "react";
import styled from "styled-components";

const PostContainer = styled.article`
  background-color: white;
  padding: 16px;
  border-bottom: 1px solid #dbdbdb;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #f2f2f2;
  margin-right: 12px;
  overflow: hidden;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const UserHandle = styled.span`
  font-size: 12px;
  color: #767676;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #767676;
`;

const PostContent = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const PostActions = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #767676;
  font-size: 14px;
`;

const PostDate = styled.span`
  font-size: 12px;
  color: #767676;
`;

const PostItem = ({ post }) => {
  const [liked, setLiked] = useState(false);

  return (
    <PostContainer>
      <PostHeader>
        <UserInfo>
          <UserAvatar>
            <Avatar src={post.author.profileImage} alt={post.author.name} />
          </UserAvatar>
          <UserDetails>
            <UserName>{post.author.name}</UserName>
            <UserHandle>@{post.author.username}</UserHandle>
          </UserDetails>
        </UserInfo>
        <MoreButton>⋮</MoreButton>
      </PostHeader>

      <PostContent>{post.content}</PostContent>
      {post.image && <PostImage src={post.image} alt="게시글 이미지" />}

      <PostActions>
        <ActionButton onClick={() => setLiked(!liked)}>
          {liked ? "❤️" : "🤍"} {post.likes}
        </ActionButton>
        <ActionButton>💬 {post.comments}</ActionButton>
      </PostActions>

      <PostDate>{post.createdAt}</PostDate>
    </PostContainer>
  );
};

export default PostItem;
