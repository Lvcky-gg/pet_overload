import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAllQuestions, filterQuestions } from '../../store/questions';
import { getAllAnswers } from '../../store/answers';
import QuestionCard from './QuestionCard';
import Button from '../Button';
import './AllQuestionsPage.css';

const { useSelector, useDispatch } = require('react-redux');

const AllQuestionsPage = () => {
    const location = useLocation();
    const parameter = location.search;
    console.log('location', parameter);
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.allQuestions);
    const loading = useSelector((state) => state.questions.loading);
    const answers = useSelector((state) => state.answers.allAnswers);

    useEffect(() => {
        if (!parameter) {
            console.log('inside if');
            dispatch(getAllQuestions());
            dispatch(getAllAnswers());
        } else {
            console.log('inside else');
            dispatch(filterQuestions(parameter));
        }
    }, [parameter, dispatch]);
    console.log('question', questions);
    if (loading) {
        return null;
    }

    return (
        <div className="container" id="all-questions-container">
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
    );
};

export default AllQuestionsPage;
