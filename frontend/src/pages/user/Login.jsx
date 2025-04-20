import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Login.css';
import { UserContext } from '../../../context/userContext';

function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        //console.log('Logging in with:', { email, password });
        await axios.post('http://localhost:5000/api/user/login', { email, password }, { withCredentials: true })
            .then((response) => {
                setUser(response.data.user)
                if (response.data.user.role === "admin") {
                    navigate("/admin/dashboard")
                } else {
                    navigate("/")
                }
            })
            .catch((error) => {
                alert(error.response.data.message)
            })
    };


    return (
        <div className="login-page">
            <div className="login-box">
                <h2>CineGo</h2>
                <p className="subtitle">Please sign in to your account</p>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            name='email'
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            name='password'
                        />
                    </div>
                    <button type="submit" className='login-button'>Login</button><br />
                    <p className="switch-link-login">
                        Create new account? <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
