import React from 'react';
import LeftBar from "./LeftBar";
import {makeTask, makeTaskList} from "~/core/factories";
import {faker} from "@faker-js/faker";
import MainContent from "./MainContent";
import RightBar from "./RightBar";

function Container(props) {
    const task = makeTask()
    return (
        <div className="flex flex-row gap-4">
            <LeftBar tasks={faker.helpers.multiple(makeTaskList, {count: 10})} />
            <MainContent/>
            <RightBar task={task} />
        </div>
    );
}

export default Container;