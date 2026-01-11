import React, { useEffect, useState } from 'react';
import API from '../api';

const BusTimings = () => {
    const [buses, setBuses] = useState([]);
    const [formData, setFormData] = useState({ route: '', busNumber: '', time: '', driverName: '', driverContact: '' });
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchBuses();
    }, []);

    const fetchBuses = async () => {
        try {
            const res = await API.get('/buses');
            setBuses(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/buses', formData);
            setFormData({ route: '', busNumber: '', time: '', driverName: '', driverContact: '' });
            fetchBuses();
        } catch (error) {
            alert('Error adding bus');
        }
    };

    const deleteBus = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await API.delete(`/buses/${id}`);
                fetchBuses();
            } catch (error) {
                alert('Error deleting bus');
            }
        }
    };

    return (
        <div className="page-container">
            <h2 style={{ marginBottom: '20px' }}>Bus Timings</h2>

            {user.role === 'admin' && (
                <div className="glass-card" style={{ marginBottom: '2rem' }}>
                    <h3>Add New Bus</h3>
                    <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="Route Name"
                            value={formData.route}
                            onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="Bus Number"
                            value={formData.busNumber}
                            onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="Time (e.g. 08:00 AM)"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="Driver Name"
                            value={formData.driverName}
                            onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                        />
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="Driver Contact"
                            value={formData.driverContact}
                            onChange={(e) => setFormData({ ...formData, driverContact: e.target.value })}
                        />
                        <button type="submit" className="glass-btn" style={{ gridColumn: '1 / -1' }}>Add Bus</button>
                    </form>
                </div>
            )}

            <div className="glass-card">
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Route</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Bus No</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Time</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Driver</th>
                            {user.role === 'admin' && <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {buses.map((bus) => (
                            <tr key={bus._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <td style={{ padding: '10px' }}>{bus.route}</td>
                                <td style={{ padding: '10px' }}>{bus.busNumber}</td>
                                <td style={{ padding: '10px' }}>{bus.time}</td>
                                <td style={{ padding: '10px' }}>
                                    {bus.driverName} <br />
                                    <small style={{ opacity: 0.7 }}>{bus.driverContact}</small>
                                </td>
                                {user.role === 'admin' && (
                                    <td style={{ padding: '10px' }}>
                                        <button className="glass-btn" style={{ background: 'red', padding: '5px 10px', fontSize: '0.8rem' }} onClick={() => deleteBus(bus._id)}>
                                            X
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BusTimings;
