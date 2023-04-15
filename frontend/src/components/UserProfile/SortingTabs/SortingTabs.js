import React from 'react';

import './SortingTabs.css';

const SortingTabs = ({ activeSort, setActiveSort }) => {
    const handleTabClick = (tab) => {
        setActiveSort(tab);
    };

    return (
        <div id="sorting-tabs-container">
            <nav className="header-menu">
                <span
                    className={`sort-tab${
                        activeSort === 'newest' ? ' active' : ''
                    }`}
                    onClick={() => handleTabClick('newest')}
                >
                    Newest
                </span>
                <span
                    className={`sort-tab${
                        activeSort === 'score' ? ' active' : ''
                    }`}
                    onClick={() => handleTabClick('score')}
                >
                    Score
                </span>
            </nav>
        </div>
    );
};

export default SortingTabs;
