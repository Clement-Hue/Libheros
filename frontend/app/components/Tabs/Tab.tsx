import React from 'react';

function Tab({children, ...props}: Props) {
    return (
        <button role="tab" {...props}>
            {children}
        </button>
    );
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode
}

export default Tab;