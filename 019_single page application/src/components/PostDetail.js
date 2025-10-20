import React, { useEffect, useRef } from 'react';

const PostDetail = ({ post }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    // Use jQuery for enhanced DOM manipulation
    if (window.jQuery && contentRef.current) {
      const $content = window.$(contentRef.current);
      
      // Add smooth animations
      $content.hide().fadeIn(400);
      
      // Enhance images with lazy loading
      $content.find('img').each(function() {
        const $img = window.$(this);
        $img.attr('data-src', $img.attr('src'));
        $img.addClass('lazy-image');
      });
      
      // Add click handlers for images
      $content.find('img').on('click', function() {
        window.$(this).toggleClass('zoomed');
      });
    }
  }, [post]);

  return (
    <article className="post-detail">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span className="post-author">By {post.author}</span>
          <span className="post-date">{post.date}</span>
        </div>
        {post.image && (
          <img 
            src={post.image} 
            alt={post.title} 
            className="post-featured-image"
          />
        )}
      </header>
      
      <div 
        ref={contentRef}
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <footer className="post-footer">
        <div className="post-tags">
          {post.tags && post.tags.map(tag => (
            <span key={tag} className="post-tag">#{tag}</span>
          ))}
        </div>
      </footer>
    </article>
  );
};

export default PostDetail;