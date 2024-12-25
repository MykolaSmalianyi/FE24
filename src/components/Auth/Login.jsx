import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import Input from '../common/Input';
import styles from './Auth.module.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials.username, credentials.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed');
        }
    };

    return (
        <div>
            <h2>Увійти</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    type="text"
                    placeholder="Логін"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    required
                />
                <Input
                    type="password"
                    placeholder="Пароль"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                />
                {error && <div className={styles.error}>{error === 'Login failed' ? 'Помилка входу' : error}</div>}
                <Button text="Увійти" type="submit" />
            </form>
        </div>
    );
};

export default Login;