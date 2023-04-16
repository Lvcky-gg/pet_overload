import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { authenticate } from '../../../store/session';
import Voting from '../../AllQuestionsPage/Voting/Voting';
import dateFormater from '../../../utils/dateFormater';
import DeleteButton from '../../UserProfile/ActivityLists/DeleteButton';
import parse from 'html-react-parser';
import { deleteQuestion, updateQuestion } from '../../../store/questions';
import RichEditor from '../../RichTextEditor';
import QuestionRichEditor from '../../AskAQuestionPage/QuestionForm/QuestionRichEditor';
import Button from '../../Button';

import './Question.css';

const { useSelector, useDispatch } = require('react-redux');

const Question = ({ question, setIsDelete }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);

    const {
        id,
        title: initialTitle,
        details: initialDetails,
        votes_score: voteScore,
        user,
        created_at,
        updated_at,
        setVoteClicked,
    } = question;

    const [details, setDetails] = useState(initialDetails);
    const [title, setTitle] = useState(initialTitle);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [showEditError, setShowEditError] = useState(false);

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

        // Render the rich text editor
        setIsEditorOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateQuestionResult = await dispatch(
            updateQuestion({ questionId: id, title, details })
        );

        // If not fulfilled, revert to initial details
        if (!updateQuestionResult.meta.requestStatus === 'fulfilled') {
            setShowEditError(true);
            setDetails(initialDetails);
        } else {
            setShowEditError(false);
            setIsEditorOpen(false);
        }
    };

    const handleCancel = () => {
        setIsEditorOpen(false);
        setDetails(initialDetails);
        setTitle(initialTitle);
        setShowEditError(false);
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
                        <div className="author-name-date">
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

                            <div className="author-name-date">
                                <i className="fas fa-crown"></i>
                                <p>{user.reputation}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isEditorOpen && (
                <div className="edit-question-container">
                    <h2>Edit Question</h2>
                    {showEditError && (
                        <p className="error">
                            We are unable to process your edit request. Please
                            try again later.
                        </p>
                    )}
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <p>Details</p>
                    <QuestionRichEditor
                        details={details}
                        setDetails={setDetails}
                    />
                    <div className="button-row">
                        <Button
                            id={'cancel-edit-question-button'}
                            onClickHandler={handleCancel}
                            text={'Cancel'}
                        />
                        <Button
                            id={'save-edit-question-button'}
                            onClickHandler={handleSubmit}
                            text={'Save changes'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Question;
