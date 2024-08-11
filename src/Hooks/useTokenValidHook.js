import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useTokenValidHook = (error) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (error?.response?.data?.message === 'Token is not valid') {
            navigate('/authenticate');
        }
    }, [error, navigate]);
    
}

export default useTokenValidHook;