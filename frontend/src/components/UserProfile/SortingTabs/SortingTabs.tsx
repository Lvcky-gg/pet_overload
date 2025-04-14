import React from 'react';

import './SortingTabs.css';

interface SortingTabsProps {
    activeSort: 'newest' | 'score';
    setActiveSort: React.Dispatch<React.SetStateAction<'newest' | 'score'>>;
}

const SortingTabs: React.FC<SortingTabsProps> = ({
    activeSort,
    setActiveSort,
}) => {
    const handleTabClick = (tab: string): void => {
        setActiveSort(tab as 'newest' | 'score');
    };

    return (
        <div id='sorting-tabs-container'>
            <nav className='header-menu'>
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
