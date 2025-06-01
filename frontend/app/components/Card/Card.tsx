import React from 'react';
import clsx from 'clsx';

function Card({children, className}: Props) {
    return (
        <div className={clsx("min-w-md max-w-full rounded-md flex flex-col bg-white p-6", className)}>
            {children}
        </div>
    );
}

type Props = React.PropsWithChildren & {
    className?: string;
}

export default Card;