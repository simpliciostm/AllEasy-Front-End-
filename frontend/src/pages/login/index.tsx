import { useContext, useState } from "react"
import { AuthContext } from "@/contexts/authContext"
import LoginOrRegisterComponent from "@/components/userLoginOrRegister"
import { ETypeLoginOrRegister } from "@/enums/GenericData"

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { login } = useContext(AuthContext)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
      <LoginOrRegisterComponent
        type={ETypeLoginOrRegister.LOGIN}
        title="Tela de Acesso"
        description="Coloque as informações de usuário para fazer seu Login"
        emailChange={setEmail}
        passwordChange={(setPassword)}
        login={handleSubmit}
      />
    </div>

  )
}

export default Login
