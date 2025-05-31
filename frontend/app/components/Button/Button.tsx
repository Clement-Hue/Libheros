import React from "react";
import clsx from "clsx"


const Button = React.forwardRef<HTMLButtonElement, Props>(
    ({ children, variant = "primary", className, ...props }: Props, ref) => {
       const baseStyles = "rounded-md outline-none border-2 bg-none px-[6px] py-[4px] cursor-pointer hover:opacity-(--hover-opacity)";

       const variantStyles = {
          primary: "border-transparent bg-primary-500 active:bg-primary-600",
          secondary: "border-primary-500 text-primary-500 active:border-primary-600 active:text-primary-600",
          tertiary: "border-none text-primary-500 active:text-primary-600"
       };

       return (
           <button
               {...props}
               className={clsx(baseStyles, variantStyles[variant], className)}
               ref={ref}
           >
              {children}
           </button>
       );
    }
);
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
   children?: React.ReactNode;
   variant?: "primary" | "secondary" | "tertiary";
};
export default Button;