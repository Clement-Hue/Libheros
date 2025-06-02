import { ServicesOverride } from "~/typing/app";
import {render, RenderOptions} from "@testing-library/react";
import withServices from "./withServices";

export type Options = Omit<RenderOptions, "wrapper"> & {
    services?: ServicesOverride;
}

function customRender(
    ui: Parameters<typeof render>[0],
    { services, ...options }: Options = {},
) {
    return render(ui, {
        wrapper: withServices(services)(),
        ...options,
    });
}

export default customRender;