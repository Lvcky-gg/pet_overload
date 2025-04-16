interface ButtonProps {
    id: string;
    text: string;
    onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ id, text, onClickHandler }: ButtonProps) => {
    return (
        <button id={id} className='button' onClick={onClickHandler}>
            {text}
        </button>
    );
};

export default Button;
