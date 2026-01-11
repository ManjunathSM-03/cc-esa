import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NoticeBoard from './pages/NoticeBoard';
import LostFound from './pages/LostFound';
import BusTimings from './pages/BusTimings';
import Events from './pages/Events';
import Complaints from './pages/Complaints';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notices" element={<NoticeBoard />} />
            <Route path="/lost-found" element={<LostFound />} />
            <Route path="/buses" element={<BusTimings />} />
            <Route path="/events" element={<Events />} />
            <Route path="/complaints" element={<Complaints />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
