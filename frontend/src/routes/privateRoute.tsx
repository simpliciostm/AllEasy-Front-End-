import { AuthContext } from '@/contexts/authContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}: {children: React.ReactNode}) => {
    const {userAuth} = useContext(AuthContext)
    if (!userAuth) {
        return <Navigate to={`/`} />
    }

    return children
}

export default PrivateRoute