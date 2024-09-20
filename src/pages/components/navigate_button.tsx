import "./navigate_button.css"
import {useNavigate} from "react-router";
import { pathPages } from "../../sqhemas/enums";
import {useState} from "react";
import { GetEnterForm, GetRegisterForm } from "./authorizationForm/authorizationForm";
import { TokensDTO } from "../../sqhemas/base_data_dto";

interface Props{
    id: number
    name: string
    ClassName: string
    activeClassName: string
    active: boolean
    onClick: Function
}

interface ListButtons{
    id: number,
    name: string,
    ClassName: string,
    active: boolean,
    path: string
}

interface PropsNuvButtons{
    activeClassName: string,
    Buttons: Array<ListButtons>
}

interface FormAuthorizationProps{
    SetTokens: React.Dispatch<React.SetStateAction<TokensDTO>>
}

function NavButton({id, name, ClassName, activeClassName, active, onClick}: Props){

    function clicked() {
        onClick(id)
    }
    
    return(
        <button type="button" name="button" className={`${ClassName}${active ? " " + activeClassName : ""}`} onClick={clicked}> 
            {name}
        </button>
    )
}

export function FormAuthorization({SetTokens}: FormAuthorizationProps){

    const [Buttons, setButtons] = useState([
        {id: 0, name: "Вход", ClassName: "EnterRegisterBut", active: true, form: GetEnterForm},
        {id: 1, name: "Регистрация", ClassName: "EnterRegisterBut", active: false, form: GetRegisterForm},
    ])

    function clicked(id: number) {
        setButtons(Buttons.map(button => button.id == id ? {...button, active: true} : {...button, active: false}))
    }

    return (
        <>
        <div className="selectWay">
        {Buttons.map(button =>
            <NavButton key={button.id} id={button.id} name={button.name} ClassName={button.ClassName} activeClassName={"selectedRegistrButton"} active={button.active} onClick={clicked} />
        )}
        </div>
        <div>
        {
            Buttons.map(button => button.active == true ? button.form(clicked, SetTokens) : null)
        }
        </div>
        </>
    )
}

export function LoginButton(){
    const navigate = useNavigate()

    function Clicked(){
        navigate(pathPages.authorization)
    }

    return (
        <button type="button" name="button" className="login" onClick={Clicked}>Вход</button>
    )
}

export function AccauntButton(){
    const navigate = useNavigate()
    function Clicked(){
        navigate("/accaunt" + pathPages.contactsAcc)
    }

    return (
        <button type="button" name="button" className="login" onClick={Clicked}>Аккаунт</button>
    )
}

export default function NavigateButtons({activeClassName, Buttons}: PropsNuvButtons){
    const navigate = useNavigate()

    function clicked(id: number) {
        const Button = Buttons.find(Buttons => Buttons.id == id)
        if (Button !== undefined)
            navigate(Button.path)
    }

    return (
        Buttons.map(button =>
             <NavButton key={button.id} id={button.id} name={button.name} ClassName={button.ClassName} activeClassName={activeClassName} active={button.active} onClick={clicked} />
        )
    )
}

