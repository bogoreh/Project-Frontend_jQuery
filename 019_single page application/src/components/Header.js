import React from 'react';

const Header = ({ onBack, showBack }) => {
  return (
    <header className="header">
      <div className="header-content">
        {showBack && (
          <button className="back-button" onClick={onBack}>
            ← Back to Posts
          </button>
        )}
        <h1 className="header-title">Blog Reader</h1>
      </div>
    </header>
  );
};

export default Header;