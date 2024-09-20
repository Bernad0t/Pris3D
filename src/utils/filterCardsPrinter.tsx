//import { Props } from "../pages/auto_catology/components/card";
import { GoodsServiceDTO } from "../sqhemas/base_data_dto";
import { Catalog } from "../sqhemas/enums";
import axios from "axios"
import { FilterPrinter, GoodsServiceClient } from "../sqhemas/frontend_dto";
import { convertGoodsService } from "./convertIntoClientFromDto";
import GetFavorites from "./GetFavorites/GetFavorites";

export function updateTypeCardsPrinter(filter: FilterPrinter, callback: Function){

    GetFavorites()
    .then( (data) =>{
    const favCards = data ? data : []
        axios.get<Array<GoodsServiceDTO>>("http://127.0.0.1:8000/data/catology/filterByCategory", {params : {
            catalog: Catalog.Printer.valueOf(),
            type_good: null,
            biggerThan: filter.biggerThan, 
            lowerThan: filter.lowerThan,
            mark: filter.mark,
            FilterSearch: filter.filterSearch
        }})
        .then(({data}) => {
            let nextCards: Array<GoodsServiceClient> = []
            nextCards = convertGoodsService(data, nextCards, favCards)
            callback(nextCards)
      })
    })
}