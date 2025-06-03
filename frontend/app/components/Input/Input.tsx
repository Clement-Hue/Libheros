import React, {useId} from "react"
import {useField} from "formik";
import clsx from "clsx";

const Input = React.forwardRef<HTMLInputElement, Props>(({label, required, ...props}, ref) => {
    const id = useId()
    const errorId = useId()
    const [field, meta] = useField(props)
   return (
       <div className="flex flex-col gap-1">
           {label && <label htmlFor={id} className={clsx({
               "text-red-500": meta.touched && !!meta.error,
           })} >{label}{required && <span className="text-red-600"> *</span>}</label>}
           <input aria-errormessage={meta.error ? errorId : undefined} placeholder={label} className={clsx("border-2 outline-primary-600 border-primary-500 p-1 rounded-md  focus:border-primary-600 focus:outline-1 ")}
               required={required} id={id} ref={ref} {...field} {...props}/>
           <div id={errorId} className="text-sm min-h-5 text-red-500">{meta.touched && meta.error}</div>
       </div>
   )
})


type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string
};

export default Input;
