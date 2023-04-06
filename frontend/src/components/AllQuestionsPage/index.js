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
            </div>
            <div id="question-list">Questions will load here TODO</div>
        </div>
    );
};

export default AllQuestionsPage;
