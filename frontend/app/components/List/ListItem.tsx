import React from "react";


const ListItem = React.forwardRef<HTMLLIElement,Props>(({children, className, ...props}: Props, ref) => {
    return (
        <li className={className} ref={ref} {...props}>{children}</li>
    )
})


type Props = React.LiHTMLAttributes<HTMLLIElement> & {
    children?: React.ReactNode;
};

export default ListItem;