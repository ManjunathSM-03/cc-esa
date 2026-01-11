import React, { useEffect, useState } from 'react';
import API from '../api';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', date: '', venue: '', organizer: '' });
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await API.get('/events');
            setEvents(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/events', formData);
            setFormData({ title: '', description: '', date: '', venue: '', organizer: '' });
            fetchEvents();
        } catch (error) {
            alert('Error adding event');
        }
    };

    const deleteEvent = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await API.delete(`/events/${id}`);
                fetchEvents();
            } catch (error) {
                alert('Error deleting event');
            }
        }
    };

    return (
        <div className="page-container">
            <h2 style={{ marginBottom: '20px' }}>Upcoming Events</h2>

            {user.role === 'admin' && (
                <div className="glass-card" style={{ marginBottom: '2rem' }}>
                    <h3>Add New Event</h3>
                    <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="Event Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        <input
                            type="date"
                            className="glass-input"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                            style={{ color: 'white-scheme' }}
                        />
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="Venue"
                            value={formData.venue}
                            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            className="glass-input"
                            placeholder="Organizer"
                            value={formData.organizer}
                            onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                        />
                        <textarea
                            className="glass-input"
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            style={{ gridColumn: '1 / -1' }}
                        ></textarea>
                        <button type="submit" className="glass-btn" style={{ gridColumn: '1 / -1' }}>Add Event</button>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {events.map((event) => (
                    <div key={event._id} className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <h3 style={{ margin: '0 0 10px 0', color: 'var(--secondary-color)' }}>{event.title}</h3>
                                <p style={{ marginBottom: '10px' }}>{event.description}</p>
                                <p style={{ fontSize: '0.9rem' }}>📅 {new Date(event.date).toDateString()} | 📍 {event.venue}</p>
                                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Organized by: {event.organizer || 'College'}</p>
                            </div>
                            {user.role === 'admin' && (
                                <div>
                                    <button className="glass-btn" style={{ background: 'red', padding: '5px 10px', fontSize: '0.8rem' }} onClick={() => deleteEvent(event._id)}>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
