import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from '@/api/api'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { RegisterNewUser, TypeTextAlert } from "@/enums/GenericData"

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
                await api.post('/users', {
                    username: userName,
                    email: email,
                    password: password
                })

                setAlert(true)
                setTypeAlert(TypeTextAlert.FAILED)
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
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Registrar Usuário</CardTitle>
                    <CardDescription>
                        Coloque as informações Cadastrar um novo Usuário
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">UserName</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    required
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" placeholder="*******" required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button onClick={handleSubmit} type="submit" className="w-full bg-white text-primary hover:text-white">
                        Registar
                    </Button>
                    <Button variant="outline" className="w-full text-white" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault()
                        window.location.href = '/'
                    }}>
                        Voltar
                    </Button>
                </CardFooter>
            </Card>
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
