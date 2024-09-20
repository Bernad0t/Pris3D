import { InputHTMLAttributes } from "react";
import style from "./paggination_button.module.css"

export default function PagginationButton({children, onClick}: InputHTMLAttributes<HTMLButtonElement>){
    return(
        <button onClick={onClick} className={style.button}>{children}</button>
    )
}