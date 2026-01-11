import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) return <div>Loading...</div>;

    return (
        <div className="page-container">
            <h2 style={{ marginBottom: '2rem' }}>Welcome, {user.name}! ({user.role})</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <Link to="/notices" className="glass-card" style={{ display: 'block', borderLeft: '4px solid #f39c12' }}>
                    <h3>📢 Notices</h3>
                    <p>Check the latest announcements.</p>
                </Link>
                <Link to="/lost-found" className="glass-card" style={{ display: 'block', borderLeft: '4px solid #e74c3c' }}>
                    <h3>🔍 Lost & Found</h3>
                    <p>Report or find lost items.</p>
                </Link>
                <Link to="/buses" className="glass-card" style={{ display: 'block', borderLeft: '4px solid #2ecc71' }}>
                    <h3>🚌 Bus Timings</h3>
                    <p>View transport schedules.</p>
                </Link>
                <Link to="/events" className="glass-card" style={{ display: 'block', borderLeft: '4px solid #9b59b6' }}>
                    <h3>📅 Events</h3>
                    <p>Upcoming campus events.</p>
                </Link>
                <Link to="/complaints" className="glass-card" style={{ display: 'block', borderLeft: '4px solid #3498db' }}>
                    <h3>📨 Complaint Box</h3>
                    <p>Submit or track complaints.</p>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
