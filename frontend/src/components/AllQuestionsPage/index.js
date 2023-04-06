import { useEffect } from 'react';
import { getAllQuestions } from '../../store/questions';

const { useSelector, useDispatch } = require('react-redux');

const AllQuestionsPage = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions.allQuestions);
    const loading = useSelector((state) => state.questions.loading);

    useEffect(() => {
        console.log('Questions updated:', questions);
    }, [questions]);

    useEffect(() => {
        dispatch(getAllQuestions());
    }, []);

    if (loading) {
        return <div>Loading . . .</div>;
    }

    return (
        <div className="container">
            <div id="all-questions-header">
                <div className="col-3">
                    <h1>All Questions</h1>
                    <p>Total questions number</p>
                </div>
                <div className="col-3">
                    <button id="newest-button">Newest</button>
                    <button id="unanswered-button">Unanswered</button>
                    <button id="score-button">Score</button>
                </div>
                <div className="col-3">
                    <button id="ask-question-button">Ask Question</button>
                </div>
            </div>
            <div id="question-list">
                {questions.map(
                    ({ id, title, details, votes_score, answers_count }) => (
                        <div id="question-card" key={id}>
                            <div id="vote-answer-counts-col">
                                <p>{votes_score}</p>
                                <p>{answers_count}</p>
                            </div>

                            <div id="title-description-col">
                                <h4>{title}</h4>
                                <h4>{details}</h4>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default AllQuestionsPage;
