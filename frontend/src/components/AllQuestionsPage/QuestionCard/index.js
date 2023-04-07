import './QuestionCard.css';

const QuestionCard = ({ title, details, votes_score, answers_count }) => {
    const answers_msg = answers_count === 1 ? 'answer' : 'answers';

    return (
        <div className="question-card">
            <div className="row">
                <div id="voting-score">
                    <p>Up</p>
                    <p className="voting-score-value">{votes_score}</p>
                    <p>Down</p>
                </div>

                <div className="title-description-col">
                    <h2>{title}</h2>
                    <p>{details}</p>
                    <p className="answers-msg">
                        {answers_count} {answers_msg}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
