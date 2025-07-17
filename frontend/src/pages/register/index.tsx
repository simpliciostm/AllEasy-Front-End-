import { useState } from "react"
import api from '@/api/api'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { ETypeLoginOrRegister, RegisterNewUser, TypeTextAlert } from "@/enums/GenericData"
import LoginOrRegisterComponent from "@/components/userLoginOrRegister"

const Register = () => {
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [alert, setAlert] = useState<boolean>(false);
    const [typeAlert, setTypeAlert] = useState<string>('');
    const [alertMsg, setAlertMsg] = useState<string>('');

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();


        if (email && email.length >= 3 && email.includes("@")) {
            const { data } = await api.get(`/users?email=${email}`)
            if (data && data.length) {
                setAlert(true)
                setTypeAlert(TypeTextAlert.FAILED)
                setAlertMsg(RegisterNewUser.EMAIL_EXISTS_USER)
                timer()
            } else if (password && password.length >= 3) {

                setTimeout(async () => {
                    await api.post('/users', {
                        username: userName,
                        email: email,
                        password: password
                    })
                },5000)

                setAlert(true)
                setTypeAlert(TypeTextAlert.SUCCESS)
                setAlertMsg(RegisterNewUser.NEW_SUCCESS_USER)
                timer()
            }
        }
    }

    const timer = () => {
        setTimeout(() => {
            setAlert(false);
        }, 3000)
    }

    return (
        <div className="w-full h-screen flex justify-center items-center flex-col relative">
            <LoginOrRegisterComponent
                type={ETypeLoginOrRegister.REGISTER}
                title="Cadastrar Usuário"
                description="Coloque suas informações para Cadastrar um novo Usuário"
                username={setUserName}
                emailChange={setEmail}
                passwordChange={(setPassword)}
                register={handleSubmit}
            />
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
        </div>

    )
}

export default Register
