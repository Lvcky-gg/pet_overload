import { useEffect } from 'react';
import { getAllAnswers } from '../../store/answers';
import {
    getAllQuestions,
    sortQuestionsByNewest,
    sortQuestionsByScore,
    filterQuestionsByUnanswered,
} from '../../store/questions';
import QuestionCard from './QuestionCard';
import Button from '../Button';
import './AllQuestionsPage.css';
import { getQuestionVotes } from '../../store/questionVotes';
import { createAnswerByQuestion } from '../../store/answers';
// import Sidebar from '../Sidebar';

const { useSelector, useDispatch } = require('react-redux');

const AllQuestionsPage = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.questions.loading);
    const questions = useSelector(
        (state) => state.questions.displayedQuestions
    );

    // const answers = useSelector((state) => state.answers.allAnswers);
    useEffect(() => {
        dispatch(getAllQuestions());
        dispatch(getAllAnswers());
        dispatch(getQuestionVotes());
    }, [dispatch]);

    const sortByNewest = () => {
        dispatch(sortQuestionsByNewest());
    };

    const sortByScore = () => {
        dispatch(sortQuestionsByScore());
    };

    const filterByUnanswered = () => {
        dispatch(filterQuestionsByUnanswered());
    };

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
                    <Button
                        id="newest-button"
                        text="Newest"
                        onClickHandler={sortByNewest}
                    />
                    <Button
                        id="unanswered-button"
                        text="Unanswered"
                        onClickHandler={filterByUnanswered}
                    />
                    <Button
                        id="score-button"
                        text="Score"
                        onClickHandler={sortByScore}
                    />
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
