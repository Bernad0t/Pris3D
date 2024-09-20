import axios from "axios"
import { OrderDTORel } from "../sqhemas/base_data_dto"
import { convertGoodsService } from "./convertIntoClientFromDto"
import { GoodsServiceClient } from "../sqhemas/frontend_dto"

export default async function GetOrder(){
    return axios.get<OrderDTORel>("http://127.0.0.1:8000/purchase/getBaskets", {params: {token: localStorage.getItem("token")}}) // вынести в отдел файл
    .then(({data}) => {
        // setOrder(data)
        // const data_cards = data.goods_in_basket
        // // GetFavorites()
        // // .then((data) => {
        // //     setCards(convertGoodsService(data_cards, cards, data))
        // // })
        // setCards(convertGoodsService(data_cards, [], []))
        return data
    })
}