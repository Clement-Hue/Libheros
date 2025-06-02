import React from 'react';

function TabPanel({children, ...props}: Props) {
    return (
        <div role="tabpanel" {...props}>
            {children}
        </div>
    );
}

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode
}

export default TabPanel;