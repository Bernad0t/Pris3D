import { GoodsServiceDTO } from "../sqhemas/base_data_dto";
import { GoodsServiceClient } from "../sqhemas/frontend_dto";

export function convertGoodsService(from: Array<GoodsServiceDTO>, into: Array<GoodsServiceClient>, favoritesCards: Array<GoodsServiceDTO>){
    return [...into, ...from.map(card => {return {...card, addedFavorite: favoritesCards.find(favCard => card.id == favCard.id) ? true : false}})]
}