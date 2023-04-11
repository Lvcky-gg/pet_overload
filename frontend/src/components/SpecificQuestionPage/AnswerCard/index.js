import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import session from '../../../store/session';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import RichEditor from '../../RichTextEditor';


const AnswerCard = ({details, votes_score, user_id }) => {
    const [richTextEditor, setRichTextEditor] = useState(false)
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
    const handleDeleteClick = (e) => {
        e.preventDefault()
        let txt;
        if (window.confirm("Are you sure?")) {
            txt = true;
          } else {
            txt = false;
          }
          console.log(txt)
          //here we can delete
    }

    const handleEditClick = (e) => {
        e.preventDefault()
        setRichTextEditor(!richTextEditor)
    }
    useEffect(()=>{},[richTextEditor])
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
                    
                    
                    {sessionUser.user.id===user_id &&(
                    <div className='answerCardButtonContainer'>
                        <button id="answerCardButton" className='modalButton' onClick={handleEditClick}>Edit</button>
                        <button id="answerCardButton" className='modalButton' onClick={handleDeleteClick}>Delete</button>
                    </div>
                    )}
                    
                </div>
            </div>
            {richTextEditor && (<div><RichEditor details={details}></RichEditor></div>)}
        </div>
    );
};

export default AnswerCard;
