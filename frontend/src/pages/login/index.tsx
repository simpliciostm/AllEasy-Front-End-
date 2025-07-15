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
import { setLocalStorage } from "@/storage"
import { useNavigate } from "react-router-dom"
import { LoginActivities, TypeTextAlert } from "@/enums/GenericData"

interface IUser {
  id: string,
  username: string,
  email: string,
  password: string
}

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [typeAlert, setTypeAlert] = useState<string>('');
  const [alertMsg, setAlertMsg] = useState<string>('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email && email.length >= 5 && email.includes("@")) {
      const { data } = await api.get(`/users?email=${email}`)
      if (data.length == 0) {
        setAlert(true)
        setTypeAlert(TypeTextAlert.FAILED)
        setAlertMsg(LoginActivities.EMAIL_NOT_FOUND)
        timer()
      } else if (password && password.length >= 1) {
        const { data } = await api.get(`/users?email=${email}&password=${password}`)
        if (data.length == 0) {
          setAlert(true)
          setTypeAlert(TypeTextAlert.FAILED)
          setAlertMsg(LoginActivities.PASSWORD_NOT_USER)
          timer()
        } else {
          const user: IUser = data[0];
          setLocalStorage('id', user.id);
          setLocalStorage('auth', 'autenticado');
          setAlert(true)
          setTypeAlert(TypeTextAlert.SUCCESS)
          setAlertMsg(LoginActivities.SUCCESS)
          timer()
        }
      }
    }
  }

  const timer = () => {
    setTimeout(() => {
      setAlert(false);
    }, 5000)
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm border-0">
        <CardHeader>
          <CardTitle className="text-white" >Tela de Acesso</CardTitle>
          <CardDescription className="text-white" >
            Coloque as informações de usuário para fazer seu Login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label className="text-white" htmlFor="email">Email</Label>
                <Input
                  className="text-white"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label className="text-white" htmlFor="password">Password</Label>
                </div>
                <Input className="text-white" id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} type="submit" className="w-full bg-sidebar-accent text-white cursor-pointer hover:text-white">
            Entrar
          </Button>
          <Button variant="outline" className="w-full bg-amber-50 text-primary cursor-pointer hover:text-primary" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            navigate('/register')
          }}>
            Registra-se
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

export default Login
