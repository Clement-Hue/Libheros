import {screen, waitFor, within} from "@testing-library/react";
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

    it("should show no task list selected", async () => {
        const api = new ApiMock([makeTaskList({ name: "list 1" }), makeTaskList({name: "list 2"})])
        customRender(<Container/>, { services: {api} })
        await waitFor(() => {
            expect(screen.getByText("task.no-list-selected"))
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

    it("should show completed tasks of selected list", async () => {
        const user = userEvent.setup()
        const api = new ApiMock([makeTaskList({ name: "list 1", tasks: [
                makeTask({name: "task 1", completed: true}),
                makeTask({name: "task 2", completed: false}),
            ] })])
        customRender(<Container/>, { services: {api} })
        await user.click(await screen.findByRole("button", {name: "list 1"}))
        await user.click(screen.getByRole("tab", {name: "task.completed-tasks"}))
        await waitFor(() => {
            expect(screen.getByText("task 1")).toBeVisible()
            expect(screen.getByText("task 2")).not.toBeVisible()
        })
        await user.click(screen.getByRole("tab", {name: "task.active-tasks"}))
        await waitFor(() => {
            expect(screen.getByText("task 2")).toBeVisible()
            expect(screen.getByText("task 1")).not.toBeVisible()
        })
    })

    it("should show detail about selected task", async () => {
        const user = userEvent.setup()
        const api = new ApiMock([makeTaskList({ name: "list 1", tasks: [
                makeTask({name: "task 1", completed: false, description: "description 1"}),
                makeTask({name: "task 2", completed: false}),
            ] })])
        customRender(<Container/>, { services: {api} })
        await user.click(await screen.findByRole("button", {name: "list 1"}))
        await user.click(screen.getByRole("listitem", {name: "task 1"}))
        await waitFor(() => {
            expect(screen.getByRole("listitem", {name: "task 1"})).toHaveAttribute("aria-selected", "true")
            expect(screen.getByText("description 1")).toBeInTheDocument()
        })
    })

    it("should delete task list", async () => {
        const user = userEvent.setup()
        const api = new ApiMock([makeTaskList({ id: "1", name: "list 1" })])
        jest.spyOn(api, "deleteTaskList")
        customRender(<Container/>, { services: {api} })
        await user.click(await screen.findByRole("button", {name: "button.delete-task-list"}))
        await waitFor(() => {
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        })
        const dialog = within(screen.getByRole("dialog"))
        await user.click(dialog.getByRole("button", {name: "button.delete"}))
        await waitFor(() => {
            expect(api.deleteTaskList).toHaveBeenCalledWith({listId: "1"})
            expect(screen.queryByText("list 1")).not.toBeInTheDocument();
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        })
    })

    it("should add task list", async () => {
        const user = userEvent.setup()
        const api = new ApiMock()
        jest.spyOn(api, "addTaskList")
        customRender(<Container/>, { services: {api} })
        await user.click(await screen.findByRole("button", {name: "button.add-task-list"}))
        await waitFor(() => {
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        })
        const dialog = within(screen.getByRole("dialog"))
        await user.type(await screen.findByLabelText(/label.task-list-name/i), "new list")
        await user.click(dialog.getByRole("button", {name: "button.add-task-list"}))
        await waitFor(() => {
            expect(api.addTaskList).toHaveBeenCalledWith({name: "new list", id: expect.any(String)})
            expect(screen.getByText("new list")).toBeInTheDocument();
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        })
    })

    it("should delete a task", async () => {
        const user = userEvent.setup()
        const api = new ApiMock([makeTaskList({ name: "list 1", tasks: [
                makeTask({name: "task 1", id: "task-id", completed: false, description: "description 1"}),
                makeTask({name: "task 2", completed: false}),
            ] })])
        jest.spyOn(api, "deleteTask")
        customRender(<Container/>, { services: {api} })
        await user.click(await screen.findByRole("button", {name: "list 1"}))
        await user.click(screen.getByRole("listitem", {name: "task 1"}))
        await user.click(screen.getByRole("button", {name: "button.delete-task"}))
        await waitFor(() => {
            expect(screen.getByRole("dialog")).toBeInTheDocument();
        })
        const dialog = within(screen.getByRole("dialog"))
        await user.click(dialog.getByRole("button", {name: "button.delete"}))
        await waitFor(() => {
            expect(api.deleteTask).toHaveBeenCalledWith({taskId: "task-id" })
            expect(screen.queryByText("task 1")).not.toBeInTheDocument()
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        })
    })
});