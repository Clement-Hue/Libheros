import React from 'react';
import {LeftBar} from "~/components";
import {makeTask} from "~/core/factories";

function Container(props) {
    return (
        <div>
            <LeftBar tasks={[makeTask(), makeTask()]} />
        </div>
    );
}

export default Container;