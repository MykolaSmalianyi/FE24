import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import Input from '../common/Input';
import styles from './Auth.module.css';

const Register = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' , full_name: ''});
    const [error, setError] = useState('');
    const [reg_success, setRegSuccess] = useState('');
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        setRegSuccess(false);
        e.preventDefault();
        try {
            await register(credentials.username, credentials.password, credentials.full_name);
            setRegSuccess(true);
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.detail || 'Registration failed');
        }
    };

    return (
        <div>
            <h1>Реєстрація</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    type="text"
                    placeholder="Повне ім'я"
                    value={credentials.full_name}
                    onChange={(e) => setCredentials({ ...credentials, full_name: e.target.value })}
                    required
                />
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
                {error && <div className={styles.error}>{error === 'Registration failed' ? 'Помилка реєстрації' : error}</div>}
                {reg_success && <div className={styles.success}>Акаунт створено</div>}
                <Button text="Зареєструватися" type="submit" />
            </form>
        </div>
    );
};

export default Register;