import style from "./MyBlueButton.module.css"

interface Props{
    children: React.ReactNode
    click: Function
}

export default function MyBlueButton({children, click}: Props){
    return(
        <button className={style.my_button} onClick={() => click()}>{children}</button>
    )
}