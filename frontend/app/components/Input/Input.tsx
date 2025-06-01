import React, {useId} from "react"

const Input = React.forwardRef<HTMLInputElement, Props>(({label, required, error, ...props}, ref) => {
    const id = useId()
   return (
       <div className="flex flex-col gap-1">
           {label && <label htmlFor={id} >{label}{required && <span className="text-red-600"> *</span>}</label>}
           <input placeholder={label} className="
            border-2 outline-primary-600 border-primary-500 p-1 rounded-md  focus:border-primary-600 focus:outline-1
           " required={required} id={id} ref={ref} {...props}/>
           <div className="text-sm min-h-5 text-red-500">{error}</div>
       </div>
   )
})


type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    error?: string
};

export default Input;
