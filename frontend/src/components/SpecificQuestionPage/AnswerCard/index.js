import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import session from '../../../store/session';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import RichEditor from '../../RichTextEditor';
import parse from 'html-react-parser'

import { deleteAnswer, getAllAnswers } from '../../../store/answers';
import DeleteButton from '../../UserProfile/ActivityLists/DeleteButton';
import { authenticate } from '../../../store/session';
import { redirect } from 'react-router-dom';
import { updateAnswerByQuestion } from '../../../store/answers';
import { getAllQuestions } from '../../../store/questions';


const AnswerCard = ({details, votes_score, userId, id, isDelete, setIsDelete}) => {
    const [richTextEditor, setRichTextEditor] = useState(false)
   
    const dispatch = useDispatch()

    const upvoteArrowRef = useRef(null);
    const downvoteArrowRef = useRef(null);
    const sessionUser = useSelector((state) => state.session.user);
    const answerId = id
    const handleVoteArrowClick = (arrowRef) => {
        arrowRef.current.classList.add('fa-beat');

        setTimeout(() => {
            arrowRef.current.classList.remove('fa-beat');
        }, 800);
    };




    const handleDelete = () => {
        dispatch(deleteAnswer(answerId))
        dispatch(getAllAnswers())
        dispatch(getAllQuestions())

    }



    const handleEditorSubmit = (e, { details, answerId }) => {
        e.preventDefault();
        const val = dispatch(
            updateAnswerByQuestion({ details: details, answerId: answerId })
        ); 
        return val;
    };



    const handleEditClick = (e) => {

        e.preventDefault();
        setRichTextEditor(!richTextEditor);
    };
    useEffect(() => {}, [richTextEditor]);

    return (
        <div className="answer-card">
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
                    <div>{parse(details)}</div>

                    

                    {sessionUser.id === userId &&(

                    <div className='answerCardButtonContainer'>
                        <button id="answerCardButton" className='modalButton' onClick={handleEditClick}>Edit</button>
                        <DeleteButton className="modalButton" onDelete={handleDelete} setIsDelete={setIsDelete} type="answer" id={answerId}></DeleteButton>
                    </div>

                    )}
                </div>
            </div>
            {richTextEditor && (
                <div>
                    <RichEditor
                        details={details}
                        answerId={id}
                        handleEditorSubmit={handleEditorSubmit}
                        richTextEditor={richTextEditor}
                        setRichTextEditor={setRichTextEditor}
                    ></RichEditor>
                </div>
            )}
        </div>
    );
};

export default AnswerCard;
