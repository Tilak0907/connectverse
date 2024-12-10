import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Add this import
import './Home.css'; // Ensure the path is correct

const navItems = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'chat', icon: '💬', label: 'Chat' ,path:'/chat'},
  { id: 'profile', icon: '👤', label: 'Profile', path: '/profile'  },
  { id: 'search', icon: '🔍', label: 'Search', path:'/search'},
  { id: 'upload', icon: '⬆️', label: 'Upload', path:'/sample' },
];

function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button
      className={`navbar-link-custom ${isActive ? 'text-primary' : 'text-secondary'} btn-lg`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState([]);
  const [isSticky, setIsSticky] = useState(false);
  const [isVertical, setIsVertical] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // State to toggle mobile menu visibility
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    fetchPosts();
    const handleScroll = () => {
      if (window.scrollY > 100) { // Adjust scroll threshold
        setIsSticky(true);
        setIsVertical(true);
      } else {
        setIsSticky(false);
        setIsVertical(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  window.onscroll = function() {
    if (window.scrollY > 10) {
      document.querySelector('.navbar-custom').classList.add('sticky-nav');
    } else {
      document.querySelector('.navbar-custom').classList.remove('sticky-nav');
    }
  };
  

  const fetchPosts = () => {
    axios
      .get('http://localhost:3001/images')
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
      });
  };

  const handleLike = (id) => {
    const post = posts.find((post) => post._id === id);
  
    axios
      .post(`http://localhost:3001/like/${id}`)
      .then(() => {
        setPosts(
          posts.map((post) =>
            post._id === id
              ? {
                  ...post,
                  likes: post.likes + 1,
                  // You can choose to not track who liked or just leave an empty array
                  likedBy: post.likedBy, // Keep track of who liked or leave it empty
                }
              : post
          )
        );
      })
      .catch((err) => {
        console.error('Error liking post:', err);
        alert('An error occurred while liking the post.');
      });
  };

  const handleComment = (id, comment) => {
    if (comment.trim()) {
      axios
        .post(`http://localhost:3001/comment/${id}`, { comment })
        .then(() => {
          setPosts(posts.map(post => (post._id === id ? { ...post, comments: [...post.comments, comment] } : post)));
        })
        .catch(err => {
          console.error('Error adding comment:', err);
        });
    } else {
      alert('Comment cannot be empty.');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeModule posts={posts} handleLike={handleLike} handleComment={handleComment} />;
      case 'upload':
        navigate('/sample'); // Redirect to upload page
        return <p>Upload module coming soon!</p>;
        case 'chat':
          navigate('/chat');
          return <p>No conversation!</p>;
      case 'profile':
        navigate('/profile'); // Redirect to profile page
        return <p>Profile module coming soon!</p>;
      case 'search':
        navigate('/search'); // Redirect to search page
        return <p>Search module coming soon!</p>;
      default:
        return <p>Module not found.</p>;
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="min-vh-100 bg-gradient p-5">
      {/* Desktop Navigation */}
      <nav className={`navbar-custom ${isSticky ? 'sticky-nav' : ''} ${isVertical ? 'vertical-nav' : 'horizontal-nav'}`}>
        <div className={`container-fluid ${isVertical ? 'd-flex flex-column' : 'd-flex justify-content-center'}`}>
          {navItems.map(({ id, icon, label, path }) => (
            <NavItem
              key={id}
              icon={icon}
              label={label}
              isActive={activeTab === id}
              onClick={() => {
                if (id === 'profile') {
                  navigate('/profile'); // Redirect to profile page on click
                }
                if (id === 'search') {
                  navigate('/search'); // Redirect to search page on click
                }
                if (id === 'upload') {
                  navigate('/sample'); // Redirect to upload page on click
                }  
                else {
                  setActiveTab(id); // Set active tab for other items
                }
              }}
            />
          ))}
        </div>
      </nav>

      {/* Mobile Navigation with Hamburger Menu */}
      <div className={`d-flex justify-content-between fixed-bottom w-100 p-3 shadow-custom d-lg-none ${showMobileMenu ? 'd-block' : 'd-none'}`}>
        <div className="container-fluid d-flex justify-content-around">
          {navItems.map(({ id, icon }) => (
            <button
              key={id}
              className={`navbar-link-custom ${activeTab === id ? 'text-primary' : 'text-secondary'} btn-lg`}
              onClick={() => {
                if (id === 'profile') {
                  navigate('/profile'); // Redirect to profile page on click
                } else {
                  setActiveTab(id); // Set active tab for other items
                }
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="d-lg-none position-fixed top-2 left-2 z-index-10">
        <button className="navbar-link-custom" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>

      <main className="container mt-5">
        <div>{renderContent()}</div>
      </main>
    </div>
  );
}

function HomeModule({ posts, handleLike, handleComment }) {
  const [activeCommentPost, setActiveCommentPost] = useState(null); // To track which post's comments are active

  const toggleComments = postId => {
    setActiveCommentPost(activeCommentPost === postId ? null : postId);
  };

  const handleNewComment = (postId, comment) => {
    if (comment.trim()) {
      handleComment(postId, comment);
      setActiveCommentPost(null); // Close the comment section after adding a comment
    } else {
      alert('Comment cannot be empty.');
    }
  };

  return (
    <div className="space-y-6">
      <h2>ConnectVerse</h2>
      <div className="image-gallery">
        {posts.length === 0 ? (
          <p>No posts available. Upload an image to get started!</p>
        ) : (
          posts.map(post => (
            <div key={post._id} className="image-card">
              <img src={`http://localhost:3001/${post.imageUrl}`} alt="Post" />
              <div>
                {/* Like Button */}
                <div className="likes-comments">
                  <button
                    type="button"
                    onClick={() => handleLike(post._id)}
                    className="btn"
                  >
                    Like
                  </button>
                  <span>{post.likes} likes</span>
                </div>

                {/* Comment Button */}
                <button
                  type="button"
                  onClick={() => toggleComments(post._id)}
                  className="btn btn-secondary"
                  style={{ marginTop: '10px' }}
                >
                  {activeCommentPost === post._id ? 'Hide Comments' : 'Show Comments'}
                </button>

                {/* Comments Section */}
                {activeCommentPost === post._id && (
                  <div className="comments-section">
                    <h4>Comments:</h4>
                    {post.comments.length > 0 ? (
                      post.comments.map((cmt, idx) => <p key={idx}>{cmt}</p>)
                    ) : (
                      <p>No comments yet.</p>
                    )}
                    <div>
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            handleNewComment(post._id, e.target.value);
                            e.target.value = ''; // Clear input after submission
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function UploadModule({ fetchPosts }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    axios
      .post('http://localhost:3001/upload', formData)
      .then(() => {
        fetchPosts(); // Refresh posts after upload
      })
      .catch(err => {
        setError('Error uploading file.');
        console.error(err);
      });
  };

  return (
    <div className="upload-container">
      <h3>Upload your Post</h3>
      <input type="file" onChange={handleFileChange} />
      {error && <p>{error}</p>}
      <button onClick={handleFileUpload} className="btn btn-primary">Upload</button>
    </div>
  );
}