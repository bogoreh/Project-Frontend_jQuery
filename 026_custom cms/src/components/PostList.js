import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, onEdit, onDelete }) => {
  if (posts.length === 0) {
    return (
      <div className="post-list empty">
        <p>No posts found. Create your first post!</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      <h3>Posts ({posts.length})</h3>
      <div className="posts-grid">
        {posts.map(post => (
          <PostItem
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;