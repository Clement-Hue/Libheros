import React from 'react';
import clsx from "clsx";

function IconButton({Icon, className, color = "primary"}: Props) {
    return (
        <button className={clsx(`rounded-full p-2 text-${color}-contrast-text shadow-md hover:opacity-(--hover-opacity)`, `bg-${color}-400 active:bg-${color}-600 cursor-pointer`, className)}><Icon/></button>
    );
}

type Props = {
    Icon: React.ComponentType;
    className?: string
    color?: "primary"
}

export default IconButton;