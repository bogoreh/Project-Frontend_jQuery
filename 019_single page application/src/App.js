import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import { fetchPosts, fetchPost } from './services/api';

function App() {
  const [state, setState] = useState({
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
    currentView: 'list'
  });

  // Initialize and handle browser navigation
  useEffect(() => {
    loadPosts();
    setupRouting();
    
    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const setupRouting = () => {
    window.addEventListener('popstate', handlePopState);
    
    // Check initial URL
    const path = window.location.pathname;
    if (path.startsWith('/post/')) {
      const postId = path.split('/post/')[1];
      handlePostClick(parseInt(postId));
    }
  };

  const handlePopState = (event) => {
    const path = window.location.pathname;
    if (path === '/') {
      setState(prev => ({
        ...prev,
        currentView: 'list',
        currentPost: null
      }));
    } else if (path.startsWith('/post/')) {
      const postId = path.split('/post/')[1];
      handlePostClick(parseInt(postId));
    }
  };

  const loadPosts = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const posts = await fetchPosts();
      setState(prev => ({
        ...prev,
        posts,
        loading: false,
        currentView: 'list'
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load posts'
      }));
    }
  };

  const handlePostClick = async (postId) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const post = await fetchPost(postId);
      
      // Update URL using History API
      window.history.pushState({ postId }, '', `/post/${postId}`);
      
      setState(prev => ({
        ...prev,
        currentPost: post,
        loading: false,
        currentView: 'detail'
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load post'
      }));
    }
  };

  const handleBackToList = () => {
    // Update URL using History API
    window.history.pushState({}, '', '/');
    
    setState(prev => ({
      ...prev,
      currentView: 'list',
      currentPost: null
    }));
  };

  const { posts, currentPost, loading, error, currentView } = state;

  return (
    <div className="app">
      <Header 
        onBack={handleBackToList} 
        showBack={currentView === 'detail'}
      />
      
      <main className="main-content">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        
        {currentView === 'list' && (
          <PostList 
            posts={posts} 
            onPostClick={handlePostClick}
          />
        )}
        
        {currentView === 'detail' && currentPost && (
          <PostDetail post={currentPost} />
        )}
      </main>
    </div>
  );
}

export default App;