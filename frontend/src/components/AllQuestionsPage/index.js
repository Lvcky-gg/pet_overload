import { useEffect, useState } from 'react';
import { getAllAnswers } from '../../store/answers';
import { getAllQuestions } from '../../store/questions';
import QuestionCard from './QuestionCard';
import './AllQuestionsPage.css';
import { getQuestionVotes } from '../../store/questionVotes';

import SortingTabs from './SortingTabs/SortingTabs';
const { useSelector, useDispatch } = require('react-redux');

const AllQuestionsPage = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.questions.loading);
    const questions = useSelector(
        (state) => state.questions.displayedQuestions
    );
    const [voteClicked, setVoteClicked] = useState(false);

    useEffect(() => {
        dispatch(getAllQuestions());
        dispatch(getAllAnswers());
        dispatch(getQuestionVotes());
    }, [dispatch, voteClicked]);

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
            <SortingTabs questions={questions} />
            <div id="question-list">
                {questions.map(
                    ({
                        id,
                        title,
                        details,
                        votes_score,
                        answers_count,
                        answers,
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
                            answers={answers}
                            created_at={created_at}
                            updated_at={updated_at}
                            setVoteClicked={setVoteClicked}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default AllQuestionsPage;
