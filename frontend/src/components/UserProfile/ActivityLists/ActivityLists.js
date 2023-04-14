import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';

import dateFormater from '../../../utils/dateFormater';
import {
    getQuestionVotes,
    deleteQuestionVotes,
} from '../../../store/questionVotes';
import { getAllQuestions, deleteQuestion } from '../../../store/questions';
import { getAnswerVotes, deleteAnswerVotes } from '../../../store/answerVotes';
import { getAllAnswers, deleteAnswer } from '../../../store/answers';

import DeleteButton from './DeleteButton';

import './ActivityLists.css';

const ActivityList = ({
    activeTab,
    activeSort,
    user,
    currentUser,
    isDelete,
    setIsDelete,
}) => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.allQuestions);
    const answers = useSelector((state) => state.answers.allAnswers);
    const userQVotes = useSelector(
        (state) => state.questionVotes.questionVotes
    );

    const userAVotes = useSelector((state) => state.answerVotes.answerVotes);

    // const loading = useSelector((state) => state.questionVotes.loading);

    useEffect(() => {
        dispatch(getQuestionVotes());
        dispatch(getAnswerVotes());
        dispatch(getAllQuestions());
        dispatch(getAllAnswers());
    }, [dispatch, isDelete, activeTab]);

    const getQuestion = (questionId) => {
        const question = questions.find(
            (question) => question.id === questionId
        );

        return question ? question : 'No Questions voted';
    };
    const userQuestions = questions.filter((question) => {
        return question.user_id === user.id;
    });
    const userAnswers = answers.filter((answer) => answer.userId === user.id);
    const handleDelete = (type, id) => {
        if (type === 'question') {
            dispatch(deleteQuestion(id));
        } else if (type === 'answer') {
            dispatch(deleteAnswer(id));
        } else if (type === 'questionVotes') {
            dispatch(deleteQuestionVotes(id));
        } else if (type === 'answerVotes') {
            dispatch(deleteAnswerVotes(id));
        }
    };
    const sortList = (list) => {
        const data = [...list];
        if (activeSort === 'newest') {
            const sortedData = data.sort((a, b) => {
                const aDate = a.createdAt ? a.createdAt : a.created_at;
                const bDate = b.createdAt ? b.createdAt : b.created_at;
                return new Date(bDate) - new Date(aDate);
            });
            return sortedData;
        } else {
            const sortedData = data.sort((a, b) => {
                let aScore;
                let bScore;
                if (typeof a.votes_score === 'number') {
                    aScore = a.votes_score;
                    bScore = b.votes_score;
                } else if (typeof a.answerScore === 'number') {
                    aScore = a.answerScore;
                    bScore = b.answerScore;
                } else if (a.question) {
                    aScore = a.question.votes_score;
                    bScore = b.question.votes_score;
                } else if (a.answer) {
                    aScore = a.answer.answerScore;
                    bScore = b.answer.answerScore;
                }
                // desending
                return bScore - aScore;
            });

            return sortedData;
        }
    };

    return (
        <div id="activity-list-container">
            <div className="total-number-container">
                <span>
                    Total <span>{activeTab}</span> number:
                </span>
                {activeTab === 'questions' && (
                    <span id="user-activity-number">
                        {userQuestions.length}
                    </span>
                )}
                {activeTab === 'answers' && (
                    <span id="user-activity-number"> {userAnswers.length}</span>
                )}
                {activeTab === 'votes' && (
                    <span id="user-activity-number">
                        {userQVotes.length + userAVotes.length}
                    </span>
                )}
            </div>

            {activeTab === 'votes' && (
                <ul className="user-activity-list-container">
                    <li className="user-activity-list column-title">
                        <p>Question</p>
                        <p>Question Score</p>
                        <p>VotedOn</p>
                        <p>Like</p>
                        <p>Manage</p>
                    </li>
                    {userQVotes.length ? (
                        sortList(userQVotes).map((qVote, idx) => (
                            <li
                                className="user-activity-list list-item"
                                key={idx}
                            >
                                <p id="question-title">
                                    {qVote.question.title}
                                </p>
                                <p>{qVote.question.votes_score}</p>
                                <p>{dateFormater(qVote.createdAt)}</p>
                                <p>{qVote.isLiked ? 'Like' : 'Dislike'}</p>

                                {user.id === currentUser.id && (
                                    <div className="activity-button-container">
                                        <DeleteButton
                                            className="button activity"
                                            type="questionVotes"
                                            id={qVote.id}
                                            onDelete={handleDelete}
                                            setIsDelete={setIsDelete}
                                        />
                                    </div>
                                )}
                            </li>
                        ))
                    ) : (
                        <li id="no-record-msg">No Recorded Questions Voted</li>
                    )}
                    <li className="user-activity-list column-title">
                        {/* <p>Question</p> */}
                        <p>Answer</p>
                        <p>Answer Score</p>
                        <p>VotedOn</p>
                        <p>Like</p>
                        <p>Manage</p>
                    </li>
                    {userAVotes.length ? (
                        sortList(userAVotes).map((aVote, idx) => (
                            <li
                                className="user-activity-list list-item"
                                key={idx}
                            >
                                {/* <p id="question-title">
                                    {getQuestion(aVote.answer.questionId).title}
                                </p> */}
                                <p id="answer-detail">{aVote.answer.details}</p>
                                <p>{aVote.answer.answerScore}</p>
                                <p>{dateFormater(aVote.createdAt)}</p>
                                <p>{aVote.isLiked ? 'Like' : 'Dislike'}</p>
                                {user.id === currentUser.id && (
                                    <div className="activity-button-container">
                                        <DeleteButton
                                            className="button activity"
                                            type="answerVotes"
                                            id={aVote.id}
                                            onDelete={handleDelete}
                                            setIsDelete={setIsDelete}
                                        />
                                    </div>
                                )}
                            </li>
                        ))
                    ) : (
                        <li id="no-record-msg">No Recorded Answers Voted</li>
                    )}
                </ul>
            )}
            {activeTab === 'questions' && (
                <ul className="user-activity-list-container">
                    <li className="user-activity-list column-title">
                        <p>Question</p>
                        <p>Question Score</p>
                        <p>Asked On</p>
                        <p>Answers</p>
                        <p>Manage</p>
                    </li>
                    {userQuestions.length ? (
                        sortList(userQuestions).map((question, idx) => (
                            <li
                                className="user-activity-list list-item"
                                key={idx}
                            >
                                <p id="question-title">{question.title}</p>
                                <p>{question.votes_score}</p>
                                <p>{dateFormater(question.created_at)}</p>
                                <p>{question.answers_count}</p>
                                {user.id === currentUser.id && (
                                    <div className="activity-button-container">
                                        <DeleteButton
                                            className="button activity"
                                            type="question"
                                            id={question.id}
                                            onDelete={handleDelete}
                                            setIsDelete={setIsDelete}
                                        />
                                    </div>
                                )}
                            </li>
                        ))
                    ) : (
                        <li id="no-record-msg">No Questions Asked</li>
                    )}
                </ul>
            )}
            {activeTab === 'answers' && (
                <ul className="user-activity-list-container">
                    <li className="user-activity-list column-title">
                        <p>Question</p>
                        <p>Answer</p>
                        <p>Answered On</p>
                        <p>Answer Score</p>
                        <p>Manage</p>
                    </li>
                    {userAnswers.length ? (
                        sortList(userAnswers).map((answer, idx) => (
                            <li
                                className="user-activity-list list-item"
                                key={idx}
                            >
                                <p id="question-title">
                                    {getQuestion(answer.questionId).title}
                                </p>
                                {/* <p>{answer.details}</p> */}
                                <div id="centerAnswer">
                                    {parse(answer.details)}
                                </div>
                                <p>{dateFormater(answer.createdAt)}</p>
                                <p>{answer.answerScore}</p>

                                <div className="activity-button-container">
                                    <DeleteButton
                                        className="button activity"
                                        type="answer"
                                        id={answer.id}
                                        onDelete={handleDelete}
                                        setIsDelete={setIsDelete}
                                    />
                                </div>
                            </li>
                        ))
                    ) : (
                        <li id="no-record-msg">No Recorded Answers Asked</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default ActivityList;
