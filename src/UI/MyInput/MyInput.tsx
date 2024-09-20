import { InputHTMLAttributes } from "react";
import style from "./MyInput.module.css"


export default function MyTextInput({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <input type="text" {...props} className={style.my_input}/>
    )
}