import { InputHTMLAttributes } from "react";
import style from "./button_filter.module.css"

interface Props extends InputHTMLAttributes<HTMLButtonElement>{
    active: boolean
}

export default function ButtonFilter({active, onClick}: Props){
    return (
        <button type="button" name="button" className={style.but_category}
            onClick={onClick} 
            style={{backgroundColor:active==true?"rgba(52, 75, 245, 1)":"#282727"}}>
        </button>
    )
}