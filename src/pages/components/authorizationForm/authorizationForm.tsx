import { useState } from "react"
import { pathPages } from "../../../sqhemas/enums"
import { TokensDTO } from "../../../sqhemas/base_data_dto"
import "./authorizationForm.css"
import ProcessSubmit from "../ProcessSubmit/ProcessSubmitAuth"
import { useNavigate } from "react-router-dom"

export interface AuthorizationFormProps{
    placeHolderMail: string
    placeHolderLogin: string
    placeHolderPassword: string
    buttonAuthorization: Function
    subButtons: Array<Function>
    login: string
    password: string
    changeParametrs: Function
}

export function GetEnterForm(clicked: Function, SetTokens: React.Dispatch<React.SetStateAction<TokensDTO>>){
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [afterSubmit, setAfterSubmit] = useState<JSX.Element>(<div></div>)

  const placeHolderMail = ""
  const placeHolderLogin = ""
  const placeHolderPassword = ""

  function changeParametrs(newLogin: string, newPassword: string){
    setLogin(newLogin)
    setPassword(newPassword)
  }

  function EnterButton(){
    const [name, setName] = useState("Войти")
    const navigate = useNavigate()
  
    function Clicked(){
      ProcessSubmit(login, password, SetTokens, setAfterSubmit, pathPages.Enter, "Неверный логин или пароль", navigate)
    }
    return(
        <button type="submit" name="button" className="regBut" onClick={Clicked}>{name}</button>
    )
  }

  function createAccButton(){
    function Clicked(){
        clicked(1)
    }
    return(
        <button type="button" className="accExistBut" name="button" onClick={Clicked}>СОЗДАТЬ АККАУНТ</button>
    )
}

  return(
    <><AuthorizationForm placeHolderMail={placeHolderMail} placeHolderLogin={placeHolderLogin} placeHolderPassword={placeHolderPassword}
    buttonAuthorization={EnterButton} subButtons={[createAccButton]} login={login} password={password} changeParametrs={changeParametrs}/>
    {afterSubmit}</>
  )
}

export function GetRegisterForm(clicked: Function, SetTokens: React.Dispatch<React.SetStateAction<TokensDTO>>){
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [afterSubmit, setAfterSubmit] = useState<JSX.Element>(<div></div>)
  
  const placeHolderMail = "Введите почту"
  const placeHolderLogin = "Введите логин"
  const placeHolderPassword = "Придумайте пароль"

  function changeParametrs(newLogin: string, newPassword: string){
    setLogin(newLogin)
    setPassword(newPassword)
  }

  function EnterButton(){
    const [name, setName] = useState("Зарегистрироваться")
    const navigate = useNavigate()

    function Clicked(){
      ProcessSubmit(login, password, SetTokens, setAfterSubmit, pathPages.Register, "Такой пользователь существует", navigate)
    }
    return(
        <button type="submit" name="button" className="regBut" onClick={Clicked}>{name}</button>
    )
  }

  function accExistButton(){
    function Clicked(){
        clicked(0)
    }
    return(
        <button type="button" className="accExistBut" name="button" onClick={Clicked}>ЕСТЬ АККАУНТ?</button>
    )
}

// function forgotPasswordButton(){
//   function Clicked(){

//   }
//   return(
//       <button type="button" className="accExistBut" name="button" onClick={Clicked}>ЗАБЫЛИ ПАРОЛЬ?</button>
//   )
// }

  return(
    
    <>
    <AuthorizationForm placeHolderMail={placeHolderMail} placeHolderLogin={placeHolderLogin} placeHolderPassword={placeHolderPassword}
    buttonAuthorization={EnterButton} subButtons={[accExistButton]} login={login} password={password} changeParametrs={changeParametrs}/>
    {afterSubmit}
    </>
  )
}


export function AuthorizationForm({placeHolderMail, placeHolderLogin, placeHolderPassword, buttonAuthorization, subButtons, 
  login, password, changeParametrs} : AuthorizationFormProps)
{

    return (
        <div className="fields">
          Логин
          <div className="">
            <input type="text" name="" onChange={(e) => {changeParametrs(e.target.value, password)}} placeholder={placeHolderLogin}/>
          </div>
          Пароль
          <div className="">
            <input type="password" name="" onChange={(e) => {changeParametrs(login, e.target.value)}} placeholder={placeHolderPassword}/>
          </div>
          <div className="">
            {buttonAuthorization()}
          </div>
          <div id={subButtons.length == 1 ? "" : "containHelpNav"}>
            {subButtons.map(but => but())}
            
          </div>
        </div>
    )
}