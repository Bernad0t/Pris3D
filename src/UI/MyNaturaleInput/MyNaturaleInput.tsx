import { InputHTMLAttributes } from "react";
import syle from "./MyNaturaleInput.module.css"

export default function MyNaturaleInput({...props}: InputHTMLAttributes<HTMLInputElement>){
    return(
        <input type="text" {...props} className={syle.my_input}/>
    )
}