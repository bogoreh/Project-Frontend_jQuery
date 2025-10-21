import React, { useState, useEffect } from 'react';
import $ from 'jquery';

const PostForm = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    status: 'draft'
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        category: post.category || '',
        status: post.status || 'draft'
      });
    }

    // jQuery form enhancements
    $('.post-form').hide().fadeIn(500);
    $('#post-title').focus();
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // jQuery validation
    if (!formData.title.trim()) {
      $.notify('Title is required!', 'error');
      $('#post-title').addClass('error').focus();
      return;
    }

    if (!formData.content.trim()) {
      $.notify('Content is required!', 'error');
      $('#post-content').addClass('error').focus();
      return;
    }

    // Remove error classes
    $('.form-control').removeClass('error');

    onSave(formData);
  };

  return (
    <div className="post-form-container">
      <form className="post-form" onSubmit={handleSubmit}>
        <h3>{post ? 'Edit Post' : 'Create New Post'}</h3>
        
        <div className="form-group">
          <label htmlFor="post-title">Title *</label>
          <input
            id="post-title"
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-category">Category</label>
          <input
            id="post-category"
            type="text"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-content">Content *</label>
          <textarea
            id="post-content"
            name="content"
            className="form-control"
            rows="6"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter post content"
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-status">Status</label>
          <select
            id="post-status"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {post ? 'Update Post' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;