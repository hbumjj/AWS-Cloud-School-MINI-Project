import React, { useState } from 'react';
import { Button, Input, SpaceBetween, Box } from '@cloudscape-design/components';

function CommentSection({ comments, onAddComment, onDeleteComment, currentUser }) {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <Box>
      <h4>Comments</h4>
      {comments.map((comment, index) => (
        <Box key={index} padding="s" variant="p">
          <SpaceBetween direction="vertical" size="xs">
            <div>{comment.content}</div>
            <div>
              <small>
                By {comment.username} on {new Date(comment.timestamp).toLocaleString()}
              </small>
              {currentUser === comment.username && (
                <Button onClick={() => onDeleteComment(comment.id)} variant="link">
                  Delete
                </Button>
              )}
            </div>
          </SpaceBetween>
        </Box>
      ))}
      <SpaceBetween direction="vertical" size="s">
        <Input
          value={newComment}
          onChange={(event) => setNewComment(event.detail.value)}
          placeholder="Add a comment..."
        />
        <Button onClick={handleAddComment}>Add Comment</Button>
      </SpaceBetween>
    </Box>
  );
}

export default CommentSection;