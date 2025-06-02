import {render, screen, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Container from "./Container";
import {customRender} from "~/core/test";
import ApiMock from "~/core/api.mock";
import {makeTaskList} from "~/core/factories";

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
});