import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         navigate('/home');
    //     }
    // }, [navigate]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        if (!email || !pass || !name) {
            alert("One or more fields are empty!");
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/createuser', {
                    name,
                    email,
                    password: pass
                }, {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    }
                });
                
                const { data } = response;
                if (data.success) {
                    localStorage.setItem('token', data.authToken);
                    navigate('/home');
                } else {
                    alert("An account with this email already exists!");
                }
            } catch (error) {
                console.error("There was an error!", error);
                alert("An error occurred while creating your account.");
            }
        }
    };

    return (
        <div className="flex items-center min-h-screen bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto bg-slate-300 rounded-lg shadow-xl">
                <div className="flex flex-col md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img className="object-cover w-full h-full" src="https://source.unsplash.com/user/erondu/1600x900" alt="img" />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <form className="w-full" onSubmit={submit}>
                            <div className="flex justify-center">
                                <img src='./login.png' height='30' width='30' alt="login icon" />
                            </div>
                            <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                                Sign up
                            </h1>
                            <div>
                                <label className="block text-sm">
                                    Name
                                </label>
                                <input type="text"
                                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    placeholder="Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm">
                                    Email
                                </label>
                                <input type="email"
                                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label className="block mt-4 text-sm">
                                    Password
                                </label>
                                <input
                                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    placeholder="Password" type="password" onChange={(e) => setPass(e.target.value)} />
                            </div>
                            <button
                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                                type="submit">
                                Sign up
                            </button>

                            <div className="mt-4 text-center">
                                <p className="text-sm">Already have an account? <a href="/"
                                    className="text-blue-600 hover:underline"> Log in.</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
