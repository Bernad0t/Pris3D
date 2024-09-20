import { TypeService, TypeAutoParts, ResultPurchase, Sex, Catalog, WayDeliveryEnum } from "./enums"

export interface GoodsServiceDTO {
    id: number
    Name: string | null
    TypeService: TypeService | null
    Catalog: Catalog
    TypeGoods : TypeAutoParts | null
    Article: string | null
    Description: string | null
    Mark: string | null
    Price: number | null
    img: string
}

export interface GoodsServiceRelDTO extends GoodsServiceDTO {
    order_user: Array<OrderAddDTO>
}

export interface GoodsServiceAddDTO {
    Name: string
    TypeGoods: TypeAutoParts | null
    Article: string | null
    Catalog: Catalog
    Description: string
    Mark: string
    Price: number
}

export interface OrderAddDTO {
    Users_id: number
    DatePayment: Date | null
    DateReciept: Date | null
    ResultPurchase: ResultPurchase | null
    TotalPrice: number | null
}

export interface TokensDTO{
    access_token: string
    refresh_token: string
    login: string
}

export interface GetUserContactsDTO{
    Gmail: string | undefined
    Mobile: string | undefined
    FullName: string | undefined
    DateBirthday: Date | undefined
    Sex: Sex | undefined
}

export interface BasketsDTO{
    id: number
    GoodsService_id: number
    Number: number | null
}

export interface OrderDTO{
    id: number
    Users_id: number
    ResultPurchase: ResultPurchase
    DatePayment: Date | null
    DateReciept: Date | null
    PriceDelivery: number
    TotalPrice: number
    Discount: number
    WayDelivery: WayDeliveryEnum
}
export interface OrderDTORel extends OrderDTO{
    goods_in_basket: Array<GoodsServiceDTO>
    baskets: Array<BasketsDTO>
}

export interface DataSiteDTO{
    Mobile: string
    Address: string
    Mail: string
}

export interface DayScheduleDTO{
    day_id: number
    From: string
    To: string
}

export interface DataDTO{
    data_site: DataSiteDTO
    schedule: DayScheduleDTO[]
}

export interface AddAddressDTO{
    City: string
    Street: string
    Home: string
    Mobile: string
    Mail: string 
    Selected: boolean
}

export interface AddressDTO extends AddAddressDTO{
    id: number
}