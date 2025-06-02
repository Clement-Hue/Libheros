import React, { PropsWithChildren } from "react";
import {ServicesOverride} from "~/typing/app";
import {ServicesProvider} from "~/core/contexts";


export default function withServices<T extends PropsWithChildren>(
    services?: ServicesOverride,
) {
    return (Component?: React.ComponentType<T>) => {
        return function Inner(props: T) {
            return (
                <ServicesProvider overrides={services}>
                    {Component ? <Component {...props} /> : props.children}
                </ServicesProvider>
            )
        };
    }
}