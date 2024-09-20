import { useNavigate } from "react-router-dom"

import basket_style from "./NavPurchase.module.css"
import list_sign from "../../auto_catology/assets/img/list.png"
import { IdPages, pathPages } from "../../../sqhemas/enums"

interface Propsitem{
    id: number
    name: string
    path: string
}

function OneButton(item: Propsitem, active: boolean, click: Function){
    return(
        <>
            <div className={basket_style.oneNuvPurchase}>
                <button type="button" name="button" className={active ? `${basket_style.oneNuvPurchaseBut} ${basket_style.oneNuvPurchaseButSelected}` :
                 basket_style.oneNuvPurchaseBut} onClick={() => click(item)}>{item.name}</button>
            </div>
            {item.name != "Оплата" && 
                <div className={basket_style.sign}>
                    <img src={list_sign} alt=""/>
                </div>
            }
        </>
    )
}

export default function NavPurchase({id_selected}: {id_selected: number}){
    const navigate = useNavigate()

    const buttons: Propsitem[] = [
        {id: IdPages.basketAcc, name: "Корзина", path: pathPages.basketAcc},
        {id: IdPages.chooseAddressPurchase, name: "Адрес доставки", path: pathPages.addressPurchase},
        {id: 3, name: "Оплата", path: ""},
    ]

    function handleClick(item: Propsitem){
        navigate(item.path)
    }

    return(
        <div className={basket_style.containNuvPurchase}>
            {buttons.map(button => OneButton(button, button.id == id_selected, handleClick))}
        </div>
    )
}