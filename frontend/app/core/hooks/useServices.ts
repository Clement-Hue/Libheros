import {useContext} from "react";
import {Context as ServicesContext} from "~/core/contexts/ServicesProvider";

export default function() {
    const context = useContext(ServicesContext);
    if (!context) {
        throw new Error("useServices must be used within a ServicesProvider to access services.")
    }
    return context;
}