import "./assets/header.css"
import logo from "./assets/img/logo.png"

import { LoginButton, AccauntButton } from "../navigate_button";
import NavigateButtons from "../navigate_button";
import { IdPages, pathPages } from "../../../sqhemas/enums";
import { useEffect, useState } from "react";
import { instance } from "../myAxios";

interface Props{
  id: number
}

export default function Header({id}: Props){
  const [isActive, setIsActive] = useState(false)
  console.log(localStorage.getItem("token"))
  useEffect(() => {
    localStorage.getItem("token") ?
    instance.get<boolean>("http://127.0.0.1:8000/auth/isActive", {params: {"token": localStorage.getItem("token"), bool_print: true}})
      .then(({data}) => {
        setIsActive(data)
      })
      .catch(error => {
        if (error && error.response.status != 410){
          setIsActive(false)
          localStorage.removeItem("token")
        }
      }) : setIsActive(false)
  }, [])
  
  return (
      <header>
    <div className="logo">
      <img src={logo} alt="logo" />
    </div>
    <div className="navigate">
      <NavigateButtons
      activeClassName="selected_button"
      Buttons={[
        {id: IdPages.Main, name: "Главная", ClassName: "first_but_nuv but_nav", active: id == IdPages.Main ? true : false, path: pathPages.Main},
        {id: IdPages.scan3d, name: "3D сканирование", ClassName: " but_nav", active: id == IdPages.scan3d ? true : false, path: pathPages.scan3d},
        {id: IdPages.autoParts, name: "Автомобильные запчасти", ClassName: " but_nav", active: id == IdPages.autoParts ? true : false, path: pathPages.autoParts}, 
        {id: IdPages.print3d, name: "3D Печать", ClassName: " but_nav", active: id == IdPages.print3d ? true : false, path: pathPages.print3d}, 
        {id: IdPages.printer3d, name: "3D Принтер", ClassName: "last_but_nuv but_nav", active: id == IdPages.printer3d ? true : false, path: pathPages.printer3d}
        ]}
      />
    </div>
    <div className="contain_login_but">
      {localStorage.getItem("token") ? <AccauntButton/> : <LoginButton/>}
    </div>
  </header>
    )
}