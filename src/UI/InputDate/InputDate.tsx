import { InputHTMLAttributes } from "react"
import style from "./InputDate.module.css"

interface Props extends InputHTMLAttributes<HTMLInputElement>{
    date: Date | undefined
}

export default function InputDate({date, ...props}: Props){
    return(
        <input {...props} className={style.input} type="date" value={date?.toString()}/>
    )
}