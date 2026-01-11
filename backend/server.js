require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('Smart Campus Helper API is running...');
});

const authRoutes = require('./routes/authRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const lostFoundRoutes = require('./routes/lostFoundRoutes');
const busRoutes = require('./routes/busRoutes');
const eventRoutes = require('./routes/eventRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/lostfound', lostFoundRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/complaints', complaintRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
