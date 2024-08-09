import React, { useState } from 'react';
import { Button, Form, FormField, Input } from '@cloudscape-design/components';
import { createBoardItem } from '../api/board'; // 이 경로는 실제 파일 위치에 맞게 조정해야 합니다

function NewItemForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const newItem = { title, content };
      const createdItem = await createBoardItem(newItem);
      onSubmit(createdItem); // 서버에서 반환된 새 항목을 전달
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding new item:', error);
      setError('Failed to add new item. Please try again.');
    }
  };

  return (
    <Form
      header={<h3>Add New Item</h3>}
      actions={
        <>
          <Button variant="link" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
        </>
      }
    >
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <FormField
        label="Title"
        description="Enter the title of the new item"
      >
        <Input
          value={title}
          onChange={(event) => setTitle(event.detail.value)}
        />
      </FormField>
      <FormField
        label="Content"
        description="Enter the content of the new item"
      >
        <Input
          value={content}
          onChange={(event) => setContent(event.detail.value)}
        />
      </FormField>
    </Form>
  );
}

export default NewItemForm;