import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import LoginOrRegisterComponent from "."
import { ETypeLoginOrRegister } from "@/enums/GenericData"

const mockLogin = jest.fn()
const mockRegister = jest.fn()
const mockEmailChange = jest.fn()
const mockpasswordChange = jest.fn()
const mockUsername = jest.fn()
const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

const renderComponent = (type: string, title: string, description: string) => {
    render(
        <BrowserRouter>
            <LoginOrRegisterComponent
                title={title}
                description={description}
                type={type}
                emailChange={mockEmailChange}
                passwordChange={mockpasswordChange}
                username={mockUsername}
                login={mockLogin}
                register={mockRegister}
            />
        </BrowserRouter>
    )
}

describe("LoginOrRegisterComponent", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("render component for login", () => {
        renderComponent(ETypeLoginOrRegister.LOGIN, "Tela de Acesso", "Tela de acesso para realizar o login")

        expect(screen.getByTestId("title")).toHaveTextContent("Tela de Acesso")
        expect(screen.getByTestId("description")).toHaveTextContent("Tela de acesso para realizar o login")
    })

    it("render component for register", () => {
        renderComponent(ETypeLoginOrRegister.REGISTER, "Cadastrar Usuário", "Coloque suas informações para Cadastrar um novo Usuário")

        expect(screen.getByTestId("title")).toHaveTextContent("Cadastrar Usuário")
        expect(screen.getByTestId("description")).toHaveTextContent("Coloque suas informações para Cadastrar um novo Usuário")
    })

    it("render form and inputs for login", () => {
        renderComponent(ETypeLoginOrRegister.LOGIN, "Tela de Acesso", "Tela de acesso para realizar o login")

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })

    it("render form and inputs for register", () => {
        renderComponent(ETypeLoginOrRegister.REGISTER, "Cadastrar Usuário", "Coloque suas informações para Cadastrar um novo Usuário")

        expect(screen.getByLabelText(/UserName/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Password/)).toBeInTheDocument()
    })

    it("change email and password for form login", () => {
        renderComponent(ETypeLoginOrRegister.LOGIN, "Tela de Acesso", "Tela de acesso para realizar o login")

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "novo@email.com" } })
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "senha" } })

        expect(mockEmailChange).toHaveBeenCalled()
        expect(mockpasswordChange).toHaveBeenCalled()
    })

    it("change email and password for form register", () => {
        renderComponent(ETypeLoginOrRegister.REGISTER, "Cadastrar Usuário", "Coloque suas informações para Cadastrar um novo Usuário")

        fireEvent.change(screen.getByLabelText(/UserName/i), { target: { value: "novo usuario" } })
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "novo@email.com" } })
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "senha" } })

        expect(mockUsername).toHaveBeenCalled()
        expect(mockEmailChange).toHaveBeenCalled()
        expect(mockpasswordChange).toHaveBeenCalled()
    })

    it("click button login", () => {
        renderComponent(ETypeLoginOrRegister.LOGIN, "Tela de Acesso", "Tela de acesso para realizar o login")

        fireEvent.click(screen.getByText(/Entrar/i))
        fireEvent.click(screen.getByText(/Registra-se/i))

        const regusterButton = screen.getByText(/Registra-se/i)
        fireEvent.click(regusterButton)

        expect(mockNavigate).toHaveBeenCalledWith("/cadastro")
        expect(mockLogin).toHaveBeenCalled()
        expect(screen.getByText(/Entrar/i)).toBeInTheDocument()
        expect(screen.getByText(/Registra-se/i)).toBeInTheDocument()
    })

    it("click button register", () => {
        renderComponent(ETypeLoginOrRegister.REGISTER, "Cadastrar Usuário", "Coloque suas informações para Cadastrar um novo Usuário")

        fireEvent.click(screen.getByText(/Registar/i))
        fireEvent.click(screen.getByText(/Voltar/i))

        const regusterButton = screen.getByText(/Voltar/i)
        fireEvent.click(regusterButton)

        expect(mockNavigate).toHaveBeenCalledWith("/")
        expect(mockRegister).toHaveBeenCalled()
        expect(screen.getByText(/Registar/i)).toBeInTheDocument()
        expect(screen.getByText(/Voltar/i)).toBeInTheDocument()
    })
})