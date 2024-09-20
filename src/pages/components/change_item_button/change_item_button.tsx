import { MouseEventHandler } from "react"
import change from "./img/change.png"
import deletePic from "./img/delete.png"

interface Props{
    clicked: MouseEventHandler<HTMLDivElement>,
    height: string,
    width: string
}

export function DeleteItemButton({clicked, height, width}: Props){
    return(
        <div style={{height: height, width: width, marginTop: "2%"}} onClick={clicked}>
            <input type="image" src={deletePic} className="change_item" style={{height: "100%", width: "100%"}}/>
        </div>
    )
}

export default function ChangeItemButton({clicked, height, width}: Props){
    return(
        <div style={{height: height, width: width, marginTop: "2%"}} onClick={clicked}>
            <input type="image" src={change} className="change_item" style={{height: "100%", width: "100%"}}/>
        </div>
    )
}