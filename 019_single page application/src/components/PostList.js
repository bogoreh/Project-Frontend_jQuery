import React from 'react';

const PostList = ({ posts, onPostClick }) => {
  if (posts.length === 0) {
    return <div className="no-posts">No posts available</div>;
  }

  return (
    <div className="post-list">
      <h2>Latest Posts</h2>
      <div className="posts-grid">
        {posts.map(post => (
          <article 
            key={post.id} 
            className="post-card"
            onClick={() => onPostClick(post.id)}
          >
            <h3 className="post-title">{post.title}</h3>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-meta">
              <span className="post-author">By {post.author}</span>
              <span className="post-date">{post.date}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostList;