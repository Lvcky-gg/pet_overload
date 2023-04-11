import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectVoteStatus } from '../../../store/questionVotes';
import { useSelector } from 'react-redux';

import './QuestionCard.css';
import { NavLink } from 'react-router-dom';

const QuestionCard = ({ id, title, details, votes_score, answers_count, showAnswers, answersMessage }) => {
    // const [hidden, setHidden] = useState(false);
    const upvoteArrowRef = useRef(null);
    const downvoteArrowRef = useRef(null);
    // const currentVote = useSelector((state, id) => id);
    const { questionId } = useParams();

    // const answersMessage = answers_count === 1 ? 'answer' : 'answers';

    const handleVoteArrowClick = (arrowRef) => {
        arrowRef.current.classList.add('fa-beat');

        setTimeout(() => {
            arrowRef.current.classList.remove('fa-beat');
        }, 800);
    };

    const className = questionId ? 'answers-msg true' : 'answers-msg';

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
                    <NavLink to={`/all-questions/${id}`}>
                        <h2>{title}</h2>
                    </NavLink>
                    <p>{details}</p>
                    <p className={className} onClick={showAnswers}>
                        {answers_count} {answersMessage}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
