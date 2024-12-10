import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setHasSearched(true);
    try {
      const response = await axios.get(`http://localhost:3001/search?name=${searchTerm}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleFollow = (userId) => {
    axios
      .post('http://localhost:3001/follow', { userId }, { withCredentials: true })
      .then(() => {
        setResults((prevResults) =>
          prevResults.map((user) =>
            user._id === userId ? { ...user, isFollowing: true } : user
          )
        );
      })
      .catch((error) => {
        console.error('Error following user:', error);
      });
  };

  const handleUnfollow = (userId) => {
    axios
      .post('http://localhost:3001/unfollow', { userId }, { withCredentials: true })
      .then(() => {
        setResults((prevResults) =>
          prevResults.map((user) =>
            user._id === userId ? { ...user, isFollowing: false } : user
          )
        );
      })
      .catch((error) => {
        console.error('Error unfollowing user:', error);
      });
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setResults([]);
      setHasSearched(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Users</h1>
      <input
        type="text"
        placeholder="Enter a name to search..."
        value={searchTerm}
        onChange={handleInputChange}
        style={{ padding: '8px', width: '300px' }}
      />
      <button onClick={handleSearch} style={{ padding: '8px', marginLeft: '10px' }}>
        Search
      </button>
      <div style={{ marginTop: '20px' }}>
        {results.length > 0 ? (
          <ul>
            {results.map((user) => (
              <li key={user._id}>
                {user.name}
                {user.isFollowing ? (
                  <button onClick={() => handleUnfollow(user._id)}>Unfollow</button>
                ) : (
                  <button onClick={() => handleFollow(user._id)}>Follow</button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          hasSearched && <p>No user found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
