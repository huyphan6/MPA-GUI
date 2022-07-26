import { createContext, useState, useEffect } from 'react';

const TokenContext = createContext(null);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const getToken = () => {
    const userToken = localStorage.getItem('token');
    return userToken ?? undefined;
  }

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(undefined);
  }

  useEffect(() => {
    setToken(getToken());
  }, []);

  return (
    <TokenContext.Provider value={{ token, removeToken, setToken: saveToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export default TokenContext;