import ax from './axios.config';

const getToken = async (payload) => {
  try {
    const res = await ax.post('accounts/token/', payload);
    return res;
  } catch (error) {
    return undefined;
  }
};

const registerAccount = async (payload) => {
  try {
    return await ax.post('accounts/register/', payload);
  } catch (error) {
    return error;
  }
};

const authAPI = { getToken, registerAccount };

export default authAPI;
