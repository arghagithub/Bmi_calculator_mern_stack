import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const { showalert } = props;
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost/api/auth/login", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });

            const result = await response.json();
            if (result.success) {
                localStorage.setItem('userlogintoken', result.userlogintoken);
                showalert("Logged in successfully", "success");
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
            else {
                showalert("Wrong user credentials", "error");
                setTimeout(() => {
                    setCredentials({
                        email: "",
                        password: ""
                    })
                }, 1000);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <div className='container my-5' style={{ width: '70%' }}>
            <h3>Please loggin with correct credentials</h3>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={handleChange} name='email' value={credentials.email} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={handleChange} id="password" value={credentials.password} name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

    )
}

export default Login
