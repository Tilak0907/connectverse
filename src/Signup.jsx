import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [bio, setBio] = useState("");
    const [bioWordCount, setBioWordCount] = useState(0);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (file && allowedTypes.includes(file.type)) {
            setProfilePicture(file);
        } else {
            toast.error("Please upload a valid image file (JPEG, PNG, or GIF).");
        }
    };

    const validatePassword = (password) => /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);

    const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

    const handlePasswordBlur = () => {
        if (!validatePassword(password)) {
            toast.error("Password must be at least 8 characters long, include a number and a special character.");
        }
    };

    const handleEmailBlur = () => {
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !profilePicture || !bio) {
            toast.error("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profilePicture", profilePicture);
        formData.append("bio", bio);

        try {
            await axios.post("http://localhost:3001/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });
            toast.success("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            toast.error(err.response ? err.response.data.error : "An error occurred. Please try again.");
        }
    };

    return (
        <div className="signup-container vh-100 d-flex align-items-center">
            <ToastContainer />
            <div className="row w-100">
                <div className="signup-left-col col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <img
                        src="../pic.png"
                        alt="ConnectVerse Logo"
                        className="signup-logo rounded-circle"
                        style={{ width: "100px", height: "100px", border: "3px solid #ff007f" }}
                    />
                    <h1 className="signup-title mt-4">ConnectVerse</h1>
                    <h2 className="signup-subtitle text-muted mt-2 text-center">A platform to connect thoughts</h2>
                </div>
                <div className="signup-right-col col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="signup-card card card-custom w-75">
                        <h2 className="signup-card-title text-center mb-4">Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="signup-form-label form-label">Name</label>
                                <input
                                    type="text"
                                    className="signup-form-control form-control"
                                    id="name"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="signup-form-label form-label">Email</label>
                                <input
                                    type="email"
                                    className="signup-form-control form-control"
                                    id="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={handleEmailBlur}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="signup-form-label form-label">Password</label>
                                <p>The Password must be 8 characters with 1 special character</p>
                                <input
                                    type="password"
                                    className="signup-form-control form-control"
                                    id="password"
                                    placeholder="Enter Your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={handlePasswordBlur}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="profilePicture" className="signup-form-label form-label">Profile Picture</label>
                                <input
                                    type="file"
                                    className="signup-form-control form-control"
                                    id="profilePicture"
                                    placeholder="Upload your profile picture"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bio" className="signup-form-label form-label">Bio</label>
                                <textarea
                                    className="signup-form-control form-control"
                                    id="bio"
                                    placeholder="Write a short bio about yourself (max 100 words)"
                                    rows="3"
                                    value={bio}
                                    onChange={(e) => {
                                        setBio(e.target.value);
                                        setBioWordCount(e.target.value.trim().split(/\s+/).length);
                                    }}
                                />
                                <small className="signup-bio-word-count text-muted">{bioWordCount}/100 words</small>
                            </div>
                            <button type="submit" className="signup-btn-primary btn btn-primary w-100">Register</button>
                        </form>
                        <p className="signup-login-link mt-3 text-center">
                            Already Have an Account?{" "}
                            <Link to="/login" className="signup-login-btn btn btn-secondary text-center">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
