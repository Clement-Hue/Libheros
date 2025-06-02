import React, {createContext} from "react";
import envServicesConfig from "~/core/env.config";
import {Services, ServicesOverride} from "~/typing/app";

export const Context = createContext<Services | null >(null  );
const ServicesProvider: React.FC<Props> = ({children,overrides} ) => {
    return (
        <Context.Provider value={{
            ...envServicesConfig[process.env.NODE_ENV as keyof typeof envServicesConfig],
            ...overrides as Partial<Services>
        }} >
            {children}
        </Context.Provider>
    )
}


type Props = {
    children?: React.ReactNode
    overrides?: ServicesOverride
}

export default ServicesProvider;