import {screen, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Container from "./Container";
import {customRender} from "~/core/test";
import ApiMock from "~/core/api.mock";
import {makeTask, makeTaskList} from "~/core/factories";

describe('dashboard', () => {
    it("should render left-bar", async () => {
        const user = userEvent.setup()
        customRender(<Container/>)
        expect(screen.getByRole("toolbar")).toBeInTheDocument();
        expect(screen.getByRole("toolbar")).toHaveAttribute("aria-expanded", "true")
        await user.click(screen.getByRole("button", {name: "button.expand"}))
        expect(screen.getByRole("toolbar")).toHaveAttribute("aria-expanded", "false")
        await user.click(screen.getByRole("button", {name: "button.expand"}))
        expect(screen.getByRole("toolbar")).toHaveAttribute("aria-expanded", "true")
    })

    it("should show task list", async () => {
        const api = new ApiMock([makeTaskList({ name: "list 1" }), makeTaskList({name: "list 2"})])
        customRender(<Container/>, { services: {api} })
        await waitFor(() => {
            expect(screen.getByText("list 1")).toBeInTheDocument();
            expect(screen.getByText("list 2")).toBeInTheDocument();
        })
    })

    it("should show tasks of selected list", async () => {
        const user = userEvent.setup()
        const api = new ApiMock([makeTaskList({ name: "list 1", tasks: [
                makeTask({name: "task 1", completed: false}),
                makeTask({name: "task 2", completed: false}),
            ] })])
        customRender(<Container/>, { services: {api} })
        await waitFor(() => {
            expect(screen.getByRole("button", {name: "list 1"})).toHaveAttribute("aria-selected", "false")
            expect(screen.queryByText("task 1")).not.toBeInTheDocument();
            expect(screen.queryByText("task 2")).not.toBeInTheDocument();
        })
        await user.click(screen.getByRole("button", {name: "list 1"}))
        await waitFor(() => {
            expect(screen.getByRole("button", {name: "list 1"})).toHaveAttribute("aria-selected", "true")
            expect(screen.getByText("task 1")).toBeInTheDocument();
            expect(screen.getByText("task 2")).toBeInTheDocument();
        })
        await user.click(screen.getByRole("button", {name: "list 1"}))
        await waitFor(() => {
            expect(screen.getByRole("button", {name: "list 1"})).toHaveAttribute("aria-selected", "false")
            expect(screen.queryByText("task 1")).not.toBeInTheDocument();
            expect(screen.queryByText("task 2")).not.toBeInTheDocument();
        })
    })
});