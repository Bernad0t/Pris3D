import axios from "axios";
import { IdPages, pathPages, UserStatus } from "../../sqhemas/enums";
import { useEffect, useState } from "react";
import { instance } from "./myAxios";

export default function useGetButtonsAccaunt(id: number){
    const [status, setStatus] = useState(UserStatus.unLog.valueOf())
    useEffect(() => {
        instance.get<string>(`http://127.0.0.1:8000/accaunt/getStatus`, {params: {"token" : localStorage.getItem("token")}})
        .then(({data}) => setStatus(data))
    }, [])

    const Buttons = [
        {id: IdPages.contactsAcc, name: "Контактные данные", ClassName: "oneNavAcc", active: id == IdPages.contactsAcc, path: "/accaunt" + pathPages.contactsAcc},
        {id: IdPages.favoriteAcc, name: "Избранное", ClassName: " oneNavAcc", active: id == IdPages.favoriteAcc, path: "/accaunt" + pathPages.favoriteAcc},
        {id: IdPages.historyAcc, name: "История заказов", ClassName: " oneNavAcc", active: id == IdPages.historyAcc, path: pathPages.historyAcc},
        {id: IdPages.adressAcc, name: "Адрес доставки", ClassName: "oneNavAcc", active: id == IdPages.adressAcc, path: pathPages.adressAcc}
    ]

    // console.log(status == UserStatus.user.valueOf(), status, "status")
    // TODO измени на admin
    return status == UserStatus.admin.valueOf() ? [...Buttons, {id: IdPages.changeSite, name: "Управление сайтом", ClassName: "oneNavAcc", active: id == IdPages.changeSite, path: "/accaunt" + pathPages.changeSite}]
    : Buttons
}