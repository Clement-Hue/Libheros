import React from "react";
import clsx from "clsx";

const List: React.FC<Props>  = (props) => {
    const { children, className } = props;
    return (
        <ul {...props} className={clsx("list-none flex flex-col", className)}>{children}</ul>
    );
};


type Props = React.HTMLAttributes<HTMLUListElement> & {
    children?: React.ReactNode;
};

export default List;