import React from 'react';
import './SortingTabs.css';

const SortingTabs = () => {
    const { score, recent, answerCount, like, dislike } = {
        score: 'Score',
        recent: 'Newest',
        answerCount: 'Most answers',
        like: 'Likes',
        dislike: 'Dislikes',
    };
    return (
        <div id="sorting-tabs-container">
            <nav className="header-menu">
                <span className="sort-tab">{recent}</span>
                <span className="sort-tab">{score}</span>
                <span className="sort-tab">{answerCount}</span>
                <span className="sort-tab">{like}</span>
                <span className="sort-tab">{dislike}</span>
            </nav>
        </div>
    );
};

export default SortingTabs;
