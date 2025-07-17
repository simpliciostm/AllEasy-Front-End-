import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import TasksComponent from './index'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom';

const mockNavigate = jest.fn()
const mockOnDelete = jest.fn()
const mockOnPut = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

const mockTask = {
    id: "1",
    key: "1",
    title: "Tarefa",
    description: "Nova tarefa",
    category: "Pessoal",
    refUser: "a5se",
    status: "Em Progresso",
    priority: "Media",
    onDelete: mockOnDelete,
    onPut: mockOnPut
}

const renderComponent = () => {
    render(
        <BrowserRouter>
            <TasksComponent {...mockTask} />
        </BrowserRouter>
    )

    return { render }
}

describe("TaskComponent", () => {
    it("render to component TaskComponent", () => {
        renderComponent()

        expect(screen.getByText("Título")).toBeInTheDocument()
        expect(screen.getByText("Descrição")).toBeInTheDocument()
        expect(screen.getByText("Categoria")).toBeInTheDocument()
        expect(screen.getByText("Prioridade")).toBeInTheDocument()
        expect(screen.getByText("Pendente")).toBeInTheDocument()
        expect(screen.getByText("Em Progresso")).toBeInTheDocument()
        expect(screen.getByText("Concluído")).toBeInTheDocument()
    })

    it("change edit title e description put task", () => {
        renderComponent()

        fireEvent.change(screen.getByLabelText("Título"), { target: { value: "Novo titulo" } })
        fireEvent.change(screen.getByLabelText("Descrição"), { target: { value: "Nova descrição" } })

        fireEvent.click(screen.getByText("Salvar"))

        expect(mockTask.onPut).toHaveBeenCalledWith("1", expect.objectContaining({
            title: "Novo titulo",
            description: "Nova descrição"
        }))
    })

    it("selected new status", async () => {
        renderComponent()

        fireEvent.click(screen.getByLabelText("Em Progresso"))
        fireEvent.click(screen.getByText("Salvar"))

        expect(mockTask.onPut).toHaveBeenCalledWith("1", expect.objectContaining({
            status: "Em Progresso"
        }))

    })

    it("when click button icon x delete task", () => {
        renderComponent()

        const deleteButton = screen.getByTestId('delete-icon-button')
        fireEvent.click(deleteButton)

        expect(mockTask.onDelete).toHaveBeenCalledWith("1")

    })

    it("show icon correct equal status", () => {
        renderComponent()

        expect(screen.getByTestId('icon-in-progress')).toBeInTheDocument()
    })

})