// Mock API service using jQuery AJAX
const API_BASE = 'https://jsonplaceholder.typicode.com';
const MOCK_DELAY = 500;

// Mock data for demonstration
const mockPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    excerpt: "Learn the basics of React and how to build modern web applications.",
    content: `
      <h2>Introduction to React</h2>
      <p>React is a powerful JavaScript library for building user interfaces. It allows you to create reusable UI components.</p>
      <p>With React, you can build complex applications that are easy to maintain and scale.</p>
      <h3>Key Features</h3>
      <ul>
        <li>Component-based architecture</li>
        <li>Virtual DOM for performance</li>
        <li>One-way data flow</li>
        <li>JSX syntax</li>
      </ul>
    `,
    author: "Jane Smith",
    date: "2024-01-15",
    tags: ["react", "javascript", "webdev"],
    image: "https://picsum.photos/800/400?random=1"
  },
  {
    id: 2,
    title: "Advanced JavaScript Patterns",
    excerpt: "Explore advanced JavaScript patterns and best practices for modern development.",
    content: `
      <h2>JavaScript Design Patterns</h2>
      <p>Design patterns are reusable solutions to common problems in software design.</p>
      <p>In JavaScript, patterns help you write more maintainable and scalable code.</p>
      <h3>Common Patterns</h3>
      <ul>
        <li>Module Pattern</li>
        <li>Observer Pattern</li>
        <li>Factory Pattern</li>
        <li>Singleton Pattern</li>
      </ul>
    `,
    author: "John Doe",
    date: "2024-01-12",
    tags: ["javascript", "patterns", "programming"],
    image: "https://picsum.photos/800/400?random=2"
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox",
    excerpt: "Understanding when to use CSS Grid and when to use Flexbox for layout design.",
    content: `
      <h2>CSS Layout Systems</h2>
      <p>CSS Grid and Flexbox are two powerful layout systems in CSS, each with their own strengths.</p>
      <p>Understanding when to use each can significantly improve your layout designs.</p>
      <h3>Grid vs Flexbox</h3>
      <ul>
        <li>Grid: Two-dimensional layouts</li>
        <li>Flexbox: One-dimensional layouts</li>
        <li>Grid: Complex page layouts</li>
        <li>Flexbox: Component layouts</li>
      </ul>
    `,
    author: "Sarah Johnson",
    date: "2024-01-10",
    tags: ["css", "layout", "webdesign"],
    image: "https://picsum.photos/800/400?random=3"
  }
];

export const fetchPosts = () => {
  return new Promise((resolve, reject) => {
    // Using jQuery for AJAX call
    window.$.ajax({
      url: `${API_BASE}/posts`,
      method: 'GET',
      success: (data) => {
        // For demo purposes, we'll use our mock data
        // but structure it like the API response
        setTimeout(() => {
          resolve(mockPosts);
        }, MOCK_DELAY);
      },
      error: (xhr, status, error) => {
        // Fallback to mock data if API fails
        setTimeout(() => {
          resolve(mockPosts);
        }, MOCK_DELAY);
      }
    });
  });
};

export const fetchPost = (postId) => {
  return new Promise((resolve, reject) => {
    window.$.ajax({
      url: `${API_BASE}/posts/${postId}`,
      method: 'GET',
      success: (data) => {
        // Find post in mock data
        const post = mockPosts.find(p => p.id === postId);
        setTimeout(() => {
          if (post) {
            resolve(post);
          } else {
            reject(new Error('Post not found'));
          }
        }, MOCK_DELAY);
      },
      error: (xhr, status, error) => {
        // Fallback to mock data
        const post = mockPosts.find(p => p.id === postId);
        setTimeout(() => {
          if (post) {
            resolve(post);
          } else {
            reject(new Error('Post not found'));
          }
        }, MOCK_DELAY);
      }
    });
  });
};