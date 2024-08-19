import React, { useState } from 'react';// usestate use in functional componnets


function Login({ setAuth }) { // send setauth as a prop .....  that will be used to update the authentication state in the parent component.
    const [email, setEmail] = useState('user@test.com');
    const [password, setPassword] = useState('user123');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === 'user@test.com' && password === 'user123') {
            setAuth(true);
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className='login'>
            <div className="container">
                <div className="login-box">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="textbox">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="textbox">
                            <label htmlFor="password">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div class="form-check">
                                <input class="form-check-input" checked={showPassword}
                                    onChange={() => setShowPassword(!showPassword)} type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Show Password
                                </label>
                            </div>

                        </div>
                        <button type="submit" className="btn">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
