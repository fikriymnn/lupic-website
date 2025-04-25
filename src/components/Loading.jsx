import React from 'react';
import './Loading.css'; // Opsional, jika ingin menambahkan styling

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loading;