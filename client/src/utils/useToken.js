import { useState } from 'react'

const useToken = () => {

    const getToken = () => {
        const token = localStorage.getItem('token');
        return token;
    }

    const [token, setToken] = useState(getToken());

    const saveToken = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    }

    const removeToken = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

  return (
    {setToken: token, saveToken, removeToken}
  )
}

export default useToken