import React from "react"
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
import type { ILoginOrRegisterProps } from "@/models/interfaces/ILoginOrRegister"
import { ETypeLoginOrRegister } from "@/enums/GenericData"
import { useNavigate } from "react-router-dom"

const LoginOrRegisterComponent = (props: ILoginOrRegisterProps) => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen flex items-center justify-center overflow-hidden">
            <Card className="w-full min-w-72 max-w-1/4 border-0">
                <CardHeader>
                    <CardTitle data-testid="title" className="text-white" >{props.title}</CardTitle>
                    <CardDescription data-testid="description" className="text-white" >
                        {props.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        props.type === ETypeLoginOrRegister.LOGIN ? (

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
                                            onChange={(e) => props.emailChange(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label className="text-white" htmlFor="password">Password</Label>
                                        </div>
                                        <Input className="text-white placeholder:text-white" id="password" placeholder="********" type="password" required onChange={(e) => props.passwordChange(e.target.value)} />
                                    </div>
                                </div>
                            </form>
                        ) : props.type === ETypeLoginOrRegister.REGISTER ? (
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label className="text-white" htmlFor="username">UserName</Label>
                                        <Input
                                            className="text-white placeholder:text-white"
                                            id="username"
                                            type="text"
                                            placeholder="Username"
                                            required
                                            onChange={(e) => props.username && props.username(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-white" htmlFor="email">Email</Label>
                                        <Input
                                            className="text-white placeholder:text-white"
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            onChange={(e) => props.emailChange(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label className="text-white" htmlFor="password">Password</Label>
                                        </div>
                                        <Input className="text-white placeholder:text-white" id="password" type="password" placeholder="*******" required onChange={(e) => props.passwordChange(e.target.value)} />
                                    </div>
                                </div>
                            </form>
                        ) : null
                    }
                </CardContent>
                {
                    props.type === ETypeLoginOrRegister.LOGIN ? (
                        <CardFooter className="flex-col gap-2">
                            <Button onClick={props.login} type="submit" variant="outline" className="w-full bg-amber-50 text-primary cursor-pointer hover:text-white hover:bg-transparent">
                                Entrar
                            </Button>
                            <Button variant="outline" className="w-full bg-transparent text-white hover:text-primary cursor-pointer" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault()
                                navigate('/cadastro')
                            }}>
                                Registra-se
                            </Button>
                        </CardFooter>
                    ) : props.type === ETypeLoginOrRegister.REGISTER ? (
                        <CardFooter className="flex-col gap-2">
                            <Button onClick={props.register} type="submit" variant="outline" className="w-full bg-amber-50 text-primary cursor-pointer hover:text-white hover:bg-transparent">
                                Registar
                            </Button>
                            <Button variant="outline" className="w-full bg-transparent text-white hover:text-primary cursor-pointer" onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault()
                                navigate("/")
                            }}>
                                Voltar
                            </Button>
                        </CardFooter>
                    ) : null
                }

            </Card>
        </div>

    )
}

export default LoginOrRegisterComponent
