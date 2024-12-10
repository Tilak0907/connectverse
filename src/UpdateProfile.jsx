import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './UpdateProfile.css'; // Uncomment if styles are available

const UpdateProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: '',
    profilePicture: ''
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  // Fetch the current user details on component mount
  useEffect(() => {
    axios
      .get('http://localhost:3001/profile', { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  // Handle input changes for name, email, and bio
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    axios
      .post('http://localhost:3001/upload-profile-picture', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        console.log('Profile picture updated:', response.data);
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: response.data.profilePicture
        }));
      })
      .catch((error) => {
        console.error('Error uploading profile picture:', error);
      });
  };

  // Handle form submission for updating profile details
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:3001/update-profile', user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then(() => {
        alert('Profile updated successfully!');
        window.location.href = '/profile'; // Redirect to the profile page
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      });
  };

  return (
    <div className="updateProfile-wrapper">
      <h1>Update Profile</h1>
      <form onSubmit={handleFormSubmit} className="updateProfile-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Bio:
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleInputChange}
          />
        </label>

        {/* Profile picture change */}
        <label htmlFor="profilePictureInput" className="profilePicture-label">
          Change Profile Picture
        </label>
        <input
          type="file"
          id="profilePictureInput"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />
        <br />

        <button type="submit" className="updateProfile-submitButton">
          Save Changes
        </button>
      </form>

      <div className="updateProfile-currentPicture">
        <h2>Current Profile Picture</h2>
        <img
          src={`http://localhost:3001/${user.profilePicture}`}
          alt="Current Profile"
          className="updateProfile-picture"
        />
      </div>
    </div>
  );
};

export default UpdateProfile;
