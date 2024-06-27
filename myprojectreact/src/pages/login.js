import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './login.css'

import logo from './img/logos.png'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory(); // Khởi tạo useHistory

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/user/login', { email, password });
            // Xử lý phản hồi thành công ở đây
            console.log(response.data);

            // Chuyển hướng người dùng đến trang /user sau khi đăng nhập thành công
            history.push('/user');
            window.location.reload();
        } catch (error) {
            setError('Email hoặc mật khẩu không chính xác.');
            console.error('Đăng nhập không thành công:', error);
        }
    };

    return (
        <div class="containera">
            <div class="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div class="login-form">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div class="form-group">
                        <label>Mật khẩu:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button class="btnlog" type="submit">Đăng nhập</button><br /><br />

                    <label>Chưa có tài khoản ?<a href='/register' >Đăng ký.</a></label>
                </form>
            </div>

        </div>
    );
}

export default LoginForm;
