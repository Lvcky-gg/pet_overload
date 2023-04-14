import React from 'react';

import './ButtonGroup.css';

const ButtonGroup = ({ onPreview, showPreview, onSubmit }) => {
    return (
        <div className="button-container">
            <button
                type="button"
                className="button preview-button"
                onClick={onPreview}
            >
                {showPreview ? 'Go back' : 'Preview your question'}
            </button>
            <button
                type="submit"
                className="button submit-button"
                onClick={onSubmit}
            >
                Submit
            </button>
        </div>
    );
};

export default ButtonGroup;
