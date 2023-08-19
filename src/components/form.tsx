import { Dispatch, SetStateAction, PropsWithChildren, ReactNode, Children, isValidElement } from 'react'
import RadioInput from './radioInput'

interface Iprops {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    status: boolean
    setStatus: Dispatch<SetStateAction<boolean>>
}

const Form: React.FC<PropsWithChildren<Iprops>> = ({ handleSubmit, setStatus, status, children }) => {
    const childrenArray = Children.toArray(children)
    const buttons = childrenArray.filter((child) => isValidElement(child) && child.type === 'button')

    const childrenWithoutButton = childrenArray.filter((child) => isValidElement(child) && child.type !== 'button')

    return (
        <form onSubmit={(e) => handleSubmit(e)} className='w-full flex flex-col justify-start items-center'>

            {childrenWithoutButton}

            <div className='flex flex-row my-2 items-center'>
                <p className='font-medium text-center text-base mobile-end:text-base lg:text-lg mr-3'>Status :</p>

                <div className='flex flex-col justify-center items-start'>
                    <RadioInput label='Active' value={status} onChange={() => setStatus(true)} />

                    <RadioInput label='InActive' value={!status} onChange={() => setStatus(false)} />
                </div>
            </div>

            <div className='w-full flex flex-row justify-around items-center'>
                {buttons}
            </div>

        </form>
    );
}

export default Form;