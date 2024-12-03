import React, { useEffect, useState } from "react";
import { getPosts, getMyPosts, deletePost } from "../api/blogApi";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Header from "./Header";
import Footer from "./Footer";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      setIsAuthenticated(true);
      fetchUserPosts();  // Fetch posts for authenticated users
    } else {
      fetchAllPosts();  // Fetch all posts for unauthenticated users
    }
  }, []);

    // Fetch all posts for unauthenticated users
    const fetchAllPosts = async () => {
      try {
        const { data } = await getPosts();  // Use the correct function name
        setPosts(data);
      } catch (error) {
        console.error("Error fetching all posts:", error);
      }
    };

  const fetchUserPosts = async () => {
    try {
      const { data } = await getMyPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      fetchUserPosts();  // Refresh posts after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const truncateContent = (content, limit = 100) => {
    if (content.length > limit) {
      return content.substring(0, limit) + "...";
    }
    return content;
  };

  return (
    <div className="container">
      <Header />
      <SearchBar onSearch={isAuthenticated ? fetchUserPosts : fetchAllPosts} />
      <div className="blog-list">
        {posts.map((post) => (

         <div className="blog-card" key={post.id}>
            {/* Display the image */}
            <img
              src={`/images/${post.image || "blog89.jpg"}`}
              alt={post.title}
              className="post-image"
            />
            {/* Display the title */}
            <h2>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            {/* Display the truncated content with "Read More" */}
            <p>{truncateContent(post.content)}</p>
            <Link to={`/posts/${post.id}`} className="read-more-link">
              Read More
            </Link>


            {isAuthenticated && (
              <button onClick={() => handleDelete(post.id)} className="btn delete">
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};



export default BlogList;
