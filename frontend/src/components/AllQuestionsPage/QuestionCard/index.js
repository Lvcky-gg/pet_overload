import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { selectVoteStatus, deleteQuestionVoteById, updateQuestionVoteById, createQuestionVote } from '../../../store/questionVotes';
import { useDispatch, useSelector } from 'react-redux';

import './QuestionCard.css';
import { NavLink } from 'react-router-dom';
import { updateQuestionAfterVote } from '../../../store/questions';

const QuestionCard = ({ id, title, details, votes_score: voteScore, answers_count, showAnswers }) => {
    const upvoteArrowRef = useRef(null);
    const downvoteArrowRef = useRef(null);
    const { questionId } = useParams();
    const currentVote = useSelector((state) => selectVoteStatus(state.questionVotes, id));
    const dispatch = useDispatch();

    const [currentVoteScore, setCurrentVoteScore] = useState(voteScore);

    const voteType = {
        UPVOTE: 1,
        DOWNVOTE: -1,
        NO_VOTE: 0,
    };

    const [currentVoteType, setCurrentVoteType] = useState(currentVote ? currentVote.vote_status : voteType.NO_VOTE);
    const answersMessage = answers_count === 1 ? 'answer' : 'answers';

    useEffect(() => {
        setCurrentVoteType(currentVote ? (currentVote.isLiked ? voteType.UPVOTE : voteType.DOWNVOTE) : voteType.NO_VOTE);
    }, [currentVote])

    useEffect(() => {
        if (currentVoteType === voteType.UPVOTE) {
            upvoteArrowRef.current.classList.add('selected');
            downvoteArrowRef.current.classList.remove('selected');
        } else if (currentVoteType === voteType.DOWNVOTE) {
            downvoteArrowRef.current.classList.add('selected');
            upvoteArrowRef.current.classList.remove('selected');
        } else {
            upvoteArrowRef.current.classList.remove('selected');
            downvoteArrowRef.current.classList.remove('selected');
        }
    }, [currentVoteType])

    const handleVoteArrowClick = async (arrowRef) => {
        const { current } = arrowRef;
        const { UPVOTE, DOWNVOTE, NO_VOTE } = voteType;
    
        current.classList.add('fa-beat');
        setTimeout(() => current.classList.remove('fa-beat'), 800);
    
        const voteTypeClicked = current.classList.contains('upvote-arrow') ? UPVOTE : DOWNVOTE;
    
        const updateVoteScore = (updatedQuestion) => {
            dispatch(updateQuestionAfterVote(updatedQuestion));
            setCurrentVoteScore(updatedQuestion.votes_score);
        };
    
        if (!currentVote || currentVote.voteStatus === NO_VOTE) {
            const questionVote = await dispatch(createQuestionVote({ questionId: id, isLiked: voteTypeClicked }, voteTypeClicked));
            updateVoteScore(questionVote.payload.question);
        } else if (currentVoteType === voteTypeClicked) {
            dispatch(deleteQuestionVoteById({ questionVoteId: currentVote.id }));
            setCurrentVoteScore(currentVoteScore + (voteTypeClicked === UPVOTE ? -1 : 1));
        } else {
            const updatedQuestionVote = await dispatch(updateQuestionVoteById({ questionVoteId: currentVote.id, isLiked: voteTypeClicked }, voteTypeClicked));
            updateVoteScore(updatedQuestionVote.payload.question);
        }
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
                    <p className="voting-score-value">{currentVoteScore}</p>
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
