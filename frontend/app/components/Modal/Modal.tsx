import React, {useEffect} from 'react';

function Modal({onClose, children, isOpen, ...props}: Props) {
    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", isOpen);
    }, [isOpen]);
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/15"
            role="dialog"
            onClick={onClose}
            {...props}
        >
            <div
                className="bg-white rounded-md shadow-xl p-6 w-full max-w-md relative flex flex-col gap-2"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}

type Props = React.PropsWithChildren & {
    onClose?: () => void
    isOpen?: boolean
} & React.HTMLAttributes<HTMLDivElement>;

export default Modal;