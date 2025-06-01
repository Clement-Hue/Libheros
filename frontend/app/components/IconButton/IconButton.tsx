import React from 'react';
import clsx from "clsx";

const colors = {
    primary: "text-primary-contrast-text bg-primary-400 active:bg-primary-500 focus:bg-primary-600",
    red: "text-red-contrast-text bg-red-400 active:bg-red-500 focus:bg-red-600",
};

function IconButton({Icon, className, color = "primary", ...props}: Props) {
    return (
        <button className={clsx(`rounded-full cursor-pointer h-7 w-7 p-2 shadow-md hover:opacity-(--hover-opacity)`, colors[color], className)} {...props}>
            <Icon className="w-full h-full"/>
        </button>
    );
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    Icon: React.ComponentType<{className: string}>
    className?: string
    color?: keyof typeof colors
}

export default IconButton;