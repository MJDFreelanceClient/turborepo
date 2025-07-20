import {ChangeEventHandler, ReactNode} from "react";

export const InvoiceInput = ({label, id, className, value, onChange, hideLabel}:
                             {label:ReactNode, id:string, className?:string, value:string|number, onChange:ChangeEventHandler<HTMLInputElement>, hideLabel?:boolean}) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`} >
            <label htmlFor={id} className={`text-preset-2 text-purple-700 dark:text-white ${hideLabel && 'hidden'}`}>{label}</label>
            <input id={id} type="text" value={value} onChange={onChange}
                   className={`px-5 py-4.5 outline-1 outline-purple-500 rounded-[4px] text-purple-800 text-preset-3 dark:text-white`} />
        </div>
    );
};