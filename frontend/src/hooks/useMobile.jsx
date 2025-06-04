import { React, useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const useMobile = (breakPoint = 768) => {
    const [isMobile, setIsMoblie] = useState(window.innerWidth < breakPoint);
    
    const handleResige = () => {
        const checkPoint = window.innerWidth < breakPoint;
        setIsMoblie(checkPoint);
    }

    useEffect(() => {
        handleResige();
        window.addEventListener('resize', handleResige);

        return () => {
            window.removeEventListener('resize', handleResige);
        }
        
    },[])

    return [isMobile];

}

export default useMobile;
