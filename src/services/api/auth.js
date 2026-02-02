export const getUserDataByToken = (networker, accessToken) => {
  return networker.get('auth/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const refreshAccessToken = (networker, refreshToken) => {
  return networker.post('auth/refresh', { refreshToken });
};

export const loginUser = (networker, username, password) => {
  return networker.post('auth/login', { username, password });
};