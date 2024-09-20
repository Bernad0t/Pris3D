import axios from "axios"
import addHeart from "./img/addHeart.png"
import heart from "./img/heart.png"
import "./ButtonFavorite.css"
import { instance } from "../myAxios"

interface Props{
    Card_id: number
    Changed: Function
}

export function AddFavorite({Card_id, Changed}: Props){
    function clicked(){
        instance.get("http://127.0.0.1:8000/accaunt/setFavorites", {params: {
            token: localStorage.getItem("token"),
            card_id: Card_id
        }})
        .then(() => Changed(Card_id))
    }

    return (
    <div className="wrapper" onClick={clicked}>
        <img src={addHeart} alt="" />
    </div>
    )
}

export function DeleteFavorite({Card_id, Changed}: Props){
    function clicked(){
        instance.get("http://127.0.0.1:8000/accaunt/deleteFavorites", {params: {
            token: localStorage.getItem("token"),
            card_id: Card_id
        }})
        .then(() => Changed(Card_id))
    }

    return (
    <div className="wrapper" onClick={clicked}>
        <img src={heart} alt="" />
    </div>
    )
}