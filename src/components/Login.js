import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            navigate("/")
        }
        else {
            alert("Invalid credentials")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h2>Login to Save your Notes!!</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-2">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-outline-danger my-2" >Submit</button>
            </form>
        </div>
    )
}

export default Login
