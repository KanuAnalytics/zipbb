import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure this matches your Express route
});

export const uploadZipbbFile = (formData) => {
  return api.post('/upload-zipbb', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
