import { GoodsServiceClient } from "../../../sqhemas/frontend_dto";
import Header from "../../components/header/header";

import {  OrderDTORel } from "../../../sqhemas/base_data_dto";
import { useEffect, useState } from "react";

import basket_style from "./css/basket.module.css"
import { Add, DeleteBasket, Reduce } from "../../components/ProcessSubmit/AddBasket/AddBasket";
import GetOrder from "../../../utils/GetOrder";
import Ticket from "./Ticket/Ticket";
import NavPurchase from "../../components/NavPurchase/NavPurchase";
import { IdPages, pathPages } from "../../../sqhemas/enums";
import { useNavigate } from "react-router-dom";
import { convertGoodsService } from "../../../utils/convertIntoClientFromDto";

function CardPurchase(card_id: number, cards: Array<GoodsServiceClient>, setCards: 
    React.Dispatch<React.SetStateAction<GoodsServiceClient[]>>, order: OrderDTORel, setOrder: React.Dispatch<React.SetStateAction<OrderDTORel | null>>){
    const card = cards.find(card => card.id == card_id)
    
    function deleteClicked(){
        DeleteBasket(undefined, undefined, card_id)
        .then(() => GetOrder().then((data) => {setOrder(data), setCards(convertGoodsService(data.goods_in_basket, [], []))}))
    }

    return(
        <div className={basket_style.cardPurchase}>
            <div className={basket_style.containImgCard}>
                <img src={card?.img} alt=""/>
            </div>
            <div className={basket_style.infoCardPurchase}>
                <div className={basket_style.NamePriceCard}>
                    <div className="">
                        {card?.Name}
                    </div>
                    <span>{card?.Price} Р</span>
                </div>
            <div className={basket_style.containChange}>
                <div className={basket_style.NumberChange}>
                <div className="">
                    <Reduce order={order} card_id={card_id} setCards={setCards} setOrder={setOrder}/>
                </div>
                <div className="">
                    {order.baskets.find(basket => basket.GoodsService_id == card_id)?.Number}
                </div>
                <div className="">
                    <Add order={order} card_id={card_id} setCards={setCards} setOrder={setOrder}/>
                </div>
                </div>
                <div className={basket_style.deletePurchase}>
                    <button type="button" name="button" onClick={deleteClicked}>Удалить</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default function Basket(){
    const navigate = useNavigate()

    const [order, setOrder] = useState<OrderDTORel | null>(null)
    const [cards, setCards] = useState<Array<GoodsServiceClient>>([])

    console.log(cards, "cards")

    useEffect(() => {
        GetOrder().then((data) => {setOrder(data), setCards(convertGoodsService(data.goods_in_basket, cards, []))})
    }, [])
    //  сделать div с display none или navigate
    return(
        <>
        <Header id={-1}/>
        <main>
            <div className={basket_style.containMain}>
                <div className={basket_style.containCardInfoPurchase}>
                    <NavPurchase id_selected={IdPages.basketAcc}/>
                    {cards.map(card => CardPurchase(card.id, cards, setCards, order, setOrder)) /*cards появляются после order*/} 
                </div>

                <div style={{width: "30%"}}>
                    <Ticket order={order} handleSubmit={() => navigate(pathPages.addressPurchase)}/>
                </div>
            </div>
        </main>
        </>
    )
}