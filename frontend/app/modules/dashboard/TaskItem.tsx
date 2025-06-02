import React from 'react';
import IconButton from "~/components/IconButton";

function TaskItem({children, iconButtonProps}: Props) {
    return (
        <div className="px-4 py-2 relative cursor-pointer hover:bg-gray-100" >
            <IconButton className="absolute top-0 bottom-0 right-0 my-auto z-10" {...iconButtonProps}/>
            {children}
        </div>
    );
}

type Props = React.PropsWithChildren & {
    onClick?: () => void
    onIconClick?: () => void
    iconButtonProps?: React.ComponentProps<typeof IconButton>
}
export default TaskItem;