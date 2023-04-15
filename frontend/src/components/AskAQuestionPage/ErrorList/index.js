import './ErrorList.css';

const ErrorList = ({ errors }) => {
    return (
        <>
            {errors.length > 0 && (
                <ul className="ask-a-question-errors">
                    {errors.map((error, idx) => {
                        return <li key={idx}>{error}</li>;
                    })}
                </ul>
            )}
        </>
    );
};

export default ErrorList;
