import React, { useState } from 'react';

import './Search.css';

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    return (
        <div className="search">
            <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}
            />
            <button className="modalButton">Search</button>
        </div>
    );
};
export default SearchBar;
