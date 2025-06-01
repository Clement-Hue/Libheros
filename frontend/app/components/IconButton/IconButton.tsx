import React from 'react';
import clsx from "clsx";

const colors = {
    primary: "text-primary-contrast-text bg-primary-400 active:bg-primary-500 focus:bg-primary-600"
};

function IconButton({Icon, className, color = "primary", ...props}: Props) {
    return (
        <button className={clsx(`rounded-full p-2 shadow-md hover:opacity-(--hover-opacity)`, colors[color], className)} {...props}><Icon/></button>
    );
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    Icon: React.ComponentType;
    className?: string
    color?: keyof typeof colors
}

export default IconButton;