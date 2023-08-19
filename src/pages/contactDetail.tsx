import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { edit, remove, selectContact } from '../redux/contactSlice'
import Form from '../components/form'
import TextInput from '../components/textInput'

const ContactsId = () => {
    const { id: paramId } = useParams();
    const id = Number(paramId)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contacts = useSelector(selectContact)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState(false);

    const [hasError, setHasError] = useState(false);


    useEffect(() => {
        const details = contacts.find(c => c.id === id)

        if (!details) return navigate('/contacts')

        setFirstName(details.firstName)
        setLastName(details.lastName)
        setStatus(details.active)

    }, [contacts])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!firstName || !lastName) {
            setHasError(true)
            return //error toast here
        }
        dispatch(edit({ firstName, lastName, active: status, id }))
    }

    const handleDelete = () => {
        dispatch(remove(id))
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

                    <button type='submit' className='bg-primary-btn p-2 my-2 hover:text-white'>Save</button>

                    <button onClick={handleDelete} className='bg-red-500 p-2 my-2 hover:text-white'>Delete</button>

                </Form>
            </div>

        </div>
    );
}

export default ContactsId;