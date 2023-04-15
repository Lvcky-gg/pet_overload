import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
    selectVoteStatus,
    deleteQuestionVoteById,
    updateQuestionVoteById,
    createQuestionVote,
} from '../../../store/questionVotes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateQuestionAfterVote } from '../../../store/questions';
import { setRedirectMessage } from '../../../store/session';
import { useNavigate } from 'react-router-dom';

const Voting = ({ questionId, voteScore }) => {
    const navigate = useNavigate();
    const [currentVoteScore, setCurrentVoteScore] = useState(voteScore);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const upvoteArrowRef = useRef(null);
    const downvoteArrowRef = useRef(null);
    const currentVote = useSelector((state) =>
        selectVoteStatus(state.questionVotes, questionId)
    );

    const currentUser = useSelector((state) => state.session.user);

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
    }, [currentVote, voteType.DOWNVOTE, voteType.UPVOTE, voteType.NO_VOTE]);

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
    }, [currentVoteType, voteType.DOWNVOTE, voteType.UPVOTE, voteType.NO_VOTE]);

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

        const updateVoteScore = (updatedQuestion) => {
            dispatch(updateQuestionAfterVote(updatedQuestion));
            setCurrentVoteScore(updatedQuestion.votes_score);
        };

        if (!currentVote || currentVote.voteStatus === NO_VOTE) {
            const questionVote = await dispatch(
                createQuestionVote(
                    { questionId: questionId, isLiked: voteTypeClicked },
                    voteTypeClicked
                )
            );
            updateVoteScore(questionVote.payload.question);
        } else if (currentVoteType === voteTypeClicked) {
            dispatch(
                deleteQuestionVoteById({ questionVoteId: currentVote.id })
            );
            setCurrentVoteScore(
                currentVoteScore + (voteTypeClicked === UPVOTE ? -1 : 1)
            );
        } else {
            const updatedQuestionVote = await dispatch(
                updateQuestionVoteById(
                    {
                        questionVoteId: currentVote.id,
                        isLiked: voteTypeClicked,
                    },
                    voteTypeClicked
                )
            );
            updateVoteScore(updatedQuestionVote.payload.question);
        }
    };

    useEffect(() => {
        if (!shouldRedirect) return;

        dispatch(setRedirectMessage('vote.'));
        navigate('/redirect-page');
    }, [shouldRedirect]);

    return (
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
    );
};

export default Voting;
