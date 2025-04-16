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
    interface Question {
        id: number;
        title: string;
        details: string;
        votes_score: number;
        answers_count: number;
        user: string;
        created_at: string | null;
        updated_at: string;
    }

    const questions = useSelector(
        (state: any): Question[] => state.questions.allQuestions
    );
    const loading = useSelector((state: any) => state.questions.loading);
    const error = useSelector((state: any) => state.questions.error);
    useEffect(() => {
        dispatch(filterQuestions());
    }, [dispatch, parameter]);

    const navigateToAskAQuestionPage = () => {
        // Navigate to the route '/all-questions/ask-a-question'
        navigate('/all-questions/ask-a-question');
    };
    if (loading) {
        return null;
    }

    return (
        <div className='container' id='all-questions-container'>
            <div className='all-questions-header'>
                <h1>Search Results</h1>
                <div className='ask-question-container'>
                    <button
                        id='ask-question-button'
                        className='button'
                        onClick={navigateToAskAQuestionPage}
                    >
                        Ask a question
                    </button>
                </div>
            </div>
            <div className='filter-row'>
                <div className='question-count-container'>
                    <p className='question-count'>{questions.length} results</p>
                </div>
                <div className='filter-options'>
                    <Button
                        id='newest-button'
                        text='Newest'
                        onClickHandler={undefined}
                    />
                    <Button
                        id='unanswered-button'
                        text='Unanswered'
                        onClickHandler={undefined}
                    />
                    <Button
                        id='score-button'
                        text='Score'
                        onClickHandler={undefined}
                    />
                </div>
            </div>
            <div id='question-list'>
                {!questions.length || error ? (
                    <p>No Result Found.</p>
                ) : (
                    questions.map((question: Question) => {
                        const {
                            id,
                            title,
                            details,
                            votes_score,
                            answers_count,
                            user,
                            created_at,
                            updated_at,
                        } = question;
                        return (
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
                                showAnswers={undefined}
                                setVoteClicked={undefined}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default SearchResults;
