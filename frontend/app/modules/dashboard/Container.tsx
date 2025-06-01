import React from 'react';
import LeftBar from "./LeftBar";
import {makeTaskList} from "~/core/factories";
import {faker} from "@faker-js/faker";
import {useTranslation} from "react-i18next";
import MainContent from "./MainContent";

function Container(props) {
    return (
        <div className="flex flex-row gap-4">
            <LeftBar tasks={faker.helpers.multiple(makeTaskList, {count: 10})} />
            <MainContent/>
        </div>
    );
}

export default Container;