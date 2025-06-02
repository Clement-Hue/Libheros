import React from 'react';
import IconButton from "~/components/IconButton";
import clsx from "clsx";

function TaskItem({taskName, selected = false, ...props}: Props) {
    return (
        <button aria-label={taskName} aria-selected={selected}  className={clsx(
           "px-4 py-2 cursor-pointer hover:bg-gray-100 w-full rounded-md",
            {"bg-primary-400": selected, "bg-white": !selected},
        )} {...props} >
            {taskName}
        </button>
    );
}

type Props =  {
    taskName: string
    onClick?: () => void
    onIconClick?: () => void
    selected?: boolean
}
export default TaskItem;