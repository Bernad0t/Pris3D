import { useEffect, useState } from "react"
import Header from "../../../components/header/header"
import { AddressDTO, DataDTO, OrderDTORel } from "../../../../sqhemas/base_data_dto"
import GetOrder from "../../../../utils/GetOrder"
import Ticket from "../Ticket/Ticket"
import MyCircleButton from "../../../../UI/MyCircleButton/MyCircleButton"
import Addresses from "../../../components/addresses/addresses"

import basket_style from "../css/basket.module.css"
import style from "./address.module.css"

import NavPurchase from "../../../components/NavPurchase/NavPurchase"
import { IdPages, pathPages, ResultPurchase, WayDeliveryEnum } from "../../../../sqhemas/enums"
import axios from "axios"
import ContactSchedule from "../../../components/schedule/schedule"
import { instance } from "../../../components/myAxios"
import { useNavigate } from "react-router-dom"
import { ErrorMassage } from "../../change_site/insert_good/insert_good"

export default function ChooseAddress(){
    const navigate = useNavigate()

    const [order, setOrder] = useState<OrderDTORel | null>(null)
    const [data, setData] = useState<DataDTO | null>(null)
    const [addresses, setAddresses] = useState<AddressDTO[]>([])
    const [afterSubmit, setAfterSubmit] = useState<JSX.Element>(<div></div>)

    const [showAddresses, setShowAddresses] = useState(false)

    useEffect(() => {
        GetOrder()
        .then((data) => setOrder({...data, WayDelivery: WayDeliveryEnum.take}))
        axios.get<DataDTO>(`http://127.0.0.1:8000/data/GetDataContacts`, {params: {token: localStorage.getItem("token")}})
        .then(({data}) => setData({...data}))
    }, [])

    function handleSubmit(){ //  TODO  измени
        console.log(order, "order")
        if (addresses.find(addr => addr.Selected) || order?.WayDelivery == WayDeliveryEnum.take.valueOf()){
            if (order?.goods_in_basket.length != 0){
                if (addresses[0].Mobile.length != 0 && addresses[0].Mail.length != 0){
                    const new_order = {...order, ResultPurchase: ResultPurchase.delivering, DatePayment: new Date()}
                    setOrder(new_order)
                    console.log(new_order, "new_order")
                    instance.post(`http://127.0.0.1:8000/purchase/setOrder`, new_order, 
                        {withCredentials: true, params: {token: localStorage.getItem("token")}})
                    .then(() => navigate(pathPages.historyAcc))
                }
                else
                    ErrorMassage("Укажите в профиле телефон и почту", setAfterSubmit)
            }
            else
                ErrorMassage("Корзина пуста", setAfterSubmit)
        }
        else
            ErrorMassage("Выберите адрес", setAfterSubmit)
    }

    return(
        <>
        <Header id={-1}/>
        <main>
            <div className={basket_style.containMain}>
                <div className={basket_style.containCardInfoPurchase}>
                    <NavPurchase id_selected={IdPages.chooseAddressPurchase}/>
                    <div className={style.contain_all}>
                        <div className={style.contain_choose}>
                            <div className={style.one_choose}>
                                <MyCircleButton selected={!showAddresses} onClick={() => {
                                    if (showAddresses)
                                        setShowAddresses(!showAddresses)
                                    setOrder({...order, WayDelivery: WayDeliveryEnum.take})
                                }}/>
                                <div className={style.one_choose_name}>
                                    Самовывоз по нашему адресу
                                </div>
                            </div>
                            <div className={style.one_choose}>
                                <MyCircleButton selected={showAddresses} onClick={() => {
                                    if (!showAddresses)
                                        setShowAddresses(!showAddresses)
                                    setOrder({...order, WayDelivery: WayDeliveryEnum.delivery})
                                }}/>
                                <div className={style.one_choose_name}>
                                    Доставка на ваш адрес. Пункт выдачи будет указан в сообщении на почте после обработки заказа
                                </div>
                            </div>
                            <div style={{display: showAddresses ? "block" : "none", paddingLeft: "15px", paddingTop: "15px"}}>
                                <Addresses addresses={addresses} setAddresses={setAddresses}/>
                            </div>
                        </div>
                        <div className={style.contain_schedule}>
                            <ContactSchedule data={data}/>
                        </div>
                    </div>
                </div>
                
                <div style={{width: "30%"}}>
                    <Ticket order={order} handleSubmit={() => handleSubmit()}/>
                    {afterSubmit}
                </div>
            </div>
        </main>
        </>
    )
}