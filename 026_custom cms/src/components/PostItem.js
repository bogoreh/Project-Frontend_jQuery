import React from 'react';
import $ from 'jquery';

const PostItem = ({ post, onEdit, onDelete }) => {
  const handleEdit = () => {
    // jQuery animation
    $(`[data-post-id="${post.id}"]`).addClass('editing');
    setTimeout(() => {
      onEdit(post);
    }, 300);
  };

  const handleDelete = () => {
    onDelete(post.id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="post-item" data-post-id={post.id}>
      <div className="post-header">
        <h4 className="post-title">{post.title}</h4>
        <span className={`post-status ${post.status}`}>
          {post.status}
        </span>
      </div>
      
      {post.category && (
        <div className="post-category">
          <strong>Category:</strong> {post.category}
        </div>
      )}
      
      <div className="post-content">
        {post.content.length > 150 
          ? `${post.content.substring(0, 150)}...` 
          : post.content
        }
      </div>
      
      <div className="post-meta">
        <span>Created: {formatDate(post.createdAt)}</span>
        {post.updatedAt !== post.createdAt && (
          <span>Updated: {formatDate(post.updatedAt)}</span>
        )}
      </div>
      
      <div className="post-actions">
        <button 
          className="btn btn-edit"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button 
          className="btn btn-delete"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;