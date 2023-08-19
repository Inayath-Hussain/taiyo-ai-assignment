interface Iprops {
    label: string,
    value: boolean,
    onChange: () => void
}

const RadioInput: React.FC<Iprops> = ({ label, value, onChange }) => {
    return (
        <div>
            <input type="radio" id={label} className='mx-2'
                checked={value} onChange={onChange} />
            <label htmlFor={label}>{label}</label>
        </div>
    );
}

export default RadioInput;