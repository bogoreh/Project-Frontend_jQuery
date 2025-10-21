import $ from 'jquery';

// API utility functions for future backend integration
export const postAPI = {
  // Simulate API calls - replace with actual endpoints
  getAllPosts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('cms-posts') || '[]');
        resolve(posts);
      }, 500);
    });
  },

  createPost: (postData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPost = {
          id: Date.now(),
          ...postData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        resolve(newPost);
      }, 500);
    });
  },

  updatePost: (postId, postData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: postId, ...postData });
      }, 500);
    });
  },

  deletePost: (postId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  }
};

// jQuery notification helper
$.notify = function(message, type = 'info') {
  const notification = $(`<div class="notify ${type}">${message}</div>`);
  $('body').append(notification);
  
  setTimeout(() => {
    notification.fadeOut(300, function() {
      $(this).remove();
    });
  }, 3000);
};