import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionCard from "../AllQuestionsPage/QuestionCard";
import { getAllAnswers } from "../../store/answers";
import { getAllQuestions } from "../../store/questions";
import  './SpecificQuestion.css'
import AnswerCard from "./AnswerCard";
import RichEditor from "../RichTextEditor";
import { createAnswerByQuestion } from "../../store/answers";

const { useSelector, useDispatch } = require('react-redux');




const SpecificQuestion = () => {
    const [hidden, setHidden] = useState(false)
    const [editor, setEditor] = useState(false)
    
    const questions = useSelector((state) => state.questions.allQuestions);
    const loading = useSelector((state) => state.questions.loading);
    const answers = useSelector((state)=>state.answers.allAnswers);
    const dispatch = useDispatch()

    const {questionId} = useParams()
    const showAnswers = (e) => {
        setHidden(!hidden)
    }
    const showEditor = (e) => {
        e.preventDefault()
        setEditor(!editor)
    }

    useEffect(() => {
        dispatch(getAllQuestions());
        dispatch(getAllAnswers())
    }, []);
    const handleEditorSubmit = (details, e) => {
        // e.preventDefault()
        const val = dispatch(createAnswerByQuestion({details:details},questionId))
        return val
        

    }

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
    // const {id, title, details, votes_score, answers_count} = question[0]

    
    const answer = answers.filter((answer)=> +questionId === answer.questionId)


    return ( 
    <>
        {question && (<div className="container" id="Single-questions-container">

            {/* <div>
                <h1>{title}</h1>
            </div> */}
                <div className="all-questions-header">
                <h1>{title}</h1>
                <div className="ask-question-container">
                    <button id="ask-question-button" className="button" onClick={showEditor}>
                        Answer question
                    </button>
                </div>
            </div>
            {editor && <RichEditor handleEditorSubmit={handleEditorSubmit} questionId={questionId}/>}

           <QuestionCard
            key={id}
            id={id}
            // title={title}
            details={details}
            votes_score={votes_score}
            showAnswers={showAnswers}

            answers_count={answers_count}></QuestionCard> 

            <div>
            {hidden && answer.map(
                ({id,details, votes_score }) => (
                    <AnswerCard
                    key = {id}
                    id={id}
                    details={details}
                    votes_score={votes_score}
                    user_id={user_id}
                    ></AnswerCard>
                )
            )}
            

            </div>  
        </div>)}
        </>)
    
}

export default SpecificQuestion