import React, { useEffect, useState } from 'react';
import API from '../api';

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const res = await API.get('/notices');
            setNotices(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/notices', formData);
            setFormData({ title: '', description: '' });
            fetchNotices();
        } catch (error) {
            alert('Error adding notice');
        }
    };

    const deleteNotice = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await API.delete(`/notices/${id}`);
                fetchNotices();
            } catch (error) {
                alert('Error deleting notice');
            }
        }
    };

    return (
        <div className="page-container">
            <h2 style={{ marginBottom: '20px' }}>Notice Board</h2>

            {user.role === 'admin' && (
                <div className="glass-card" style={{ marginBottom: '2rem' }}>
                    <h3>Add New Notice</h3>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        <textarea
                            className="glass-input"
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                        <button type="submit" className="glass-btn">Post Notice</button>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {notices.map((notice) => (
                    <div key={notice._id} className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ margin: '0 0 10px 0', color: 'var(--secondary-color)' }}>{notice.title}</h3>
                                <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>{notice.description}</p>
                                <small style={{ display: 'block', marginTop: '10px', opacity: 0.7 }}>
                                    Posted on: {new Date(notice.date).toLocaleDateString()}
                                </small>
                            </div>
                            {user.role === 'admin' && (
                                <button className="glass-btn" style={{ background: 'red', padding: '5px 10px', fontSize: '0.8rem' }} onClick={() => deleteNotice(notice._id)}>
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoticeBoard;
