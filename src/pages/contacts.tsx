import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import '../App.css';
import { selectContact, remove } from '../redux/contactSlice';

const Contacts = () => {
    const contacts = useSelector(selectContact)
    const dispatch = useDispatch()

    // checks if the contacts is empty
    const noContactsFound = () => {
        return contacts.length === 0
    }

    const removeContact = (id: number) => {
        dispatch(remove(id))
    }

    return (
        <div className="w-full h-screen bg-gray-200 flex flex-col justify-start items-center p-4 overflow-y-scroll hide-scrollbar">
            <h1 className="text-xl sm:text-4xl lg:text-5xlxl ">Contacts</h1>

            {/* Contact Create Button */}
            <Link to='/contact/new' className="w-full flex flex-row justify-end items-center my-4
            mobile-end:my-5">
                <button className="p-2 text-sm mobile-end:text-lg mobile-end:p-3 bg-green-300 rounded-lg">Create</button>
            </Link>

            <hr className='h-[2px] bg-slate-400 w-[90%] mobile-end:w-full mb-5' />

            {/* contact list */}
            <div className={`w-full flex flex-col items-center gap-2
            ${noContactsFound() ? '' : 'mobile-end:grid md:grid-cols-auto-2 md:gap-y-5 md:gap-x-3 lg:grid-cols-auto-3'}
            `}>
                {/* empty contact message */}
                {noContactsFound() ?
                    <div className='w-full'>
                        <p className='text-red-500 font-medium mobile-end:text-lg lg:text-xl'>No Contact Found</p>
                        <p className='mobile-end:text-lg lg:text-xl'>Please add contacts from <span className='font-medium'>Create</span> Button</p>
                    </div>
                    :
                    contacts.map(i => (
                        // contacts list
                        <div className="w-full rounded-md bg-white p-2 flex flex-row justify-around items-center 
                    mobile-end:rounded-xl mobile-end:w-auto mobile-end:p-3" key={i.id}>

                            <p className="w-full font-medium text-base
                                    mobile-end:text-lg
                                    lg:text-xl lg:w-2/3">{i.firstName} {i.lastName}</p>

                            <div className="w-full flex flex-row justify-around items-center
                                    mobile-end:w-2/5 lg:1/3">

                                <Link to={`/contact/${i.id}`}>
                                    <button className="bg-accent text-xs p-1 md:text-sm md:mr-2">Edit</button>
                                </Link>

                                <button onClick={() => removeContact(i.id)} className="bg-red-300 text-xs p-1 md:text-sm">Delete</button>
                            </div>
                        </div>
                    ))}
            </div>

        </div>
    );
}

export default Contacts;