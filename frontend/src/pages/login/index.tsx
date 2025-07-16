import { useContext, useState } from "react"
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
import { useNavigate } from "react-router-dom"
import { AuthContext } from "@/contexts/authContext"

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(email, password);
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
                  className="text-white placeholder:text-white"
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
                <Input className="text-white placeholder:text-white" id="password" placeholder="********" type="password" required onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} type="submit" variant="outline" className="w-full bg-amber-50 text-primary cursor-pointer hover:text-white hover:bg-transparent">
            Entrar
          </Button>
          <Button variant="outline" className="w-full bg-transparent text-white hover:text-primary cursor-pointer" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            navigate('/register')
          }}>
            Registra-se
          </Button>
        </CardFooter>
      </Card>
    </div>

  )
}

export default Login
