import axios from 'axios';

const api = axios.create({
  baseURL: '/api' // uses proxy in vite.config.js for dev
});

export const fetchIdeas = async (page = 1, limit = 10, search = '', sort = 'newest') => {
  const params = new URLSearchParams({
    page,
    limit,
    search,
    sort
  });
  const res = await api.get(`/ideas?${params.toString()}`);
  return res.data;
};

export const createIdea = async (ideaData) => {
  const res = await api.post('/ideas', ideaData);
  return res.data;
};

export const upvoteIdea = async (id) => {
  const res = await api.patch(`/ideas/${id}/upvote`);
  return res.data;
};

export const deleteIdea = async (id) => {
  const res = await api.delete(`/ideas/${id}`);
  return res.data;
};
