import ax from './axios.config';

const createProgram = async (payload) => {
  try {
    return await ax.post('programs/', payload);
  } catch (error) {
    return error;
  }
};

const getPrograms = async () => {
  const res = await ax.get('programs/');
  return res.data;
};

const getEnrollments = async () => {
  const res = await ax.get('enrollments/');
  return res.data;
};

const updateStatus = async (id, payload) => {
  try {
    return await ax.patch(`enrollments/${id}/`, payload);
  } catch (error) {
    return error;
  }
};

const registerProgram = async (id) => {
  try {
    return await ax.get(`register/${id}/`);
  } catch (error) {
    return error;
  }
};

const programAPI = { createProgram, getPrograms, getEnrollments, updateStatus, registerProgram };

export default programAPI;
