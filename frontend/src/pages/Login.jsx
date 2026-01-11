import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', formData);
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column', position: 'relative' }}>
            <Link to="/" style={{ position: 'absolute', top: '0', left: '20px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                &larr; Back to Home
            </Link>

            <div className="glass-card" style={{ width: '400px', textAlign: 'center' }}>
                <h2>Welcome Back</h2>
                <p>Login to Smart Campus Helper</p>
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        className="glass-input"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                    <input
                        type="password"
                        className="glass-input"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                    <button type="submit" className="glass-btn" style={{ width: '100%' }}>Login</button>
                </form>
                <p style={{ marginTop: '1rem' }}>
                    No account? <Link to="/register" style={{ color: 'var(--secondary-color)' }}>Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
