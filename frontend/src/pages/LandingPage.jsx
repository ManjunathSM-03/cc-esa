import React from 'react';
import { Link } from 'react-router-dom';
import { FaBullhorn, FaSearch, FaBus } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#020617',
            color: 'white',
            fontFamily: "'Outfit', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Gradients */}
            <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }}></div>

            {/* Public Navbar */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 40px',
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    <div style={{ background: '#3B82F6', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>SC</div>
                    <span>SmartCampus</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    <Link to="/" style={{ color: '#94A3B8', fontWeight: '500' }}>Home</Link>
                    <Link to="/login" style={{ color: '#94A3B8', fontWeight: '500' }}>Login</Link>
                    <Link to="/register" style={{
                        background: '#3B82F6',
                        color: 'white',
                        padding: '10px 24px',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                    }}>
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '0 20px',
                marginTop: '40px',
                zIndex: 10
            }}>
                <div style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    color: '#60A5FA',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    marginBottom: '2rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span style={{ width: '8px', height: '8px', background: '#60A5FA', borderRadius: '50%' }}></span>
                    Smart Campus Helper v1.0
                </div>

                <div style={{
                    background: '#3B82F6',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    margin: '0 auto 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    boxShadow: '0 0 40px rgba(59, 130, 246, 0.4)'
                }}>
                    SC
                </div>

                <h1 style={{
                    fontSize: '4rem',
                    fontWeight: '700',
                    marginBottom: '1.5rem',
                    lineHeight: '1.1',
                    letterSpacing: '-1px'
                }}>
                    Manage smarter.<br />
                    <span style={{
                        background: 'linear-gradient(to right, #4ADE80, #3B82F6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>Live better with SmartCampus.</span>
                </h1>

                <p style={{
                    fontSize: '1.25rem',
                    color: '#94A3B8',
                    marginBottom: '3rem',
                    lineHeight: '1.6',
                    maxWidth: '650px',
                    fontWeight: '300'
                }}>
                    Cloud-powered campus management tailored for students & faculty.
                    Connect notices, buses, and events — all in one clean dashboard.
                </p>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '5rem' }}>
                    <Link to="/register" style={{
                        background: '#10B981',
                        color: '#020617',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        transition: 'transform 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }} className="hover-scale">
                        Get started free <span>→</span>
                    </Link>
                    <Link to="/login" style={{
                        background: 'transparent',
                        border: '1px solid #334155',
                        color: 'white',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        transition: 'all 0.2s'
                    }}>
                        Sign in to your account
                    </Link>
                </div>
            </div>

            {/* Feature Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 2fr))',
                gap: '20px',
                maxWidth: '1000px',
                width: '100%',
                margin: '0 auto',
                justifyContent: 'center'
            }}>
                <FeatureCard
                    icon={<FaBullhorn color="#4ADE80" />}
                    title="Real-time Notices"
                    desc="Instant updates on exams, holidays, and important announcements."
                />
                <FeatureCard
                    icon={<FaSearch color="#60A5FA" />}
                    title="Lost & Found"
                    desc="Easily report lost items or find what you've missing across campus."
                />
                <FeatureCard
                    icon={<FaBus color="#F472B6" />}
                    title="Smart Transport"
                    desc="Live bus timings and route details to ensure you never miss a ride."
                />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div style={{
        background: '#0F172A',
        border: '1px solid #1E293B',
        borderRadius: '16px',
        padding: '30px',
        textAlign: 'center',
        transition: 'transform 0.3s ease',
        cursor: 'default'
    }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
        <div style={{
            background: 'rgba(255,255,255,0.05)',
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '20px'
        }}>
            {icon}
        </div>
        <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>{title}</h3>
        <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.5' }}>{desc}</p>
    </div>
);

export default LandingPage;
