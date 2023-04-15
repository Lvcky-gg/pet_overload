import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAllQuestions } from '../../../store/questions';
import { authenticate } from '../../../store/session';
import Voting from '../../AllQuestionsPage/Voting/Voting';
import dateFormater from '../../../utils/dateFormater';
import DeleteButton from '../../UserProfile/ActivityLists/DeleteButton';
import parse from 'html-react-parser';
import { deleteQuestion, updateQuestion } from '../../../store/questions';
const { useSelector, useDispatch } = require('react-redux');
const Question = ({ question, setIsDelete }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const {
        id,
        title,
        details,
        votes_score: voteScore,
        user,
        created_at,
        updated_at,
        setVoteClicked,
    } = question;

    useEffect(() => {
        dispatch(authenticate());
    }, [dispatch]);

    const handleDelete = () => {
        dispatch(deleteQuestion(id));
        setIsDelete((prev) => !prev);
        navigate('/all-questions/');
    };
    const handleEditClick = (e) => {
        e.preventDefault();
        dispatch(updateQuestion({ id, title, details }));
    };
    const navigateToAskAQuestionPage = () => {
        // Navigate to the route '/all-questions/ask-a-question'
        navigate('/all-questions/ask-a-question');
    };
    return (
        <div className="question-container">
            <div className="question-header">
                <div id="title-ask-question">
                    <div>
                        <h1>{title}</h1>
                    </div>
                    <div className="ask-question-container">
                        <button
                            id="ask-question-button"
                            className="button"
                            // onClick={showEditor}
                            onClick={navigateToAskAQuestionPage}
                        >
                            Answer question
                        </button>
                    </div>
                </div>
                <div id="title-date">
                    <p>Asked on:{dateFormater(created_at)}</p>
                    <p>Modified on:{dateFormater(updated_at)}</p>
                </div>
            </div>
            <div className="question-details question-card">
                <div className="row">
                    <Voting
                        questionId={id}
                        voteScore={voteScore}
                        onClick={() => setVoteClicked((prev) => !prev)}
                    />
                </div>
                <div id="question-info-container">
                    <div className="card-details">{parse(details)}</div>

                    <div className="card-bottom">
                        {/* author only */}
                        <div className="modify-button-container">
                            {currentUser && currentUser.id === user.id && (
                                <div className="modify-button">
                                    <button
                                        id="answerCardButton"
                                        className="modalButton"
                                        onClick={handleEditClick}
                                    >
                                        Edit
                                    </button>
                                    <DeleteButton
                                        className="modalButton"
                                        onDelete={handleDelete}
                                        setIsDelete={setIsDelete}
                                        type="question"
                                        id={id}
                                    ></DeleteButton>
                                </div>
                            )}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                            }}
                        >
                            {currentUser ? (
                                <NavLink to={`/users/${user.id}`}>
                                    <p className="author-name-date">
                                        Author:{user.username}
                                    </p>
                                </NavLink>
                            ) : (
                                <p className="author-name-date">
                                    Author:{user.username}
                                </p>
                            )}
                            <div
                                style={{
                                    display: 'flex',
                                    marginRight: '5px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <i
                                    className="fas fa-crown"
                                    style={{ color: 'gold' }}
                                ></i>
                                <p style={{ color: '#0e67b4' }}>
                                    {user.reputation}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Question;
