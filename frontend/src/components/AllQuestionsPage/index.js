import { useEffect } from 'react';
import { getAllQuestions } from '../../store/questions';
import { getAllAnswers } from '../../store/answers';
import QuestionCard from './QuestionCard';
import Button from '../Button';

import './AllQuestionsPage.css';

const { useSelector, useDispatch } = require('react-redux');

const AllQuestionsPage = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.allQuestions);
    const loading = useSelector((state) => state.questions.loading);
    const answers = useSelector((state)=>state.answers.allAnswers)

    useEffect(() => {
        dispatch(getAllQuestions());
        dispatch(getAllAnswers())
    }, []);

    if (loading) {
        return <div>Loading . . .</div>;
    }

    return (
        <div className="container">
            <div id="all-questions-header" className="flex-row">
                <div className="col-3">
                    <h1>All Questions</h1>
                    <p>{questions.length} questions</p>
                </div>
                <div id="filter-by-col" className="col-3">
                    <h5>Filter by</h5>
                    <div className="flex-row">
                        <Button id="newest-button" text="Newest" />
                        <Button id="unanswered-button" text="Unanswered" />
                        <Button id="score-button" text="Score" />
                    </div>
                </div>
                <div className="col-3">
                    <button id="ask-question-button" className="button">
                        Ask a question
                    </button>
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
