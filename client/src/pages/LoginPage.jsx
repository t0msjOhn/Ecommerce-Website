import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await loginUser({ email, password });
            login(response.data);
            navigate('/profile');
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid email or password.');
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form> 
            <div className="mt-4">
                <p className='mb-4'>Don't have an account?</p>
                <Link to="/signup" className="bg-green-600 text-white py-2 px-4 my-10 rounded">
                    Signup
                </Link>
            </div>           
        </div>
    );
};

export default LoginPage;
