import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AnswerCard = ({details, votes_score }) => {
    const upvoteArrowRef = useRef(null);
    const downvoteArrowRef = useRef(null);

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
                    <p>{details}</p>
                    <div className='answerCardButtonContainer'>
                    <button id="answerCardButton" className='modalButton'>Edit</button>
                    <button id="answerCardButton" className='modalButton'>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnswerCard;
