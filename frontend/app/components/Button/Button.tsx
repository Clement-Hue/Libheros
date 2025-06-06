import React from "react";
import clsx from "clsx"

const variantStyles = {
    primary: "border-transparent outline-none text-primary-contrast-text bg-primary-500 active:bg-primary-600 focus:bg-primary-700",
    destructive: "border-transparent outline-none text-red-contrast-text bg-red-500 active:bg-red-600 focus:bg-red-700",
    secondary: "border-primary-500 text-primary-500 active:border-primary-800 active:text-primary-800 focus:outline-1 focus:border-primary-600 focus:text-primary-600",
    tertiary: "border-none text-primary-500 active:text-primary-600"
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
    ({ children, variant = "primary", className, Icon, ...props }: Props, ref) => {
       const baseStyles = "flex flex-row items-center justify-center gap-1 rounded-md border-2 bg-none px-[6px] py-[4px] cursor-pointer hover:opacity-(--hover-opacity) disabled:bg-gray-300 disabled:cursor-auto ";

       return (
           <button
               className={clsx(baseStyles, variantStyles[variant], className)}
               type="button"
               ref={ref}
               {...props}
           >
               {Icon && <Icon className="shrink-0" />}
               <div className="truncate overflow-hidden">
                   {children}
               </div>
           </button>
       );
    }
);
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
   children?: React.ReactNode;
   variant?: keyof typeof variantStyles
    Icon?: React.ComponentType<{className: string}>;
};
export default Button;