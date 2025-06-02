import React from 'react';
import Tab from "~/components/Tabs/Tab";
import TabPanel from "~/components/Tabs/TabPanel";
import {ParseKeys} from "i18next";
import {useTranslation} from "react-i18next";
import clsx from "clsx";

function TabList({active, tabs, onTabChange}: Props) {
    const {t} = useTranslation()
    return (
        <div>
            <div role="tablist">
                {tabs.map(({tab}) => (
                   <Tab key={tab} aria-controls={`panel_${tab}`} onClick={() => onTabChange?.(tab)} tabIndex={active === tab ? 0 : -1} aria-selected={tab === active} id={tab}
                        className={clsx(
                            "px-4 py-2 cursor-pointer hover:opacity-(--hover-opacity)",
                            {"bg-white text-black underline font-semibold": active === tab, "bg-primary-400 text-primary-contrast-text": active !== tab},
                        )}
                   >{t(tab)}</Tab>
                ))}
            </div>
            <div>
                {tabs.map(({tab, content}) => (
                   <TabPanel className={clsx(
                       {"hidden": active !== tab, "block": active === tab}
                   )} key={tab} aria-labelledby={tab} id={`panel_${tab}`} hidden={active !== tab}>
                       {content}
                   </TabPanel>
                ))}
            </div>
        </div>
    );
}

type Props = {
    active: string
    tabs: {tab: ParseKeys<"common">, content: React.ReactElement}[]
    onTabChange?: (tab: string) => void
}

export default TabList;