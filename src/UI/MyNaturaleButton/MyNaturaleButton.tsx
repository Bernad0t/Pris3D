import { InputHTMLAttributes } from "react"
import my_style from "./MyNaturaleButton.module.css"

export default function MyNaturaleButton({children, onClick, style}: InputHTMLAttributes<HTMLButtonElement>){
    return(
        <button style={style} className={my_style.my_button} onClick={onClick}>{children}</button>
    )
}