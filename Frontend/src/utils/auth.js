export const getToken = () => {
  return localStorage.getItem('token');
};

export const getRole = () => {
  return localStorage.getItem('role');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const setRole = (role) => {
  localStorage.setItem('role', role);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const removeRole = () => {
  localStorage.removeItem('role');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const isAdmin = () => {
  return getRole() === 'admin';
};
