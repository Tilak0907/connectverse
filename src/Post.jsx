import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  // Fetch all posts from the server
  useEffect(() => {
    console.log("Fetching posts...");
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get('http://localhost:3001/images')
      .then(response => {
        console.log("Posts fetched successfully:", response.data);
        setPosts(response.data);
        setError(null); // Clear any previous error
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts. Please try again later.");
      });
  };

  // Handle file upload
  const handleUpload = () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    axios
      .post('http://localhost:3001/upload', formData)
      .then(res => {
        console.log('Upload successful:', res);
        setFile(null); // Clear the file input
        fetchPosts(); // Refresh posts
      })
      .catch(err => {
        console.error('Error uploading file:', err);
        setError("Upload failed. Please try again.");
      });
  };

  // Handle like button click
  const handleLike = id => {
    console.log("Liking post with ID:", id);
    axios
      .post(`http://localhost:3001/like/${id}`)
      .then(() => {
        setPosts(posts.map(post => (post._id === id ? { ...post, likes: post.likes + 1 } : post)));
      })
      .catch(err => {
        console.error("Error liking post:", err);
        setError("Failed to like the post. Please try again.");
      });
  };

  // Handle comment submission
  const handleComment = id => {
    if (comment.trim()) {
      console.log("Adding comment to post ID:", id);
      axios
        .post(`http://localhost:3001/comment/${id}`, { comment })
        .then(() => {
          setPosts(posts.map(post => (post._id === id ? { ...post, comments: [...post.comments, comment] } : post)));
          setComment(''); // Clear the comment input
        })
        .catch(err => {
          console.error("Error adding comment:", err);
          setError("Failed to add comment. Please try again.");
        });
    } else {
      alert("Comment cannot be empty.");
    }
  };

  
  return (
    
    <div className="app" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Image Gallery</h1>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Upload Section */}
      <div className="upload-container" style={{ marginBottom: '20px' }}>
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          style={{ marginBottom: '10px' }}
        />
        <button onClick={handleUpload} style={{ padding: '10px 15px', cursor: 'pointer' }}>
          Upload
        </button>
      </div>

      {/* Display Posts */}
      {posts.length === 0 ? (
        <p>No posts available. Upload an image to get started!</p>
      ) : (
        <div className="image-gallery" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {posts.map(post => (
            <div
              key={post._id}
              className="image-card"
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '8px',
                width: '300px',
                textAlign: 'center',
              }}
            >
              <img
                src={`http://localhost:3001/${post.imageUrl}`}
                alt="Post"
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <div className="likes" style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleLike(post._id)}
                  style={{ padding: '5px 10px', cursor: 'pointer', marginRight: '10px' }}
                >
                  Like
                </button>
                <span>{post.likes} likes</span>
              </div>
              <div className="comments" style={{ marginTop: '10px', textAlign: 'left' }}>
                <h4>Comments:</h4>
                {post.comments.length > 0 ? (
                  post.comments.map((comment, index) => <p key={index}>{comment}</p>)
                ) : (
                  <p>No comments yet.</p>
                )}
                <div style={{ display: 'flex', marginTop: '10px' }}>
                  <input
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    style={{ flex: '1', marginRight: '10px', padding: '5px' }}
                  />
                  <button onClick={() => handleComment(post._id)} style={{ padding: '5px 10px' }}>
                    Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
