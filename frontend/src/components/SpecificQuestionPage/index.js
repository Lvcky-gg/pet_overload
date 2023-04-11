import React,{ useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionCard from "../AllQuestionsPage/QuestionCard";
import { getAllAnswers } from "../../store/answers";
import { getAllQuestions } from "../../store/questions";
import  './SpecificQuestion.css'

const { useSelector, useDispatch } = require('react-redux');




const SpecificQuestion = () => {
    const questions = useSelector((state) => state.questions.allQuestions);
    const loading = useSelector((state) => state.questions.loading);
    const answers = useSelector((state)=>state.answers.allAnswers);
    const dispatch = useDispatch()

    const {questionId} = useParams()


    useEffect(() => {
        dispatch(getAllQuestions());
        dispatch(getAllAnswers())
    }, []);

    if (loading) {
        return null;
    }
    let id;
    let title;
    let details;
    let votes_score;
    let answers_count;

    const question = questions.filter((question)=>+questionId === question.id)
    console.log(question)
    if (question){
        id = question[0].id
        title = question[0].title
        details = question[0].details
        votes_score= question[0].votes_count
        answers_count = question[0].answers_count

    }
    // const {id, title, details, votes_score, answers_count} = question[0]

    
    const answer = answers.filter((answer)=> +questionId === answer.questionId)
    console.log(answer)

    return ( 
    <>
        {question && (<div className="container" id="Single-questions-container">

            {/* <div>
                <h1>{title}</h1>
            </div> */}
                <div className="all-questions-header">
                <h1>{title}</h1>
                <div className="ask-question-container">
                    <button id="ask-question-button" className="button">
                        Ask a question
                    </button>
                </div>
            </div>

           <QuestionCard
            key={id}
            id={id}
            // title={title}
            details={details}
            votes_score={votes_score}
            answers_count={answers_count}></QuestionCard> 

            
        </div>)}
        </>)
    
}

export default SpecificQuestion