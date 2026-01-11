import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

    if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav className="navbar" style={{ marginTop: '20px' }}>
            <h1 className="logo"><Link to="/dashboard">Smart Campus</Link></h1>
            <div className="nav-links">
                <Link to="/notices">Notices</Link>
                <Link to="/lost-found">Lost & Found</Link>
                <Link to="/buses">Transport</Link>
                <Link to="/events">Events</Link>
                <Link to="/complaints">Complaints</Link>

                <button className="glass-btn" style={{ marginLeft: '20px', background: 'rgba(255,50,50,0.5)' }} onClick={onLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
