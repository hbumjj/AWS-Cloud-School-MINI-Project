import React, { useEffect, useState, useCallback } from 'react';
import { Container, Header, Button } from '@cloudscape-design/components';
import Board from "@cloudscape-design/board-components/board";
import BoardItem from "@cloudscape-design/board-components/board-item";
import CommentSection from './CommentSection';
import { fetchBoardItems, likeItem, dislikeItem, deleteBoardItem, addComment } from '../api/board';

function BoardContainer({ updatePopularPosts }) {
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const loadItems = async () => {
      const fetchedItems = await fetchBoardItems();
      setItems(fetchedItems);
    };
    loadItems();

    // 현재 사용자 정보 가져오기
    const user = localStorage.getItem('currentUser');
    setCurrentUser(user ? JSON.parse(user).username : '');
  }, []);

  const handleLike = useCallback(async (itemId) => {
    try {
      const response = await likeItem(itemId);
      setItems(prevItems =>
        prevItems.map(item =>
          item.bidx === itemId ? { ...item, likes: response.data.likes } : item
        )
      );
      updatePopularPosts();
    } catch (error) {
      console.error('Error liking item:', error);
    }
  }, [updatePopularPosts]);

  const handleDislike = useCallback(async (itemId) => {
    try {
      const response = await dislikeItem(itemId);
      setItems(prevItems =>
        prevItems.map(item =>
          item.bidx === itemId ? { ...item, dislikes: response.data.dislikes } : item
        )
      );
      updatePopularPosts();
    } catch (error) {
      console.error('Error disliking item:', error);
    }
  }, [updatePopularPosts]);

  const handleDelete = useCallback(async (itemId) => {
    try {
      await deleteBoardItem(itemId);
      setItems(prevItems => prevItems.filter(item => item.bidx !== itemId));
      updatePopularPosts();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }, [updatePopularPosts]);

  const handleAddComment = useCallback(async (itemId, content) => {
    try {
      const response = await addComment(itemId, content, currentUser);
      setItems(prevItems =>
        prevItems.map(item =>
          item.bidx === itemId ? { ...item, comments: [...(item.comments || []), response.data] } : item
        )
      );
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }, [currentUser]);

  const handleDeleteComment = useCallback(async (itemId, commentId) => {
    // 백엔드 API가 구현되면 여기에 댓글 삭제 로직을 추가하세요
    console.log('Delete comment', itemId, commentId);
  }, []);

  const i18nStrings = {
    // 필요한 i18n 문자열을 여기에 추가하세요
  };

  return (
    <Container
      header={
        <Header variant="h2" description="게시판">
          게시판
        </Header>
      }
    >
      <Board
        renderItem={item => (
          <BoardItem
            key={item.bidx}
            header={<Header>{item.title || 'No Title'}</Header>}
            i18nStrings={i18nStrings}
          >
            <div>
              {item.content || 'No Content'}
              {currentUser === item.username && (
                <>
                  <Button onClick={() => handleDelete(item.bidx)}>Delete</Button>
                </>
              )}
              <CommentSection
                comments={item.comments || []}
                onAddComment={(content) => handleAddComment(item.bidx, content)}
                onDeleteComment={(commentId) => handleDeleteComment(item.bidx, commentId)}
                currentUser={currentUser}
              />
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Button onClick={() => handleLike(item.bidx)} variant="icon" iconName="thumbs-up-filled" />
                <span>{item.likes || 0}</span>
                <Button onClick={() => handleDislike(item.bidx)} variant="icon" iconName="thumbs-down-filled" />
                <span>{item.dislikes || 0}</span>
              </div>
            </div>
          </BoardItem>
        )}
        items={items}
        i18nStrings={i18nStrings}
      />
    </Container>
  );
}

export default BoardContainer;