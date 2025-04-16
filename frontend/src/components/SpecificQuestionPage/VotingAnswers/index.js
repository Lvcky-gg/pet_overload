import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
    answerVoteStatus,
    deleteAnswerVoteById,
    updateAnswerVotes,
    createAnswerVote,
} from '../../../store/answerVotes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateAnswerAfterVote } from '../../../store/answers';
import { setRedirectMessage } from '../../../store/session';
import { useNavigate } from 'react-router-dom';
const VotingAnswers = ({ answerId, answerScore }) => {
    const [currentVoteScore, setCurrentVoteScore] = useState(answerScore);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const currentUser = useSelector((state) => state.session.user);
    const navigate = useNavigate();

    const upvoteArrowRef = useRef(null);
    const downvoteArrowRef = useRef(null);
    const currentVote = useSelector((state) =>
        answerVoteStatus(state.answerVotes, answerId)
    );
    const voteType = {
        UPVOTE: 1,
        DOWNVOTE: -1,
        NO_VOTE: 0,
    };

    const dispatch = useDispatch();
    const [currentVoteType, setCurrentVoteType] = useState(
        currentVote ? currentVote.vote_status : voteType.NO_VOTE
    );
    useEffect(() => {
        setCurrentVoteType(
            currentVote
                ? currentVote.isLiked
                    ? voteType.UPVOTE
                    : voteType.DOWNVOTE
                : voteType.NO_VOTE
        );
    }, [
        currentVote,
        voteType.UPVOTE,
        voteType.DOWNVOTE,
        voteType.NO_VOTE,
        setCurrentVoteType,
    ]);
    useEffect(() => {
        if (!currentUser) {
            upvoteArrowRef.current.classList.remove('selected');
            downvoteArrowRef.current.classList.remove('selected');
        }
    }, [currentUser]);

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
    }, [currentVoteType, voteType.UPVOTE, voteType.DOWNVOTE]);

    const handleVoteArrowClick = async (arrowRef) => {
        if (!currentUser) {
            setShouldRedirect(true);
            return;
        }
        const { current } = arrowRef;
        const { UPVOTE, DOWNVOTE, NO_VOTE } = voteType;

        current.classList.add('fa-beat');
        setTimeout(() => current.classList.remove('fa-beat'), 800);

        const voteTypeClicked = current.classList.contains('upvote-arrow')
            ? UPVOTE
            : DOWNVOTE;

        const updateVoteScore = (updatedAnswer) => {
            if (!updatedAnswer) {
                console.error('updatedAnswer is undefined');
                return;
            }
            dispatch(updateAnswerAfterVote(updatedAnswer));

            setCurrentVoteScore(updatedAnswer.answerScore);
        };

        if (!currentVote || currentVote.voteStatus === NO_VOTE) {
            const answerVote = await dispatch(
                createAnswerVote(
                    { answerId: answerId, isLiked: voteTypeClicked },
                    voteTypeClicked
                )
            );
            updateVoteScore(answerVote.payload.answer);
        } else if (currentVoteType === voteTypeClicked) {
            dispatch(deleteAnswerVoteById({ answerVoteId: currentVote.id }));
            setCurrentVoteScore(
                currentVoteScore + (voteTypeClicked === UPVOTE ? -1 : 1)
            );
        } else {
            const updatedAnswerVote = await dispatch(
                updateAnswerVotes(
                    {
                        answerVoteId: currentVote.id,
                        isLiked: voteTypeClicked,
                    },
                    voteTypeClicked
                )
            );
            updateVoteScore(updatedAnswerVote.payload.answer);
        }
    };
    useEffect(() => {
        if (!shouldRedirect) return;

        dispatch(setRedirectMessage('vote.'));
        navigate('/redirect-page');
    }, [shouldRedirect]);
    return (
        <div className='voting-score'>
            <FontAwesomeIcon
                className='upvote-arrow'
                icon='fa-up-long'
                ref={upvoteArrowRef}
                onClick={() => handleVoteArrowClick(upvoteArrowRef)}
            />
            <p className='voting-score-value'>{currentVoteScore}</p>
            <FontAwesomeIcon
                className='downvote-arrow'
                icon='fa-down-long'
                ref={downvoteArrowRef}
                onClick={() => handleVoteArrowClick(downvoteArrowRef)}
            />
        </div>
    );
};

export default VotingAnswers;
