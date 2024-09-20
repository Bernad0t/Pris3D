import MyBlueButton from "../MyBlueButton/MyBlueButton"
import MyTextInput from "../MyInput/MyInput"
import OpenDetails from "../open_details/open_details"
import { InputHTMLAttributes, useState } from "react"

import style from "./MyDetails.module.css"
import MyDropList from "../MyDropList/MyDropList"

interface Props extends InputHTMLAttributes<HTMLDivElement>{
    name: string
    children: React.ReactNode
}

interface InsertProps extends Props{
    setMark: React.Dispatch<React.SetStateAction<string>>
}

export function MyFilterDetails({name, children, ...props}: Props){
    const [show, setShow] = useState(false)
    return(
        <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
        <div className={`${props.className} ${style.contain_details}`} style={props.style}>
            <div style={{display: "flex", justifyContent: "space-between", width: "100%", textAlign: "center"}} onClick={() => setShow(!show)}>
                <span>{name}</span><div style={{margin: "auto", marginRight: "0"}}><OpenDetails active={show}/></div>
            </div>
            <MyDropList active={show}>
                <div style={{maxHeight: "120px", width: "100%", display: "flex", paddingLeft: "5%", overflow: "auto"}} className={style.contain_children}>
                    <div style={{height: "100%", width: "100%", display: "block"}}>
                        {children}
                    </div>
                </div>
            </MyDropList>
        </div>
        </div>
    )
}

export default function MyInsertDetails({setMark, name, children, ...props}: InsertProps){
    const [show, setShow] = useState(false)
    const [newMark, setNewMark] = useState("")
    
    return(
        <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
        <div className={`${props.className} ${style.contain_details}`} style={props.style}>
            <div style={{display: "flex", justifyContent: "space-between", width: "100%", textAlign: "center"}} onClick={() => setShow(!show)}>
                <span>{name}</span><div style={{margin: "auto", marginRight: "0"}}><OpenDetails active={show}/></div>
            </div>
            <MyDropList active={show}>
            <div style={{height: "60px", width: "100%", paddingLeft: "5%", display: "flex", marginTop: "5%"}}>
                <div className={style.contain_children} style={{height: "100%", width: "50%", overflow: "auto", display: "block"}}>
                    {children}
                </div>
                <div style={{paddingLeft:"5%"}}> {/*млжно было в чилдрене*/}
                    <div className={style.hepl_nuv}>
                        <MyTextInput placeholder="Добавить" value={newMark} onChange={(e) => setNewMark(e.target.value)}/>
                    </div>
                    {
                        newMark.length != 0 &&
                        <div className={style.hepl_nuv} style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "5%"}}>
                            <div style={{width:"30%"}}>
                                <MyBlueButton click={() => {setShow(!show), setMark(newMark)}}>Ок</MyBlueButton>
                            </div>
                        </div>
                    }
                </div>
            </div>
            </MyDropList>
        </div>
        </div>
    )
}