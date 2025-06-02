import React from 'react';
import IconButton from "~/components/IconButton";
import clsx from "clsx";

function TaskItem({children, selected = false, iconButtonProps, ...props}: Props) {
    return (
        <div  className={clsx(
           "px-4 py-2 relative cursor-pointer hover:bg-gray-100",
            {"bg-primary-400": selected, "bg-white": !selected},
        )} {...props} >
            {children}
            <IconButton className="absolute top-0 bottom-0 right-0 my-auto z-10" {...iconButtonProps}/>
        </div>
    );
}

type Props = React.PropsWithChildren & {
    onClick?: () => void
    onIconClick?: () => void
    iconButtonProps: React.ComponentProps<typeof IconButton>
    selected?: boolean
}
export default TaskItem;