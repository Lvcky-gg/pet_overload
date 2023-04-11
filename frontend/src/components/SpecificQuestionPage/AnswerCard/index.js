import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import session from '../../../store/session';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const AnswerCard = ({details, votes_score, user_id }) => {
    const dispatch = useDispatch()
    const upvoteArrowRef = useRef(null);
    const downvoteArrowRef = useRef(null);
    const sessionUser = useSelector((state) => state.session.user);

    const handleVoteArrowClick = (arrowRef) => {
        arrowRef.current.classList.add('fa-beat');

        setTimeout(() => {
            arrowRef.current.classList.remove('fa-beat');
        }, 800);
    };
    const handleAlertClick = (e) => {
        e.preventDefault()
        let txt;
        if (window.confirm("Are you sure?")) {
            txt = true;
          } else {
            txt = false;
          }
          console.log(sessionUser.user.id)
          
    }

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
                    {sessionUser.user.id===user_id &&(<button id="answerCardButton" className='modalButton' onClick={handleAlertClick}>Delete</button>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnswerCard;
