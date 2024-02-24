import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();
    const [Info, setInfo] = useState({ name: "", email: "", password: "", geolocation: "" });

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/creatuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: Info.name, email: Info.email, password: Info.password, location: Info.geolocation })
        });
        const temp = await response.json();
        // console.log(temp);
        if (temp.success) { 
            navigate("/login"); 
        } else {
            alert("Enter valid credentials");
        }
    }

    const OnChange = (event) => {
        setInfo({ ...Info, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className='signup m-4'>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={Info.name} onChange={OnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={Info.email} onChange={OnChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={Info.password} onChange={OnChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="geolocation" className="form-label">Location</label>
                        <input type="text" className="form-control" id="geolocation" name="geolocation" value={Info.location} onChange={OnChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Login</Link>
                </form>
            </div>
        </>
    );
}
