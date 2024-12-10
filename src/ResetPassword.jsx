import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3001/reset-password/${token}`, { password });
            setMessage(response.data.message);
        } catch (err) {
            console.error("Error:", err.response ? err.response.data : err.message);
            setMessage("Failed to reset password.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>New Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter your new password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Reset Password
                    </button>
                </form>
                {message && <p className="mt-3 text-center">{message}</p>}
            </div>
        </div>
    );
}

export default ResetPassword;
