import { OneTypeProps } from "../pages/auto_catology/catology";
import { GoodsServiceDTO } from "./base_data_dto";

export interface GoodsServiceClient extends GoodsServiceDTO{
    addedFavorite: boolean
}

export interface FilterAuto{
    filterSearch: string
    flagsFilter: OneTypeProps[]
    biggerThan: number | undefined
    lowerThan: number | undefined
    mark: string
}

export interface FilterPrinter{
    filterSearch: string
    biggerThan: number | undefined
    lowerThan: number | undefined
    mark: string
}

export interface QueryService{
    description: string | undefined
    name: string | undefined
    mobile: string | undefined
    mail: string | undefined
}