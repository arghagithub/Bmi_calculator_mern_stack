import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
    const { showalert } = props;
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost/api/auth/signup", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                    "auth-admintoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY0ODk0MWI4NTMxYTNjOWYxNDEyMjU3ZSJ9LCJpYXQiOjE2ODY3MTg1NjB9.Nf3zzCpm3tKC1QvXsPYZyWZsDKHTK6Ku5F6TIMmUCCk"
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
            });

            const result = await response.json();
            if (result.success) {
                showalert("Account is created successfully", "success");
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
            else {
                showalert("Sorry, something went wrong", "error");
                setTimeout(() => {
                    setCredentials({
                        name: "",
                        email: "",
                        password: "",
                        cpassword: ""
                    })
                }, 1500);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <div className='container my-5' style={{ width: '70%' }}>
            <h3>Please create an account to use BMI Calculator</h3>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={handleChange} name='name' value={credentials.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={handleChange} name='email' value={credentials.email} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={handleChange} id="password" value={credentials.password} name='password' />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={handleChange} id="cpassword" value={credentials.cpassword} name='cpassword' />
                </div>
                <button type="submit" disabled={credentials.name === '' || credentials.email === '' || credentials.password !== credentials.cpassword || credentials.password === ''} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
