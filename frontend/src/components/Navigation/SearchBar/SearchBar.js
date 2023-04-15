import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
    const searchInputRef = useRef(null);
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchUrl, setSearchUrl] = useState('');
    const error = useSelector((state) => state.questions.error);
    const [errorMsg, setErrorMsg] = useState('');

    const onSearch = (input) => {
        if (input[0] === "'" || input[0] === '"') {
            //search by keyword
            setSearchUrl(`keyword=${input.slice(1, -1)}`);
        } else if (input.split(':')[0] === 'author') {
            //search by author
            setSearchUrl(`username=${input.split(':').slice(1).join('')}`);
        } else if (input.split(':')[0] === 'score') {
            // search by score
            setSearchUrl(`score=${input.split(':').slice(1).join('')}`);
        } else {
            // default
            setSearchUrl(`keyword=${input}`);
        }
        setShowDropdown(false);
    };
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchInput);
    };

    const handleFocus = () => {
        setSearchInput('');
        setErrorMsg('');
        setShowDropdown(true);
    };

    const handleBlur = () => {
        if (!errorMsg) setShowDropdown(false);
    };
    useEffect(() => {
        if (searchUrl) {
            navigate(`/all-questions/search?${searchUrl}`, { replace: true });
            setSearchInput('');
            setSearchUrl('');
        }
        if (error) {
            setErrorMsg(error);
        }
        if (!error) setErrorMsg('');
    }, [searchUrl, navigate, error]);

    useEffect(() => {
        if (searchInputRef.current) {
            if (!errorMsg) {
                searchInputRef.current.focus();
            } else {
                searchInputRef.current.blur();
            }
        }
    }, [errorMsg]);

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSearchSubmit} className="search-bar-form">
                <div className="searchbar-wrapper">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={errorMsg ? errorMsg : searchInput}
                        // value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="search-bar-input"
                        ref={searchInputRef}
                    />

                    <i className="fas fa-search"></i>
                </div>
                {showDropdown && (
                    <div className="search-dropdown">
                        <p className="search-intro title">
                            Follow the following format to search
                        </p>
                        <ul>
                            <li className="search-field">
                                author:username{' '}
                                <span className="search-intro">
                                    search by author
                                </span>
                            </li>
                            <li className="search-field">
                                score:3{' '}
                                <span className="search-intro">
                                    search post with 3+ score
                                </span>
                            </li>
                            <li className="search-field">
                                "keyword in quote"{' '}
                                <span className="search-intro">
                                    search keyword in title
                                </span>
                            </li>
                        </ul>
                    </div>
                )}
            </form>
        </div>
    );
};

export default SearchBar;
