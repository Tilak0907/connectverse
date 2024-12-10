import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Reset message

        try {
            // Sending POST request to the backend for password reset
            const response = await axios.post("http://localhost:3001/forgot-password", { email });
            setMessage(response.data.message || "Password reset email sent successfully.");
        } catch (err) {
            console.error("Error in Forgot Password:", err.response?.data || err.message);
            setMessage(err.response?.data?.error || "An error occurred. Please try again later.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-0">
                        Reset Password
                    </button>
                </form>
                {message && <p className="mt-3 text-center">{message}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;
