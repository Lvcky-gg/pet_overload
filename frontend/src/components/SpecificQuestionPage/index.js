import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionCard from '../AllQuestionsPage/QuestionCard';
import { getAllAnswers } from '../../store/answers';
import { getAllQuestions } from '../../store/questions';
import './SpecificQuestion.css';
import AnswerCard from './AnswerCard';
import RichEditor from '../RichTextEditor';
import { createAnswerByQuestion } from '../../store/answers';

const { useSelector, useDispatch } = require('react-redux');

const SpecificQuestion = () => {

    const [richTextEditor, setRichTextEditor] = useState(false)

    const [hidden, setHidden] = useState(false)
    const [isDelete, setIsDelete] = useState(false);
    

    const questions = useSelector((state) => state.questions.allQuestions);
    const loading = useSelector((state) => state.questions.loading);
    const answers = useSelector((state) => state.answers.allAnswers);
    const dispatch = useDispatch();

    const { questionId } = useParams();
    const showAnswers = (e) => {
        setHidden(!hidden);
    };
    const showEditor = (e) => {
        e.preventDefault();
        setRichTextEditor(!richTextEditor);
    };

    useEffect(() => {
        dispatch(getAllQuestions());
        if(answers.length === 0){
            setHidden(false)
            dispatch(getAllAnswers())
        }

        dispatch(getAllAnswers())
    }, [isDelete, richTextEditor]);


    const handleEditorSubmit = (e, { details, questionId }) => {
        e.preventDefault();
        const val = dispatch(
            createAnswerByQuestion({ details: details, questionId: questionId })
        );
        dispatch(getAllAnswers())
        return val;
    };

    if (loading) {
        return null;
    }
    let id;
    let title;
    let details;
    let votes_score;
    let answers_count;
    let user_id;


    const question = questions.filter((question)=>+questionId === question.id)
    if (question[0]){
        id = question[0].id
        title = question[0].title
        details = question[0].details
        votes_score= question[0].votes_count
        answers_count = question[0].answers_count
        user_id = question[0].user_id

    }
    const answer = answers.filter((answer)=> +questionId === answer.questionId)


    return (
        <>
            {question && (
                <div className="container" id="Single-questions-container">
                    {/* <div>
                <h1>{title}</h1>
            </div> */}
                    <div className="all-answer-header">
                        <h1>{title}</h1>
                        <div className="ask-question-container">
                            <button
                                id="ask-question-button"
                                className="button"
                                onClick={showEditor}
                            >
                                Answer question
                            </button>
                        </div>
                    </div>
                    {richTextEditor && (
                        <RichEditor
                            handleEditorSubmit={handleEditorSubmit}
                            questionId={questionId}
                            setRichTextEditor={setRichTextEditor}
                            richTextEditor={richTextEditor}
                        />
                    )}
           <QuestionCard
           className="qCard"
            key={id}
            id={id}
            // title={title}
            details={details}
            votes_score={votes_score}
            showAnswers={showAnswers}

            answers_count={answers_count}></QuestionCard> 

            <div className="answerHolder">
            {hidden && answer.map(
                (a) => (
                    <AnswerCard
                    key = {a.id}
                    id={a.id}
                    details={a.details}
                    votes_score={votes_score}
                    userId={a.userId}
                    isDelete={isDelete}
                    setIsDelete={setIsDelete}
                    ></AnswerCard>

            ))}
            </div>
            </div>)}
            
        </>
        )

};

export default SpecificQuestion;
