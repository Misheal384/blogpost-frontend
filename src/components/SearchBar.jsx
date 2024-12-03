import React, { useState } from 'react';
import '../searchbar.css';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchQuery);
    };

    return (
        <div className="search-bar-container">
            <div className="search-input-wrapper">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="search-input"
                />
            </div>
            <button onClick={handleSearchClick} className="btn-search">
                <span className="search-icon">🔍</span> Search
            </button>
        </div>
    );
};

export default SearchBar;
