const Button = ({ id, text, onClickHandler }) => {
    return (
        <button id={id} className="button" onClick={onClickHandler}>
            {text}
        </button>
    );
};

export default Button;
