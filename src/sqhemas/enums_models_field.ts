import { TypeAutoParts } from "./enums"

export enum GetUserContactsEnum{
    "Gmail" = "Е-мейл",
    "Mobile" =  "Телефон",
    "FullName" = "ФИО",
    "DateBirthday" = "Дата рождения",
    "Sex" = "Пол"
}

export const WeekNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

export const AutoPartsTypeNames = [TypeAutoParts.Auto.valueOf(), TypeAutoParts.Moto.valueOf(), TypeAutoParts.Other.valueOf()]