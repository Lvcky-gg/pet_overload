import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import './QuestionCard.css';
import Voting from '../Voting/Voting';
import dateFormater from '../../../utils/dateFormater';
const QuestionCard = ({
    id,
    title,
    details,
    votes_score: voteScore,
    answers_count,
    // ?
    showAnswers,
    user,
    answers,
    created_at,
    updated_at,
    setVoteClicked,
}) => {
    const { questionId } = useParams();
    const answersMessage = answers_count === 1 ? 'answer' : 'answers';
    const className = questionId ? 'answers-msg true' : 'answers-msg';

    return (
        <div className="question-card">
            <div className="row">
                <Voting
                    questionId={id}
                    voteScore={voteScore}
                    onClick={() => setVoteClicked((prev) => !prev)}
                />

                <div className="title-description-col">
                    <NavLink to={`/all-questions/${id}`}>
                        <h2>{title}</h2>
                    </NavLink>

                    <div>{parse(details)}</div>

                    <div className="card-bottom-container">
                        <p className={className} onClick={showAnswers}>
                            {answers_count} {answersMessage}
                        </p>
                        <div id="rightside-info">
                            {/* direct to user page */}
                            <NavLink to={`/users/${user.id}`}>
                                <p className="author-name">
                                    Author:{user.username}
                                </p>
                            </NavLink>
                            {!updated_at ? (
                                <>
                                    <p className="card-date">
                                        Asked on:{dateFormater(created_at)}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="card-date">
                                        Updated Question on:
                                        {dateFormater(updated_at)}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
