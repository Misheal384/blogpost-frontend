import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const blogApi = axios.create({
  baseURL: API_URL,
});

// Utility to get token and attach it to all requests
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Optionally, handle cases where there's no token (redirect user to login, etc.)
    console.error('No token found');
    return {};  // Return empty headers if no token
  }

  return { Authorization: `Bearer ${token}` };
};

console.log(localStorage.getItem('token')); 

// Existing API functions with token included in headers
export const getPosts = () => blogApi.get('/posts', { headers: getAuthHeaders() });
export const getPost = (id) => blogApi.get(`/posts/${id}`, { headers: getAuthHeaders() });
export const createPost = (post) => blogApi.post('/posts', post, { headers: getAuthHeaders() });
export const updatePost = (id, post) => blogApi.put(`/posts/${id}`, post, { headers: getAuthHeaders() });
export const deletePost = (id) => blogApi.delete(`/posts/${id}`, { headers: getAuthHeaders() });
export const searchPosts = (title) => blogApi.get(`/posts/search?title=${title}`, { headers: getAuthHeaders() });

// New function: Get user's posts
export const getMyPosts = () => {
  return blogApi.get('/my-posts', { headers: getAuthHeaders() });
};

export default blogApi;
