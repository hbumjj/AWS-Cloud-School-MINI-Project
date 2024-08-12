import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchBoardItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/board`, { withCredentials: true });
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching board items:', error);
    return [];
  }
};

export const createBoardItem = async (item) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/board`, item, { withCredentials: true });
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error creating board item:', error);
    throw error;
  }
};

export const updateBoardItem = (item) => axios.put(`${API_BASE_URL}/api/board/${item.bidx}`, item, { withCredentials: true });

export const deleteBoardItem = async (bIdx) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/board/${bIdx}`, { withCredentials: true });
  } catch (error) {
    console.error('Error deleting board item:', error);
    throw error;
  }
};

export const addComment = async (boardId, content, username) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/comment`, { boardId, content, username }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const likeItem = async (itemId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/board/${itemId}/like`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error liking item:', error);
    throw error;
  }
};

export const dislikeItem = async (itemId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/board/${itemId}/dislike`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error disliking item:', error);
    throw error;
  }
};