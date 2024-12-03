import React, { useState, useEffect } from 'react';
import { createPost, updatePost, getPost } from '../api/blogApi';
import { useNavigate, useParams } from 'react-router-dom';
import Foooter from './Footer';
import Header from './Header';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          // Redirect to login page if not authenticated
          navigate('/login');
        }
      }, [navigate]);
      

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        const { data } = await getPost(id);
        setTitle(data.title);
        setContent(data.content);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updatePost(id, { title, content });
        } else {
            await createPost({ title, content });
        }
        navigate('/');
    };

    return (
        <div className="dontainer">
            <Header />
            <form onSubmit={handleSubmit} className="blog-form">
                <h2>{id ? 'Edit Post' : 'Create Post'}</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit" className="btn">
                    Save
                </button>
            </form>
            <Foooter />
        </div>
    );
};

export default BlogForm;
