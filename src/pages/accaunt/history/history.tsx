import { useEffect, useState } from "react";
import { IdPages, pathPages, WayDeliveryEnum } from "../../../sqhemas/enums";
import useGetButtonsAccaunt from "../../components/getButtonsAccaunt";
import Header from "../../components/header/header";
import NavigateButtons from "../../components/navigate_button";
import { GoodsServiceDTO, OrderDTORel } from "../../../sqhemas/base_data_dto";
import { instance } from "../../components/myAxios";
import LoadingComponent from "../../components/LoadingComponent";

import style from "./history.module.css"
import GetStrDate from "../../../utils/GetStrDate";
import { useNavigate } from "react-router-dom";
import AccauntPanel from "../../components/AccauntPanel/AccaunPAnel";

function OneCardHistory(good: GoodsServiceDTO, Click: Function){
    return(
        <div className={style.oneCardHistory} onClick={() => Click(good.id)}>
            <div className={style.imgCardHist}>
                <img src={good.img} alt=""/>
            </div>
            <div className={style.nameCardHist} style={{textAlign:"center"}}>
                {good.Name}
            </div>
            <div className={style.priceCardHist} style={{textAlign:"center"}}>
                {good.Price} Р
            </div>
        </div>
    )
}

function OneHistory(order: OrderDTORel, Click: Function){
    return (
        <>
            <div className={style.oneHistory}>
                <div className={style.cardsHistory}>
                    {order.goods_in_basket.map(good => OneCardHistory(good, Click))}
                </div>
                <div className={style.infoHistory}>
                    <div className={style.datesHist}>
                        <div className={style.oneDateHist}>
                            <div className="">
                                дата заказа
                            </div>
                            <div className="">
                                {GetStrDate(order.DatePayment?.toString())}
                            </div>
                        </div>
                        {/* <div className={style.oneDateHist}>
                            <div className="">
                                {order.WayDelivery == WayDeliveryEnum.delivery ? "дата доставки" : "дата получения"}
                            </div>
                            <div className="">
                                {GetStrDate(order.DateReciept?.toString())}
                            </div>
                        </div> */}
                    </div>
                    <div className={style.totalPriceHist}>
                        <div className="">
                            сумма заказа
                        </div>
                        <div className="">
                            {order.TotalPrice} Р
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default function HistoryAcc(){
    const navigate = useNavigate()

    const [orders, setOrders] = useState<OrderDTORel[]>([])
    const [loading, setLoading] = useState(true)

    const Buttons = useGetButtonsAccaunt(IdPages.historyAcc)

    useEffect(() => {
        instance.get<OrderDTORel[]>("http://127.0.0.1:8000/purchase/getHistory", {params: {token: localStorage.getItem("token")}})
        .then(({data}) => setOrders(data))
        .finally(() => setLoading(false))
    }, [])

    function Click(id: number){
        navigate(pathPages.Item + `/${id}`)
    }

    return(
        <>
        <Header id={-1}/>
        <main className={"mainAcc"}>
            {/* <div className={"navAcc"}>
                <NavigateButtons 
                    activeClassName={"selectedOneNavAcc"}
                    Buttons = {Buttons}
                />
            </div> */}
            <AccauntPanel id={IdPages.historyAcc}/>
            <div className={"containAccInfo"}>
                <div className={style.nameAccCategory}>
                    история заказов
                </div>
                <LoadingComponent loading={loading}>
                    <div className={style.containHistory}>
                        {orders.map(order => OneHistory(order, Click))} 
                    </div>
                </LoadingComponent>
            </div>
        </main>
        </>
    )
}