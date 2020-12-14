let accessToken = '';

export const getAccessToken = () => {
  return accessToken;
};

// s: String = TOKEN

export const setAccessToken = (s) => {
  accessToken = s;
};

console.log('access_token', accessToken);
