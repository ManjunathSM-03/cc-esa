import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student', secretCode: '' });
    const { name, email, password, role, secretCode } = formData;
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simple check for admin registration using a secret code
            if (role === 'admin' && secretCode !== 'ADMIN123') {
                return alert('Invalid Admin Secret Code');
            }

            const res = await API.post('/auth/register', { name, email, password, role });
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate('/dashboard');
        } catch (error) {
            console.error('Registration Error:', error);
            alert(error.response?.data?.message || error.message || 'Registration failed');
        }
    };

    return (
        <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', flexDirection: 'column', position: 'relative' }}>
            <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                &larr; Back to Home
            </Link>

            <div className="glass-card" style={{ width: '400px', textAlign: 'center' }}>
                <h2>Create Account</h2>
                <p>Join Smart Campus Helper</p>
                <form onSubmit={onSubmit}>
                    <input type="text" className="glass-input" placeholder="Name" name="name" value={name} onChange={onChange} required />
                    <input type="email" className="glass-input" placeholder="Email" name="email" value={email} onChange={onChange} required />
                    <input type="password" className="glass-input" placeholder="Password" name="password" value={password} onChange={onChange} required />

                    <select className="glass-input" name="role" value={role} onChange={onChange}>
                        <option value="student" style={{ color: 'black' }}>Student</option>
                        <option value="admin" style={{ color: 'black' }}>Admin</option>
                    </select>

                    {role === 'admin' && (
                        <input type="text" className="glass-input" placeholder="Admin Secret Code" name="secretCode" value={secretCode} onChange={onChange} />
                    )}

                    <button type="submit" className="glass-btn" style={{ width: '100%' }}>Register</button>
                </form>
                <p style={{ marginTop: '1rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--secondary-color)' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
