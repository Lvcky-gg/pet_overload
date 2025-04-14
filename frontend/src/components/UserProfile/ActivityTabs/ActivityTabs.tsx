import React from 'react';

import './ActivityTabs.css';

interface ActivityTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const ActivityTabs: React.FC<ActivityTabsProps> = ({
    activeTab,
    setActiveTab,
}) => {
    const handleTabClick = (tab: string): void => {
        setActiveTab(tab);
    };

    return (
        <div id='activity-tabs-container'>
            <nav className='header-menu'>
                <span
                    className='button activity-tab'
                    onClick={() => handleTabClick('questions')}
                >
                    Questions
                </span>
                <span
                    className='button activity-tab'
                    onClick={() => handleTabClick('answers')}
                >
                    Answers
                </span>
                <span
                    className='button activity-tab'
                    onClick={() => handleTabClick('votes')}
                >
                    Votes
                </span>
            </nav>
        </div>
    );
};

export default ActivityTabs;
