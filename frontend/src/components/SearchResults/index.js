import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { filterQuestions } from '../../store/questions';

import QuestionCard from '../AllQuestionsPage/QuestionCard';
import Button from '../Button';

import './SearchResults.css';
import { useNavigate } from 'react-router-dom';
const { useSelector, useDispatch } = require('react-redux');

const SearchResults = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const parameter = location.search;
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.allQuestions);
    const loading = useSelector((state) => state.questions.loading);
    const error = useSelector((state) => state.questions.error);
    useEffect(() => {
        dispatch(filterQuestions(parameter));
    }, [dispatch, parameter]);

    const navigateToAskAQuestionPage = () => {
        // Navigate to the route '/all-questions/ask-a-question'
        navigate('/all-questions/ask-a-question');
    };
    if (loading) {
        return null;
    }

    return (
        <div className="container" id="all-questions-container">
            <div className="all-questions-header">
                <h1>Search Results</h1>
                <div className="ask-question-container">
                    <button
                        id="ask-question-button"
                        className="button"
                        onClick={navigateToAskAQuestionPage}
                    >
                        Ask a question
                    </button>
                </div>
            </div>
            <div className="filter-row">
                <div className="question-count-container">
                    <p className="question-count">{questions.length} results</p>
                </div>
                <div className="filter-options">
                    <Button id="newest-button" text="Newest" />
                    <Button id="unanswered-button" text="Unanswered" />
                    <Button id="score-button" text="Score" />
                </div>
            </div>
            <div id="question-list">
                {!questions.length || error ? (
                    <p>No Result Found.</p>
                ) : (
                    questions.map(
                        ({
                            id,
                            title,
                            details,
                            votes_score,
                            answers_count,
                            user,
                            created_at,
                            updated_at,
                        }) => (
                            <QuestionCard
                                key={id}
                                id={id}
                                title={title}
                                details={details}
                                votes_score={votes_score}
                                answers_count={answers_count}
                                user={user}
                                created_at={created_at}
                                updated_at={updated_at}
                            />
                        )
                    )
                )}
            </div>
        </div>
    );
};

export default SearchResults;
