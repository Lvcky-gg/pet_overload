import { useEffect } from 'react';
import { getAllQuestions } from '../../store/questions';
import { getAllAnswers } from '../../store/answers';
import QuestionCard from './QuestionCard';
import Button from '../Button';
import './AllQuestionsPage.css';
import Sidebar from '../Sidebar';

const { useSelector, useDispatch } = require('react-redux');

const AllQuestionsPage = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.allQuestions);
    const loading = useSelector((state) => state.questions.loading);
    const answers = useSelector((state)=>state.answers.allAnswers)
    
    // for (let i = 0; i < answers.length; i++){
    //     if(answers[i].questionId){
    //         console.log(answers[i])
    //     }
    // }
    useEffect(() => {
        dispatch(getAllQuestions());
        dispatch(getAllAnswers())
    }, []);

    if (loading) {
        return null;
    }

    return (
        // <div className="questionPage">
        //     <Sidebar/>
        <div className="container" id="all-questions-container">
        {/* <Sidebar/> */}
            <div className="all-questions-header">
                <h1>All Questions</h1>
                <div className="ask-question-container">
                    <button id="ask-question-button" className="button">
                        Ask a question
                    </button>
                </div>
            </div>
            <div className="filter-row">
                <div className="question-count-container">
                    <p className="question-count">
                        {questions.length} questions
                    </p>
                </div>
                <div className="filter-options">
                    <Button id="newest-button" text="Newest" />
                    <Button id="unanswered-button" text="Unanswered" />
                    <Button id="score-button" text="Score" />
                </div>
            </div>
            <div id="question-list">
                {questions.map(
                    ({ id, title, details, votes_score, answers_count }) => (
                        <QuestionCard
                            key={id}
                            id={id}
                            title={title}
                            details={details}
                            votes_score={votes_score}
                            answers_count={answers_count}
                        />
                    )
                )}
            </div>
        </div>
        // </div>
    );
};

export default AllQuestionsPage;
