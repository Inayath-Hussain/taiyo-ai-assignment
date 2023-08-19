import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { add } from '../redux/contactSlice';
import TextInput from '../components/textInput';
import Form from '../components/form';


const NewContact = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState(false)
    const [hasError, setHasError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!firstName || !lastName) {
            setHasError(true)
            return //error toast here
        }

        dispatch(add({ firstName, lastName, active: status }))
        navigate('/contacts')

    }

    return (
        <div className="w-full h-screen flex flex-col pt-5 px-2 bg-gray-200 justify-start items-center 
        md:justify-center md:items-center md:bg-white">

            <div className='md:px-8 md:py-6 md:bg-gray-200 md: custom-shadow md:rounded-2xl'>
                <h1 className="text-xl text-center sm:text-3xl mb-5">Create Contact</h1>

                <Form handleSubmit={handleSubmit} status={status} setStatus={setStatus}>
                    <TextInput label='First Name' value={firstName} onChange={setFirstName} errorCheck={hasError} />

                    <TextInput label='Last Name' value={lastName} onChange={setLastName} errorCheck={hasError} />

                    <button type='submit' className='bg-primary-btn p-2 my-2 hover:text-white'>Create</button>
                </Form>
            </div>

        </div>
    );
}

export default NewContact;