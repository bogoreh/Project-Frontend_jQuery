import $ from 'jquery';

// Mock API endpoints - In a real app, these would be your actual backend endpoints
const API_BASE = 'https://jsonplaceholder.typicode.com'; // Using a mock API for demonstration

// Simulated message storage (in a real app, this would be on the server)
let messageIdCounter = 100;
const simulatedMessages = [
  { id: 1, text: "Hello everyone!", sender: "John", timestamp: "10:00 AM" },
  { id: 2, text: "Hi John! How are you?", sender: "Alice", timestamp: "10:01 AM" },
  { id: 3, text: "I'm doing great! Working on a new project.", sender: "John", timestamp: "10:02 AM" },
  { id: 4, text: "That sounds interesting!", sender: "Bob", timestamp: "10:03 AM" }
];

export const chatService = {
  // Get initial messages
  async getInitialMessages() {
    return new Promise((resolve) => {
      // Simulate API call with jQuery AJAX
      $.ajax({
        url: `${API_BASE}/posts/1`, // Mock endpoint
        method: 'GET',
        success: () => {
          // In real app, you'd return actual messages from API
          // For demo, we'll return our simulated messages
          setTimeout(() => resolve(simulatedMessages), 500);
        },
        error: () => {
          // Fallback to simulated messages if API fails
          resolve(simulatedMessages);
        }
      });
    });
  },

  // Check for new messages
  async getNewMessages(currentCount) {
    return new Promise((resolve) => {
      // Simulate receiving new messages occasionally
      const shouldHaveNewMessage = Math.random() > 0.7;
      
      if (shouldHaveNewMessage && currentCount < 8) {
        const newMessages = [
          {
            id: messageIdCounter++,
            text: "This is a simulated new message!",
            sender: ["John", "Alice", "Bob"][Math.floor(Math.random() * 3)],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
        
        $.ajax({
          url: `${API_BASE}/posts/1`,
          method: 'GET',
          success: () => {
            setTimeout(() => resolve(newMessages), 300);
          },
          error: () => {
            resolve(newMessages);
          }
        });
      } else {
        resolve([]);
      }
    });
  },

  // Send a message
  async sendMessage(message) {
    return new Promise((resolve, reject) => {
      // Simulate API call to send message
      $.ajax({
        url: `${API_BASE}/posts`,
        method: 'POST',
        data: JSON.stringify({
          title: 'Chat Message',
          body: message.text,
          userId: 1
        }),
        contentType: 'application/json',
        success: (response) => {
          console.log('Message sent successfully:', response);
          // In a real app, you might want to update the message with server-generated ID
          setTimeout(() => resolve({ ...message, id: response.id }), 200);
        },
        error: (xhr, status, error) => {
          console.error('Failed to send message:', error);
          reject(error);
        }
      });
    });
  }
};