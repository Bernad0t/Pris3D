import { useState } from "react"
import "./AddBasket.css"
import GetOrder from "../../../../utils/GetOrder"
import { OrderDTORel } from "../../../../sqhemas/base_data_dto"
import { GoodsServiceClient } from "../../../../sqhemas/frontend_dto"
import { instance } from "../../myAxios"
import { convertGoodsService } from "../../../../utils/convertIntoClientFromDto"
import { useNavigate } from "react-router-dom"
import { pathPages } from "../../../../sqhemas/enums"

interface PropsBasketAdd{
    good_id: number
}

interface PropsChangeNumber{
    order: OrderDTORel
    card_id: number
    setCards: React.Dispatch<React.SetStateAction<GoodsServiceClient[]>>
    setOrder: React.Dispatch<React.SetStateAction<OrderDTORel | null>>
}

export function Reduce({order, card_id, setCards, setOrder}: PropsChangeNumber){
    function clicked(){
        AddBasket(undefined, undefined, card_id, 
            order.baskets.find(basket => basket.GoodsService_id == card_id)?.Number - 1
        ).then(() => GetOrder().then((data) => {setOrder(data), setCards(convertGoodsService(data.goods_in_basket, [], []))}))
    }
    return(
        <button disabled={order.baskets.find(basket => basket.GoodsService_id == card_id)?.Number <= 1 ? true : false}
            type="button" name="button" onClick={clicked}>-</button>
    )
}

export function Add({order, card_id, setCards, setOrder}: PropsChangeNumber){
    function clicked(){
        AddBasket(undefined, undefined, card_id, 
            order.baskets.find(basket => basket.GoodsService_id == card_id)?.Number + 1
        ).then(() => GetOrder().then((data) => {setOrder(data), setCards(convertGoodsService(data.goods_in_basket, [], []))}))
    }
    return(
        <button type="button" name="button" onClick={clicked}>+</button>
    )
}

export async function AddBasket(setState: React.Dispatch<React.SetStateAction<boolean>> | undefined, state: boolean | undefined, good_id: number, quantity: number){
    return instance.get<boolean>("http://127.0.0.1:8000/purchase/addBasket", {params: {"token": localStorage.getItem("token"), "good_id": good_id, "quantity": quantity}})
    .then(() => setState && state != undefined ? setState(!state) : null)
}

export async function DeleteBasket(setState: React.Dispatch<React.SetStateAction<boolean>> | undefined, state: undefined | boolean, good_id: number){
    return instance.delete("http://127.0.0.1:8000/purchase/deleteBasket", {params: {"token": localStorage.getItem("token"), "good_id": good_id}})
    .then(() => setState && state != undefined ? setState(!state) : null)
}

export default function BasketChangeButton({good_id}: PropsBasketAdd){
    const [inBasket, setInBasket] = useState(false)

    const navigate = useNavigate()
    
    instance.get<boolean>("http://127.0.0.1:8000/purchase/existItemInBasket", {params: {token: localStorage.getItem("token"), good_id: good_id}})
    .then(({data}) => {setInBasket(data)})

    function addBasket(){
        AddBasket(setInBasket, inBasket, good_id, 1)
        .catch(() => navigate(pathPages.authorization))
    }

    function deleteBasket(){
        DeleteBasket(setInBasket, inBasket, good_id)
    }

    return(
      (inBasket ? <button type="submit" name="button" className="addedBasketButton" onClick={deleteBasket}>В корзине</button> :
            <button type="submit" name="button" className="addBasketButton" onClick={addBasket}>Добавить в корзину</button>
            )
    )
}
