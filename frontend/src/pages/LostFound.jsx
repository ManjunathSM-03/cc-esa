import React, { useEffect, useState } from 'react';
import API from '../api';

const LostFound = () => {
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', category: 'lost', contact: '', location: '', image: '' });
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await API.get('/lostfound');
            setItems(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/lostfound', formData);
            setFormData({ title: '', description: '', category: 'lost', contact: '', location: '', image: '' });
            fetchItems();
        } catch (error) {
            alert('Error adding item');
        }
    };

    const deleteItem = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await API.delete(`/lostfound/${id}`);
                fetchItems();
            } catch (error) {
                alert('Error deleting item');
            }
        }
    };

    return (
        <div className="page-container">
            <h2 style={{ marginBottom: '20px' }}>Lost & Found</h2>

            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <h3>Report Lost / Found Item</h3>
                <form onSubmit={onSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input
                        type="text"
                        className="glass-input"
                        placeholder="Item Name"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <select
                        className="glass-input"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        style={{ color: 'black' }}
                    >
                        <option value="lost">Lost</option>
                        <option value="found">Found</option>
                    </select>
                    <input
                        type="text"
                        className="glass-input"
                        placeholder="Location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                    <input
                        type="text"
                        className="glass-input"
                        placeholder="Contact Info (Phone/Email)"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        className="glass-input"
                        placeholder="Image URL (Optional)"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        style={{ gridColumn: '1 / -1' }}
                    />
                    <textarea
                        className="glass-input"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        style={{ gridColumn: '1 / -1' }}
                    ></textarea>
                    <button type="submit" className="glass-btn" style={{ gridColumn: '1 / -1' }}>Post Item</button>
                </form>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {items.map((item) => (
                    <div key={item._id} className="glass-card" style={{ position: 'relative', borderTop: `4px solid ${item.category === 'lost' ? '#ff6b6b' : '#1dd1a1'}` }}>
                        <span style={{
                            position: 'absolute', top: '10px', right: '10px',
                            background: item.category === 'lost' ? '#ff6b6b' : '#1dd1a1',
                            padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'
                        }}>
                            {item.category.toUpperCase()}
                        </span>

                        {item.image && (
                            <img src={item.image} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
                        )}

                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#ccc' }}>
                            <p>📍 {item.location || 'N/A'}</p>
                            <p>📞 {item.contact}</p>
                            <p>🕒 {new Date(item.date).toLocaleDateString()}</p>
                        </div>

                        {(user.role === 'admin' || user._id === item.postedBy) && (
                            <button
                                className="glass-btn"
                                style={{ background: 'red', marginTop: '10px', paddingTop: '5px', paddingBottom: '5px' }}
                                onClick={() => deleteItem(item._id)}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LostFound;
