import { PropsWithChildren, useState, useEffect } from 'react'

/**
 * @dev component to render children only if device has screen reslution of mobile
 */
const Mobile: React.FC<PropsWithChildren> = ({ children }) => {
    const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

    const isMobile = () => {
        return screenSize.width < 450
    }

    useEffect(() => {

        const change = () => {
            console.log(window.innerWidth, window.innerHeight)
            setScreenSize({ width: window.innerWidth, height: window.innerHeight })
        }

        setScreenSize({ width: window.innerWidth, height: window.innerHeight })
        window.addEventListener('resize', change)
        console.log('useEffect')

        return () => {
            window.removeEventListener('resize', change)
        }
    }, [])

    return (
        isMobile() ? children : null
    );
}

export default Mobile;