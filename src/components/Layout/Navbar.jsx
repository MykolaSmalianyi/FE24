import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../common/Button';
import style from './Navbar.module.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className={style.header}>
            <div>
                <h1 className={style.logo}>Скорочувач URL</h1>
                <div>
                    {user ? (
                        <Button text="Вийти" onClick={handleLogout} />
                    ) : location.pathname === '/login' ? (
                        <Button text="Реєстрація" onClick={() => navigate('/register')} />
                    ) : location.pathname === '/register' ? (
                        <Button text="Увійти" onClick={() => navigate('/login')} />
                    ) : (
                        <Button text="Увійти" onClick={() => navigate('/login')} />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;