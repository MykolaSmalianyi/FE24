import style from './Input.module.css';

const Input = ({ type = 'text', placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={style.input}
        />
    );
};

export default Input;