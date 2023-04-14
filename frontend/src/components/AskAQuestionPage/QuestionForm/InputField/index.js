import React from 'react';

import './InputField.css';

const InputField = ({ id, label, subtitle, value, onChange, placeholder }) => {
    return (
        <div className="input-field-container">
            <label htmlFor={id}>{label}</label>
            <p className="subtitle">{subtitle}</p>
            <input
                type="text"
                id={id}
                value={value}
                onChange={onChange}
                required
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;
