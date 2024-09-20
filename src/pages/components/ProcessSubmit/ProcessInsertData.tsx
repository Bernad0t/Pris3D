import axios from "axios";
import { Catalog, TypeAutoParts } from "../../../sqhemas/enums";
import { GoodsServiceAddDTO, GoodsServiceDTO } from "../../../sqhemas/base_data_dto"
import { instance } from "../myAxios";

export async function ProcessUpdateData(data: GoodsServiceDTO, files: File[] | null, images: string[]){
    const formData = new FormData()
    if (files)
        Array.from(files).forEach((file) => formData.append('files', file))
    formData.append("data", JSON.stringify(data))
    formData.append("images", JSON.stringify(images))
    return instance.post(`http://127.0.0.1:8000/data/updateData`, formData,
        {withCredentials: true, params: {
           token: localStorage.getItem("token")
       }} )
    .catch((error) => {
        return error
    })
}

export default async function ProcessInsertData(name: string, catalog: Catalog, type: TypeAutoParts | null, article: string | null, 
    description: string, mark: string, price: number, files: File[]){
    const data: GoodsServiceAddDTO = {
        Name: name,
        TypeGoods: type,
        Catalog: catalog,
        Article: article,
        Description: description,
        Mark: mark,
        Price: price
    } 

    const formData = new FormData()
    Array.from(files).forEach((file) => formData.append('files', file))
    formData.append("data", JSON.stringify(data))
    return instance.post(`http://127.0.0.1:8000/data/insertData`, formData,
        {withCredentials: true, params: {
           token: localStorage.getItem("token")
       }} )
    .catch((error) => {
        return error
    })
}