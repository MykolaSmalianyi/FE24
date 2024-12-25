import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            authAPI.getMe()
                .then(response => setUser(response.data))
                .catch(() => localStorage.removeItem('access_token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        const response = await authAPI.login(username, password);
        if (response.status === 200) {
            localStorage.setItem('access_token', response.data.access_token);
            const userResponse = await authAPI.getMe();
            setUser(userResponse.data);
            return response;
        }
        throw new Error('Login failed');
    };

    const register = async (username, password, full_name) => {
        const response = await authAPI.register(username, password, full_name);
        if(response.status === 201) {
            return response;
        }
        throw new Error('Registration failed');
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);