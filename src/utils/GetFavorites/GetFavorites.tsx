// import { useEffect } from "react";
import { GoodsServiceDTO } from "../../sqhemas/base_data_dto";
import axios from "axios";

export default async function GetFavorites(){
    return axios.get<Array<GoodsServiceDTO>>("http://127.0.0.1:8000/accaunt/GetFavorites", {params: {"token": localStorage.getItem("token")}})
        .then(({data}) => {
            return data
        })
        .catch(error => {
        if (error == 410){
            axios.get<string>(`http://127.0.0.1:8000/accaunt/getAccessToken`, {params: {"refresh_token" : localStorage.getItem("refresh_token")}})
            .then(({data}) => {
                localStorage.setItem("token", data)
                axios.get<Array<GoodsServiceDTO>>("http://127.0.0.1:8000/accaunt/GetFavorites", {params: {"token": localStorage.getItem("token")}})
                .then(({data}) => {
                    return data
                })
            })
            .catch(() => {return []})
        }
        else return []
        })
}