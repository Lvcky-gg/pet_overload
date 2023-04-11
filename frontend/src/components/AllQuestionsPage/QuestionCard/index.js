import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectVoteStatus } from '../../../store/questionVotes';
import { useSelector } from 'react-redux';

import './QuestionCard.css';

const QuestionCard = ({ id, title, details, votes_score, answers_count }) => {
    const upvoteArrowRef = useRef(null);
    const downvoteArrowRef = useRef(null);
    const currentVote = useSelector((state, id) => id);

    const answers_msg = answers_count === 1 ? 'answer' : 'answers';

    const handleVoteArrowClick = (arrowRef) => {
        arrowRef.current.classList.add('fa-beat');

        setTimeout(() => {
            arrowRef.current.classList.remove('fa-beat');
        }, 800);
    };

    return (
        <div className="question-card">
            <div className="row">
                <div className="voting-score">
                    <FontAwesomeIcon
                        className="upvote-arrow"
                        icon="fa-up-long"
                        ref={upvoteArrowRef}
                        onClick={() => handleVoteArrowClick(upvoteArrowRef)}
                    />
                    <p className="voting-score-value">{votes_score}</p>
                    <FontAwesomeIcon
                        className="downvote-arrow"
                        icon="fa-down-long"
                        ref={downvoteArrowRef}
                        onClick={() => handleVoteArrowClick(downvoteArrowRef)}
                    />
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
