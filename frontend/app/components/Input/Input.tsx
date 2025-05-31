import React, {useId} from "react"

const Input = React.forwardRef<HTMLInputElement, Props>(({label, required, ...props}, ref) => {
    const id = useId()
   return (
       <div className="flex flex-col gap-1">
           {label && <label htmlFor={id} >{label}{required && " *"}</label>}
           <input placeholder={label} className="
            border-2 border-primary-500 p-1 rounded-md outline-none focus:border-primary-600 focus:border-3
           " required={required} id={id} ref={ref} {...props}/>
       </div>
   )
})


type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string
};

export default Input;
