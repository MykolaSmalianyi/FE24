import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/URLs/URLList';
import URLStats from './components/URLs/URLStats';
import ProtectedRoute from './components/layout/ProtectedRoute';
import RedirectIfAuthenticated from './components/layout/RedirectIfAuthenticated';
import './styles/global.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Navbar />
                    <main>
                        <Routes>
                            <Route path="/login" element={
                                <RedirectIfAuthenticated>
                                    <Login />
                                </RedirectIfAuthenticated>
                            } />
                            <Route path="/register" element={
                                <RedirectIfAuthenticated>
                                    <Register />
                                </RedirectIfAuthenticated>
                            } />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/stats/:shortCode"
                                element={
                                    <ProtectedRoute>
                                        <URLStats />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;