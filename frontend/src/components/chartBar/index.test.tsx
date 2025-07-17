import React from 'react'
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import BarCharComponent from './index'

const mockPropsBarChart = {
    title: "Tarefas",
    description: "Tarefas concluidas",
    list: [
        {
            fieldname: "Concluidas",
            total: 4
        }
    ],
    listKeyName: "fieldname",
    keyBarName: "total"
}

const renderComponent = () => {
    render(
        <BrowserRouter>
            <BarCharComponent {...mockPropsBarChart} />
        </BrowserRouter>
    )

    return { render }
}

describe("BarCharComponent", () => {

    beforeEach(() => {
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
            configurable: true,
            value: 500,
        });

        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
            configurable: true,
            value: 300,
        });

        HTMLElement.prototype.getBoundingClientRect = function () {
            return {
                width: 500,
                height: 300,
                top: 0,
                left: 0,
                bottom: 300,
                right: 500,
                x: 0,
                y: 0,
                toJSON: () => { },
            };
        };
    });

    it("render component", () => {
        renderComponent()

        expect(screen.getByTestId('title')).toBeInTheDocument()
        expect(screen.getByTestId('description')).toBeInTheDocument()
    })
})