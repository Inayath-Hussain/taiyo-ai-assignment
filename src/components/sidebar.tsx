import { useState } from 'react'
import { Link } from 'react-router-dom'
import Mobile from '../responsive/mobile';


const SideBar = () => {

    const [isSideBarClosed, setIsSideBarClosed] = useState(true)

    return (
        <>
            <div className={`${isSideBarClosed ? 'w-[10vw]' : '!w-[75vw]'} 
        z-[1010] absolute h-screen bg-blue-300 transition-[width] duration-75 ease-linear justify-start flex flex-col items-center pt-1
        mobile-end:w-[20vw] mobile-end:relative mobile-end:z-0`}>


                {/* renders only if screen width is less than 450px */}
                <Mobile>
                    {(isSideBarClosed ? <img src="/menu.svg" width={20} height={20} alt="" className='hover:cursor-pointer' onClick={() => setIsSideBarClosed(false)} />
                        :
                        <div className='w-full flex flex-row justify-end'>
                            <img src="/arrow-left.svg" width={20} height={20} alt="" className='hover:cursor-pointer mr-2' onClick={() => setIsSideBarClosed(true)} />
                        </div>
                    )}
                </Mobile>


                <div className={`${isSideBarClosed ? 'hidden' : 'flex'} mobile-end:flex mobile-end:mt-4 flex-col justify-start items-center`}>
                    <Link to="/contacts" className='my-3 text-black font-semibold hover:text-white sm:text-lg lg:text-2xl'>Contacts</Link>
                    <Link to="/chart-and-map" className='my-4 text-black font-semibold hover:text-white sm:text-lg sm:text-center lg:text-2xl'>Charts and Maps</Link>
                </div>

            </div>

            <div className='w-[10vw] bg-white mobile-end:hidden'></div>
        </>
    );
}

export default SideBar;