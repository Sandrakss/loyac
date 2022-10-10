import { store } from '../redux/store';

const setTokenInHeader = (config) => {
  const {
    auth: { user },
  } = store.getState();
  if (config?.headers && user) {
    const excludedUrls = ['accounts/register/', '/accounts/token/'];

    if (config.url && !excludedUrls.includes(config.url)) {
      config.headers.Authorization = `Token ${user.token}`;
    }
  }
  return config;
};

const helpers = {
  setTokenInHeader,
};

export default helpers;
