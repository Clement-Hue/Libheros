import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Container from "./Container";

describe('dashboard', () => {
    it("should render leftbar", async () => {
        const user = userEvent.setup()
       render(<Container/>)
        expect(screen.getByRole("toolbar")).toBeInTheDocument();
        expect(screen.getByRole("toolbar")).toHaveAttribute("aria-expanded", "true")
        await user.click(screen.getByRole("button", {name: "button.expand"}))
        expect(screen.getByRole("toolbar")).toHaveAttribute("aria-expanded", "false")
        await user.click(screen.getByRole("button", {name: "button.expand"}))
        expect(screen.getByRole("toolbar")).toHaveAttribute("aria-expanded", "true")
    })
});