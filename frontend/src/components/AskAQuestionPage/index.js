import React, { useEffect, useState } from 'react';
import QuestionForm from './QuestionForm';
import ButtonGroup from './QuestionForm/ButtonGroup';
import QuestionPreview from './QuestionPreview';

import { useDispatch, useSelector } from 'react-redux';
import { createQuestion } from '../../store/questions';
import { useNavigate } from 'react-router-dom';

import './AskAQuestionPage.css';
import ErrorList from './ErrorList';
import Redirect from './Redirect';

const DEFAULT_DETAILS_STATE = '<p></p>';

const AskAQuestionPage = () => {
    const [details, setDetails] = useState(DEFAULT_DETAILS_STATE);
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const [showRedirectMessage, setShowRedirectMessage] = useState(false);
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            setShowRedirectMessage(true);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isTitleEmpty = !title.trim();
        const isDetailsEmpty = details.trim() === DEFAULT_DETAILS_STATE;

        setErrors([]);

        if (isTitleEmpty || isDetailsEmpty) {
            setErrors((prevErrors) => [
                ...prevErrors,
                'Neither the Title nor the Details can be empty. Please ensure both fields are filled out.',
            ]);
            return;
        }

        const createdQuestionResult = await dispatch(
            createQuestion({ title, details })
        );

        if (createQuestion.rejected.match(createdQuestionResult)) {
            handleRejected(createdQuestionResult);
        } else if (createQuestion.fulfilled.match(createdQuestionResult)) {
            handleFulfilled(createdQuestionResult);
        }
    };

    const handleRejected = (result) => {
        const error = result.payload;

        if (error?.errors) {
            setErrors((prevErrors) => [
                ...prevErrors,
                'We are unable to submit your question at this time due to an unknown error. Please wait a few minutes, then try again.',
            ]);
        }
    };

    const handleFulfilled = (result) => {
        const questionId = result.payload.id;
        navigate(`/all-questions/${questionId}`);
    };

    const handlePreview = () => setShowPreview((prev) => !prev);

    if (showRedirectMessage) {
        return <Redirect />;
    }

    return (
        <div className="ask-question-page-container">
            {showPreview ? (
                <QuestionPreview title={title} details={details} />
            ) : (
                <>
                    <h1>Ask a Question</h1>
                    <QuestionForm
                        handleSubmit={handleSubmit}
                        title={title}
                        setTitle={setTitle}
                        details={details}
                        setDetails={setDetails}
                    />
                </>
            )}

            <ErrorList errors={errors} />
            <ButtonGroup
                onPreview={handlePreview}
                showPreview={showPreview}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default AskAQuestionPage;
