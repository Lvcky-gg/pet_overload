import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllAnswers } from '../../store/answers';
import { getAllQuestions } from '../../store/questions';
import './SpecificQuestion.css';

import RichEditor from '../RichTextEditor';
import { createAnswerByQuestion } from '../../store/answers';

import Question from './Question/Question';
import Answers from './Answers';
import { getAnswerVotes } from '../../store/answerVotes';

/*
import { getQuestionVotes } from '../../store/questionVotes';
import session from '../../store/session';
*/

const { useSelector, useDispatch } = require('react-redux');

const SpecificQuestion = () => {
    const dispatch = useDispatch();
    const { questionId } = useParams();
    const questions = useSelector((state) => state.questions.allQuestions);

   /*
    const answers = useSelector((state) => state.answers.allAnswers);
    const questionVotes = useSelector((state)=>state.questionVotes.questionVotes);
    const sessionUser = useSelector((state) => state.session.user);
    /*


    const loading = useSelector((state) => state.questions.loading);

    const [richTextEditor, setRichTextEditor] = useState(false);
    // const [hidden, setHidden] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [voteClicked, setVoteClicked] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const showEditor = (e) => {
        e.preventDefault();
        setRichTextEditor(!richTextEditor);
    };

    useEffect(() => {
        dispatch(getAllQuestions());
        dispatch(getAllAnswers());
        dispatch(getAnswerVotes());

        // if (answers.length === 0) {
        //     setHidden(false);
        //     dispatch(getAllAnswers());
        // }
    }, [isDelete, richTextEditor, voteClicked, dispatch, isCreated, isUpdated]);

    const handleEditorSubmit = (e, { details, questionId }) => {
        e.preventDefault();
        const val = dispatch(
            createAnswerByQuestion({ details: details, questionId: questionId })
        );
        setIsCreated((prev) => !prev);
        dispatch(getAllAnswers());
        return val;
    };

    if (loading) {
        return null;
    }

    const question = questions.find((question) => question.id === +questionId);


    let answers_count, answers;
    if (question) {
        ({ answers_count, answers } = question);

    /*const question = questions.filter((question)=>+questionId === question.id)
    if (question[0]){
        id = question[0].id
        title = question[0].title
        details = question[0].details
        votes_score= question[0].votes_score
        answers_count = question[0].answers_count
        user_id = question[0].user_id
        created_at = question[0].created_at
        updated_at = question[0].updated_at
        user = question[0].user*/

    }
    return (
        <>
            {question && (
                <div className="container" id="Single-questions-container">

                    <Question question={question} setIsDelete={setIsDelete} />
                    {answers_count > 0 && (
                        <>
                            <h2>{answers_count} Answers</h2>
                            {/* pass state to show texteditor or not */}
                            <Answers
                                answers={answers}
                                setVoteClicked={setVoteClicked}
                                setIsDelete={setIsDelete}
                                setIsUpdated={setIsUpdated}
                            />
                        </>
                        )}

                   /* <div className="all-answer-header">
                        <h1>{title}</h1>
                        <div className="ask-question-container">
                            {sessionUser &&<button
                                id="ask-question-button"
                                className="button"
                                onClick={showEditor}
                            >
                                Answer question
                            </button>}
                        </div>
                    </div>
                    {richTextEditor && (
                        <RichEditor
                            handleEditorSubmit={handleEditorSubmit}
                            questionId={questionId}
                            setRichTextEditor={setRichTextEditor}
                            richTextEditor={richTextEditor}*/
                        />

                    )}
                    <h2>Your Answer</h2>
                    {/* create answer editor */}
                    <RichEditor
                        handleEditorSubmit={handleEditorSubmit}
                        questionId={questionId}
                        setRichTextEditor={setRichTextEditor}
                        richTextEditor={richTextEditor}
                    />
                </div>
            )}
        </>
    );
};

export default SpecificQuestion;
