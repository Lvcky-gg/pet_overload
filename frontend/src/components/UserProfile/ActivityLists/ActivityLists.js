import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { getQuestionVotes } from '../../../store/questionVotes';
import dateFormater from '../../../utils/dateFormater';
import { getAllQuestions } from '../../../store/questions';
import './ActivityLists.css';
const ActivityList = ({ activeTab, activeSort }) => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.allQuestions);
    const answers = useSelector((state) => state.answers);
    const userQVotes = Object.values(
        useSelector((state) => state.questionVotes.questionVotes)
    );
    const loading = useSelector((state) => state.questionVotes.loading);
    console.log(questions);
    useEffect(() => {
        dispatch(getQuestionVotes());
        dispatch(getAllQuestions());
    }, [dispatch]);
    const getQuestion = (questionId) => {
        const question = questions.find(
            (question) => question.id === questionId
        );

        return question ? question : 'No Questions voted';
    };

    return (
        <div id="activity-list-container">
            <div className="total-number-container">
                <span>Total Numbers:</span>
                <span id="user-activity-number">{userQVotes.length}</span>
            </div>

            <ul className="user-activity-list-container">
                <li className="user-activity-list column-title">
                    <p>Question</p>
                    <p>Score</p>
                    <p>VotedOn</p>
                    <p>Like</p>
                    <p>Manage</p>
                </li>
                {activeTab === 'votes' &&
                    userQVotes.length &&
                    userQVotes.map((qVote, idx) => (
                        <li className="user-activity-list list-item" key={idx}>
                            <p id="question-title">
                                {getQuestion(qVote.questionId).title}
                            </p>
                            <p>{getQuestion(qVote.questionId).votes_score}</p>
                            <p>{dateFormater(qVote.createdAt)}</p>
                            <p>{qVote.isLiked ? 'Like' : 'Dislike'}</p>
                            <p>
                                <button className="button">Delete</button>
                            </p>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default ActivityList;
