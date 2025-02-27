import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Replace with your Laravel API URL

export const getSkills = async () => {
    const response = await axios.get(`${API_URL}/skills`);
    return response.data;
};

export const createSkill = async (formData) => {
    const response = await axios.post(`${API_URL}/skills`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set content type for file upload
      },
    });
    return response.data;
  };

export const updateSkill = async (id, skill) => {
    const response = await axios.put(`${API_URL}/skills/${id}`, skill);
    return response.data;
};

export const deleteSkill = async (id) => {
    const response = await axios.delete(`${API_URL}/skills/${id}`);
    return response.data;
};


// project api deploy

export const getProjects = async () => {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
};

export const createProject = async (formData) => {
    const response = await axios.post(`${API_URL}/projects`, formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
        },
    });
    return response.data;
};

export const updateProject = async (id, formData) => {
    const response = await axios.put(`${API_URL}/projects/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Set content type for file upload
        },
    });
    return response.data;
};

export const deleteProject = async (id) => {
    const response = await axios.delete(`${API_URL}/projects/${id}`);
    return response.data;
};