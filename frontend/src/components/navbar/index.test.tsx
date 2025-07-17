import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import NavBar from './index'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom';

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

const renderComponent = () => {
    render(
        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )

    return { render }
}

describe("NavBar", () => {
    it("render component NavBar", () => {
        renderComponent()

        expect(screen.getByText("Bem vindo,")).toBeInTheDocument()
        expect(screen.getByText("AllEasy")).toBeInTheDocument()
    })

    it("click button naviate tasks", () => {
        renderComponent()

        const logout = screen.getByTitle("tarefas")

        fireEvent.click(logout)

        expect(mockNavigate).toHaveBeenCalledWith("/tarefas")
    })

    it("click button naviate dashboard", () => {
        renderComponent()

        const logout = screen.getByTitle("dashboard")

        fireEvent.click(logout)

        expect(mockNavigate).toHaveBeenCalledWith("/dashboard")
    })
})