export enum ResultPurchase {
    delivering = "доставляется",
    delivered = "доставлено",
    taken = "забрано",
    returned = "возвращено"
}

export enum TypeService {
    Goods = "Товар",
    Scanning = "Сканирование",
    Print3D = "3Д печать"
}

export enum UserStatus {
    admin = "Admin",
    user = "User",
    unLog = "unLog"
}

export enum Catalog {
    AutoParts = "Автозапчасти",
    Printer = "Принтеры"
}

export enum TypeAutoParts {
    Auto = "Автомобиль",
    Moto = "Мотоцикл",
    Other = "Другое"
}

export enum IdPages{
    "Main" = 1,
    "scan3d" = 2,
    "autoParts" = 3,
    "print3d" = 4,
    "printer3d" = 5,

    "contactsAcc" = 6,
    "favoriteAcc" = 7,
    "historyAcc" = 8,
    "purchaseAcc" = 9,
    "adressAcc" = 10,
    "basketAcc" = 11,
    "chooseAddressPurchase" = 16,

    "changeSite" = 12,
    "contactsData" = 13,
    "insertData" = 14,
    "changeData" = 15
}

export enum pathPages{
    "Main" = "/",
    "scan3d" = "/scan3d",
    "autoParts" = "/autoParts",
    "print3d" = "/print3d",
    "printer3d" = "/printer3d",
    "toAvito" = "https://www.avito.ru/brands/i190220277/all?sellerId=350fc163320d63c49cf4f846957154ab",
    "authorization" = "/authorization",
    "Register" = "/sign-up",
    "Enter" = "/sign-in",
    "Item" = "/main/items",
    "contactsAcc" = "/contactsAcc",
    "favoriteAcc" = "/favoriteAcc",
    "historyAcc" = "/accaunt/historyAcc",
    "purchaseAcc" = "/purchaseAcc",
    "adressAcc" = "/adressAcc",
    "basketAcc" = "/accaunt/basketAcc",
    "changeSite" = "/changeSite",
    "contactsData" = "/changeSite/contactsData",
    "insertData" = "/changeSite/insert",
    "addressPurchase" = "/basket/address"
}

export enum Sex{
    "Male" = "Мужской",
    "Female" = "Женский"
}

export enum WayDeliveryEnum{
    "delivery" = "доставка",
    "take" = "самовывоз"
}