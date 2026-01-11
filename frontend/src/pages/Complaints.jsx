import React, { useEffect, useState } from 'react';
import API from '../api';

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const res = await API.get('/complaints');
            setComplaints(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/complaints', formData);
            setFormData({ title: '', description: '' });
            fetchComplaints();
            alert('Complaint submitted successfully');
        } catch (error) {
            alert('Error submitting complaint');
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/complaints/${id}`, { status });
            fetchComplaints();
        } catch (error) {
            alert('Error updating status');
        }
    };

    return (
        <div className="page-container">
            <h2 style={{ marginBottom: '20px' }}>Complaint Box</h2>

            {user.role === 'student' && (
                <div className="glass-card" style={{ marginBottom: '2rem' }}>
                    <h3>Submit a Complaint</h3>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="Title / Subject"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        <textarea
                            className="glass-input"
                            placeholder="Describe your issue..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                        <button type="submit" className="glass-btn">Submit Complaint</button>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                <h3 style={{ marginTop: '20px' }}>{user.role === 'admin' ? 'All Complaints' : 'My Complaints'}</h3>
                {complaints.length === 0 && <p>No complaints found.</p>}

                {complaints.map((complaint) => (
                    <div key={complaint._id} className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ margin: '0 0 10px 0' }}>{complaint.title}</h3>
                                <p style={{ marginBottom: '10px' }}>{complaint.description}</p>
                                <div style={{ fontSize: '0.9rem', color: '#ccc' }}>
                                    <span>Status: </span>
                                    <span style={{
                                        color: complaint.status === 'resolved' ? '#2ecc71' : '#e74c3c',
                                        fontWeight: 'bold', textTransform: 'uppercase'
                                    }}>
                                        {complaint.status}
                                    </span>
                                    <span style={{ marginLeft: '15px' }}>📅 {new Date(complaint.date).toLocaleDateString()}</span>
                                    {user.role === 'admin' && (
                                        <p style={{ marginTop: '5px' }}>From: {complaint.user?.name} ({complaint.user?.email})</p>
                                    )}
                                </div>
                            </div>

                            {user.role === 'admin' && complaint.status === 'pending' && (
                                <button
                                    className="glass-btn"
                                    style={{ background: '#2ecc71', fontSize: '0.8rem' }}
                                    onClick={() => updateStatus(complaint._id, 'resolved')}
                                >
                                    Mark Resolved
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Complaints;
