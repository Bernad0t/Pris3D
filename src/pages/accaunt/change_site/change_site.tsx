import { IdPages, pathPages } from "../../../sqhemas/enums";
import AccauntPanel from "../../components/AccauntPanel/AccaunPAnel";
import useGetButtonsAccaunt from "../../components/getButtonsAccaunt";
import Header from "../../components/header/header";
import NavigateButtons from "../../components/navigate_button";

import "./chage_site.css"

export default function ChageSite(){
    // const ButtonsAcc = useGetButtonsAccaunt(IdPages.changeSite)

    const ButtonsChangeSite = [
        {id: IdPages.contactsData, name: "Контактные данные", ClassName: "oneNavChangeSite", active: false, path: "/data" + pathPages.contactsData},
        {id: IdPages.insertData, name: "Добавить товар", ClassName: " oneNavChangeSite", active: false, path: "/data" + pathPages.insertData},
        {id: IdPages.changeData, name: "Изменить товар", ClassName: " oneNavChangeSite", active: false, path: pathPages.autoParts}
    ]
    
    return(
        <>
        <Header id={-1}/>
        <main className="mainAcc">
            {/* <div className="navAcc">
                <NavigateButtons 
                    activeClassName="selectedOneNavAcc"
                    Buttons = {ButtonsAcc}
                />
            </div> */}
            <AccauntPanel id={IdPages.changeSite}/>
            <div className="containAccInfo">
                <div className="nameAccCategory">
                    управление сайтом
                </div>
                <div className="navChangeSite">
                    <NavigateButtons 
                        activeClassName=""
                        Buttons = {ButtonsChangeSite}
                    />
                </div>
            </div>
        </main>
        </>
    )
}