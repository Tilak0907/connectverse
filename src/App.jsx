import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Home from './Home_Page';
import Search from './Search';
import ProfilePage from './Profile'; // Import ProfilePage
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Post from './Post';
import Sample from './Sample'; // Import the Sample component'
import UpdateProfile from './UpdateProfile'; // Import the UpdateProfile component
import Chat from './Chat'


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/profile', { withCredentials: true })
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/profile' element={<ProfilePage isAuthenticated={isAuthenticated} />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path='/posts' element={<Post />} /> {/* New route for the Post component */}
                <Route path='/sample' element={<Sample />} /> {/* Route for the Sample component */}
                <Route path="/update-profile" element={<UpdateProfile />} />
                {/*Chat moudule page redirect*/}
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
