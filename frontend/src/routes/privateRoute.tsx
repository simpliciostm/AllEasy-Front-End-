import { AuthContext } from '@/contexts/authContext';
import { ETypeAuthenticate } from '@/enums/GenericData';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}: {children: React.ReactNode}) => {
    const {userAuth} = useContext(AuthContext)
    if (userAuth && userAuth.length >= 1 && userAuth != ETypeAuthenticate.AUTH) {
        return <Navigate to={`/`} />
    }

    return children
}

export default PrivateRoute