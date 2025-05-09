// place files you want to import through the `$lib` alias in this folder.
import axios from 'axios';

// Get the Strapi URL from the environment variables
const strapiUrl = 'https://svelte-cms-production.up.railway.app/';

// Create an axios instance with some default settings
export const api = axios.create({
  baseURL: strapiUrl,
  headers: {
    'Content-Type': 'application/json',
  }
});


// Define the API functions

//To fetch all posts from the Strapi API.
export const fetchPosts = async () => {
  try {
    const response = await api.get('/api/posts?populate=*');
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};


//To fetch a single post by its ID from the Strapi API.
export const fetchPostById = async (id) => {
  try {
    const response = await api.get(`/api/posts/${id}?populate=*`);
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    return null;
  }
};


//To create a new post in the Strapi API.
export const createPost = async (data) => {
  try {
    console.log('Creating post with data:', data);
    const response = await api.post('/api/posts', { data });
    return response.data.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

//To update an existing post in the Strapi API.
export const updatePost = async (id, data) => {
  try {
    const response = await api.put(`/api/posts/${id}`, { data });
    return response.data.data;
  } catch (error) {
    console.error(`Error updating post with id ${id}:`, error);
    throw error;
  }
};


//To delete a post from the Strapi API.
export const deletePost = async (id) => {
  try {
    await api.delete(`/api/posts/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting post with id ${id}:`, error);
    throw error;
  }
};