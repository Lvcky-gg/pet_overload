import AnswerCard from './AnswerCard';

const Answers = ({ answers, setIsDelete, setVoteClicked, setIsUpdated }) => {
    return (
        <>
            <div className="answers-container">
                <div className="answerHolder">
                    {answers.length &&
                        answers.map((answer) => (
                            <AnswerCard
                                key={answer.id}
                                answer={answer}
                                // isDelete={isDelete}
                                setIsDelete={setIsDelete}
                                setVoteClicked={setVoteClicked}
                                setIsUpdated={setIsUpdated}
                            ></AnswerCard>
                        ))}
                </div>
            </div>
        </>
    );
};

export default Answers;
