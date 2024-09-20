import { InputHTMLAttributes } from "react"
import style from "./MyCircleButton.module.css"

interface Props extends InputHTMLAttributes<HTMLButtonElement>{
    selected: boolean
}

export default function MyCircleButton({onClick, selected}: Props){
    return(
        <div className={style.contain_select}>
            <button className={selected ? style.button_selected : style.button_not_selected} onClick={onClick}></button>
        </div>
    )
}