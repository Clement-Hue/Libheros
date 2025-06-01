import React from 'react';
import {LeftBar} from "~/components";
import {makeTaskList} from "~/core/factories";
import {faker} from "@faker-js/faker";

function Container(props) {
    return (
        <div>
            <LeftBar tasks={faker.helpers.multiple(makeTaskList, {count: 10})} />
        </div>
    );
}

export default Container;