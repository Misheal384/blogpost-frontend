import React, { useEffect, useState } from 'react';
import { getPost } from '../api/blogApi';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../blogdetail.css';

const BlogDetail = () => {
    const { id } = useParams();  //used to fetch specific blog post from the backend
    const [post, setPost] = useState(null);  //to store the fetched blog post

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        const { data } = await getPost(id);  //fetches the post details from the backend
        setPost(data);
    };

    if (!post) return <p className="loading">Loading...</p>;

    return (
        <div className="blog-detail-container">
            <Header />
            <div className="blog-detail-card">
                <h1 className="post-title">{post.title}</h1>
                
                <div className="post-content">
                    <p>{post.content}</p>
                </div>
                <div className="post-actions">
                    <Link to={`/edit/${post.id}`} className="btn edit-btn">
                        Edit
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BlogDetail;
