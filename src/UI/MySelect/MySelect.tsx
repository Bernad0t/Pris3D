import { InputHTMLAttributes } from "react"
import style from "./MySelect.module.css"

interface Props extends InputHTMLAttributes<HTMLSelectElement>{
    children: React.ReactNode
}

export default function MySelect({onChange, children, ...props}: Props){
    return(
        <select {...props} className={style.MySelect} onChange={onChange}>
            {children}
        </select>
    ) 
}