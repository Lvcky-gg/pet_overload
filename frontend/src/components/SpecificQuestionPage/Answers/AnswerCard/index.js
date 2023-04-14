import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import session from '../../../../store/session';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import RichEditor from '../../../RichTextEditor';
import parse from 'html-react-parser';

import { deleteAnswer, getAllAnswers } from '../../../../store/answers';
import DeleteButton from '../../../UserProfile/ActivityLists/DeleteButton';
import { authenticate } from '../../../../store/session';
import { NavLink, redirect } from 'react-router-dom';
import { updateAnswerByQuestion } from '../../../../store/answers';
import { getAllQuestions } from '../../../../store/questions';
import VotingAnswers from '../../VotingAnswers';
import dateFormater from '../../../../utils/dateFormater';
const AnswerCard = ({ answer, setVoteClicked, setIsDelete }) => {
    const {
        details,
        userId,
        id,
        isDelete,

        answerScore,
        user,
        createdAt,
    } = answer;
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [richTextEditor, setRichTextEditor] = useState(false);
    useEffect(() => {
        dispatch(authenticate());
    }, [dispatch]);
    const handleDelete = () => {
        dispatch(deleteAnswer(id));
        dispatch(getAllAnswers());
        dispatch(getAllQuestions());
    };

    const handleEditorSubmit = (e, { details, answerId }) => {
        e.preventDefault();
        const val = dispatch(
            updateAnswerByQuestion({ details: details, answerId: answerId })
        );
        return val;
    };

    const handleEditClick = (e) => {
        e.preventDefault();
        setRichTextEditor(!richTextEditor);
    };
    useEffect(() => {}, [richTextEditor]);

    return (
        <div className="answer-editor-container question-card">
            <div className="answer-card ">
                <div className="row">
                    <VotingAnswers
                        answerScore={answerScore}
                        answerId={id}
                        author={user}
                        onClick={() => setVoteClicked((prev) => !prev)}
                    />
                </div>
                <div id="answer-info-container">
                    <p className="card-details">{details}</p>
                    {/* author only edit delete */}
                    <div className="card-bottom">
                        <div className="modify-button-container">
                            {sessionUser && sessionUser.id === userId && (
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
                                        type="answer"
                                        id={id}
                                    ></DeleteButton>
                                </div>
                            )}
                        </div>
                        <div className="answer-author-date">
                            <NavLink to={`/users/${user.id}`}>
                                <p className="author-name">
                                    Answered by:{user.username}
                                </p>
                            </NavLink>
                            <div
                                style={{
                                    display: 'flex',
                                    marginRight: '5px',
                                }}
                            >
                                <i className="fas fa-crown"></i>
                                <p>{user.reputation}</p>
                            </div>
                            <p className="answered-date">
                                Answered at:{dateFormater(createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {richTextEditor && (
                <div>
                    <RichEditor
                        details={details}
                        answerId={id}
                        handleEditorSubmit={handleEditorSubmit}
                        richTextEditor={richTextEditor}
                        setRichTextEditor={setRichTextEditor}
                    ></RichEditor>
                </div>
            )}
        </div>
    );
};

export default AnswerCard;
