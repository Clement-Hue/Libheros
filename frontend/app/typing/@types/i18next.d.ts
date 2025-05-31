import "i18next";
import { resources, defaultNS } from "~/locales";

export type LocalResources = (typeof resources)["en"];

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: LocalResources;
    }
}
