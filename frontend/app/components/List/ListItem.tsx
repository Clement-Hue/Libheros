import React from "react";


const ListItem = React.forwardRef<HTMLLIElement,Props>(({children, className}: Props, ref) => {
    return (
        <li className={className} ref={ref}>{children}</li>
    )
})


type Props = React.LiHTMLAttributes<HTMLLIElement> & {
    children?: React.ReactNode;
};

export default ListItem;