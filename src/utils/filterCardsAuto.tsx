import { GoodsServiceDTO } from "../sqhemas/base_data_dto";
import { Catalog } from "../sqhemas/enums";
import axios from "axios"
import { FilterAuto, GoodsServiceClient } from "../sqhemas/frontend_dto";
import { convertGoodsService } from "./convertIntoClientFromDto";
import GetFavorites from "./GetFavorites/GetFavorites";
import convert_str_to_enum_AutoParts from "./convert_str_to_enum_type";

function Query(key: string, favCards: GoodsServiceDTO[], biggerThan: number, lowerThan: number, mark: string, 
    FilterSearch: string){
    return axios.get<Array<GoodsServiceDTO>>("http://127.0.0.1:8000/data/catology/filterByCategory", {params : {
        catalog: Catalog.AutoParts.valueOf(),
        type_good: convert_str_to_enum_AutoParts(key),
        biggerThan: biggerThan, 
        lowerThan: lowerThan,
        mark: mark, 
        FilterSearch: FilterSearch
    }})
    .then(({data}) => {
        return convertGoodsService(data, [], favCards)
    })
}

export async function updateTypeCardsAuto(filter: FilterAuto, callback: Function){
    let favCards = await GetFavorites()
    favCards = favCards ? favCards : []
    let cards: Array<GoodsServiceClient> = []
    let flag_one_active = false
    for (let i = 0; i < filter.flagsFilter.length; i++){
        if (filter.flagsFilter[i].active){
            const nextCards: Array<GoodsServiceClient> = await Query(filter.flagsFilter[i].type, favCards, filter.biggerThan, 
                filter.lowerThan, filter.mark, filter.filterSearch)
            cards = [...cards, ...nextCards]
            flag_one_active = true
        }
    } 
    if (!flag_one_active){
        for (let i = 0; i < filter.flagsFilter.length; i++){
            const nextCards: Array<GoodsServiceClient> = await Query(filter.flagsFilter[i].type, favCards, filter.biggerThan, 
                filter.lowerThan, filter.mark, filter.filterSearch)
            cards = [...cards, ...nextCards]
        } 
    }
    callback(cards)
}