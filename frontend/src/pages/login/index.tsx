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

interface IUser {
  id: string,
  username: string,
  email: string,
  password: string
}

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alertErro, setAlertErro] = useState<boolean>(false);
  const [alertSuccess, setAlertSuccess] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email && email.length >= 5 && email.includes("@")) {
      const { data } = await api.get(`/users?email=${email}`)
      if (data.length == 0) {
        setAlertErro(true)
        setAlertMsg(`Usário não encotrado com esse Email`)
        time('0')
      } else if (password && password.length >= 1) {
        const { data } = await api.get(`/users?email=${email}&password=${password}`)
        if (data.length == 0) {
          setAlertErro(true)
          setAlertMsg(`Senha não confere com esse Email`)
          time('0')
        } else {
          const user: IUser = data[0];
          setLocalStorage('id', user.id);
          setLocalStorage('auth', 'autenticado');
          setAlertSuccess(true)
          setAlertMsg(`Usuário Logado!`)
          time('1')
        }
      }
    }
  }

  const time = (operation: string) => {
    switch (operation) {
      case "0":
        setTimeout(() => {
          setAlertErro(false);
        }, 3000)
        break;
      case "1":
        setTimeout(() => {
          setAlertSuccess(false);
          navigate('/dashboard')
        }, 3000)
        break;
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm border-0">
        <CardHeader>
          <CardTitle >Tela de Acesso</CardTitle>
          <CardDescription >
            Coloque as informações de usuário para fazer seu Login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
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
                <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} type="submit" className="w-full bg-white text-primary hover:text-white">
            Entrar
          </Button>
          <Button variant="outline" className="w-full text-white" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            navigate('/register')
          }}>
            Registra-se
          </Button>
        </CardFooter>
      </Card>
      <div className="w-full flex items-center justify-center absolute bottom-5">
        {
          alertErro ? (
            <Alert className="w-1/4" variant="destructive" >
              <Terminal />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>
                {alertMsg}
              </AlertDescription>
            </Alert>
          ) : null
        }
        {
          alertSuccess ? (
            <Alert className="w-1/4" variant="default">
              <Terminal />
              <AlertTitle>Sucesso!</AlertTitle>
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
