import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';
import { ETypeAuthenticate, ETypeUser, LoginActivities, TypeTextAlert } from '@/enums/GenericData';
import { clearStorage, getStorage, setLocalStorage } from '@/storage';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { AuthContext } from './authContext';
import type { IUser } from '@/models/interfaces/IUser';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [alert, setAlert] = useState<boolean>(false);
    const [typeAlert, setTypeAlert] = useState<string>('');
    const [alertMsg, setAlertMsg] = useState<string>('');
    const [username, setUserName] = useState<string>('');
    const [userAuth, setUserAuth] = useState<boolean>(false);
    const navigate = useNavigate();

    const timer = useCallback((to: boolean) => {
        setTimeout(() => {
            setAlert(false);
            if (to) navigate('/dashboard')
        }, 5000);
    }, [navigate, setAlert]);

    const getUserInfo = useCallback(async () => {
        try {
            const idUser = getStorage('id')
            if (idUser) {
                const { data } = await api.get(`/users?id=${idUser}`)
                if (data && data.length) {
                    const user: IUser = data[0]
                    setUserName(user.username)
                } else {
                    setAlertMsg(ETypeUser.USER_NOT_FOUND)
                    setAlert(true)
                    setTypeAlert(TypeTextAlert.FAILED)
                    timer(false)
                }
            }

        } catch (err: unknown) {
            if (typeof err == 'string')
                setAlertMsg(err)
            setAlert(true)
            setTypeAlert(TypeTextAlert.FAILED)
            timer(false)
        }
    }, [setAlert, setAlertMsg, setTypeAlert, setUserName, timer])

    const login = async (email: string, password: string) => {
        try {
            if (email && email.length >= 5 && email.includes("@")) {
                const { data } = await api.get(`/users?email=${email}`)
                if (data.length == 0) {
                    setAlert(true)
                    setTypeAlert(TypeTextAlert.FAILED)
                    setAlertMsg(LoginActivities.EMAIL_NOT_FOUND)
                    timer(false)
                } else if (password && password.length >= 1) {
                    const { data } = await api.get(`/users?email=${email}&password=${password}`)
                    if (data.length == 0) {
                        setAlert(true)
                        setTypeAlert(TypeTextAlert.FAILED)
                        setAlertMsg(LoginActivities.PASSWORD_NOT_USER)
                        timer(false)
                    } else {
                        const user: IUser = data[0];
                        setLocalStorage('id', user.id);
                        setLocalStorage('auth', 'autenticado');
                        setAlert(true)
                        setTypeAlert(TypeTextAlert.SUCCESS)
                        setAlertMsg(LoginActivities.SUCCESS)
                        timer(true)
                    }
                }
            }
        } catch (err: unknown) {
            if (typeof err == 'string')
                setAlertMsg(err)
            setAlert(true)
            setTypeAlert(TypeTextAlert.FAILED)
            timer(false)
        }
    }

    const logout = () => {
        localStorage.clear()
        navigate('/');
    }

    useEffect(() => {

        const isUserAuth = () => {
            const auth = getStorage('auth')

            if (auth) {
                if (auth != ETypeAuthenticate.AUTH) {
                    navigate('/')
                    clearStorage()
                } else {
                    setUserAuth(true)
                }
            }
        }

        getUserInfo()
        isUserAuth()
    }, [getUserInfo, navigate])

    return (
        <AuthContext.Provider value={{ login, logout, username, userAuth }}>
            {children}
            <div className="w-full flex items-center justify-center absolute bottom-5">
                {
                    alert ? (
                        <Alert className="max-w-2/12" variant={typeAlert == TypeTextAlert.FAILED ? 'destructive' : typeAlert == TypeTextAlert.SUCCESS ? 'default' : 'default'} >
                            <Terminal />
                            <AlertTitle>{typeAlert}</AlertTitle>
                            <AlertDescription>
                                {alertMsg}
                            </AlertDescription>
                        </Alert>
                    ) : null
                }
            </div>
        </AuthContext.Provider>
    );
}

export default AuthProvider;