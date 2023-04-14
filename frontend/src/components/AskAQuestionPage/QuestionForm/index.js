import React from 'react';
import InputField from './InputField';
import QuestionRichEditor from './QuestionRichEditor';

const QuestionForm = ({
    handleSubmit,
    title,
    details,
    setTitle,
    setDetails,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <InputField
                id="title"
                label="Title"
                subtitle="Be specific and clear with your question"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How many grams of food should I feed my Golden Retriever each day?"
            />
            <QuestionRichEditor details={details} setDetails={setDetails} />
        </form>
    );
};

export default QuestionForm;
