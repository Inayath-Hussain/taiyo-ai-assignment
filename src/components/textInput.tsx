import { Dispatch, SetStateAction } from 'react'

interface Iprops {
    label: string
    value: string
    onChange: Dispatch<SetStateAction<string>>
    errorCheck: boolean
}

const TextInput: React.FC<Iprops> = ({ label, value, onChange, errorCheck }) => {
    const hasError = () => {
        return errorCheck && value === ''
    }

    return (
        <div className='flex flex-row justify-center items-center mb-4'>
            <label className='font-medium text-center text-sm mobile-end:text-base lg:text-lg' htmlFor={label}
            >{label}<span className='text-red-600'>*</span> : </label>
            <input id='firstName' type="text" className={`${hasError() && 'red-border'} mx-2 outline-0 p-2 rounded-md
             mobile-end:rounded-lg`} value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
}

export default TextInput;