import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import PostForm from './PostForm';
import PostList from './PostList';

const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load posts from localStorage on component mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const savedPosts = localStorage.getItem('cms-posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  };

  const savePosts = (updatedPosts) => {
    localStorage.setItem('cms-posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleAddPost = (postData) => {
    const newPost = {
      id: Date.now(),
      ...postData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedPosts = [...posts, newPost];
    savePosts(updatedPosts);
    
    // jQuery animation for smooth addition
    $('.post-list').fadeOut(300, function() {
      $(this).fadeIn(300);
    });

    setShowForm(false);
  };

  const handleEditPost = (postData) => {
    const updatedPosts = posts.map(post => 
      post.id === editingPost.id 
        ? { ...post, ...postData, updatedAt: new Date().toISOString() }
        : post
    );

    savePosts(updatedPosts);
    setEditingPost(null);
    setShowForm(false);

    // jQuery notification
    $.notify('Post updated successfully!', 'success');
  };

  const handleDeletePost = (postId) => {
    // jQuery confirmation with animation
    if (window.confirm('Are you sure you want to delete this post?')) {
      const postElement = $(`[data-post-id="${postId}"]`);
      
      postElement.slideUp(300, function() {
        const updatedPosts = posts.filter(post => post.id !== postId);
        savePosts(updatedPosts);
        
        $.notify('Post deleted successfully!', 'success');
      });
    }
  };

  const startEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
    
    // Smooth scroll to form
    $('html, body').animate({
      scrollTop: $('.post-form-container').offset().top
    }, 500);
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setShowForm(false);
  };

  return (
    <div className="admin-panel">
      <div className="panel-header">
        <h2>Admin Panel</h2>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingPost(null);
            setShowForm(true);
          }}
        >
          Add New Post
        </button>
      </div>

      {(showForm || editingPost) && (
        <div className="post-form-container">
          <PostForm
            post={editingPost}
            onSave={editingPost ? handleEditPost : handleAddPost}
            onCancel={cancelEdit}
          />
        </div>
      )}

      <PostList
        posts={posts}
        onEdit={startEdit}
        onDelete={handleDeletePost}
      />
    </div>
  );
};

export default AdminPanel;