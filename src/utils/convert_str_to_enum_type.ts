import { Catalog, Sex, TypeAutoParts } from "../sqhemas/enums";

export function convert_str_to_enum_Sex(str: string | undefined){
    switch (str){
        case Sex.Female.valueOf():
            return Sex.Female
        case Sex.Male.valueOf():
            return Sex.Male
        default:
            return null
    }
}

export function convert_str_to_enum_Catalog(str: string | undefined){
    switch (str){
        case Catalog.Printer.valueOf():
            return Catalog.Printer
        case Catalog.AutoParts.valueOf():
            return Catalog.AutoParts
        default:
            return null
    }
}

export default function convert_str_to_enum_AutoParts(str: string | undefined){
    switch (str){
        case TypeAutoParts.Auto.valueOf():
            return TypeAutoParts.Auto
        case TypeAutoParts.Moto.valueOf():
            return TypeAutoParts.Moto
        case TypeAutoParts.Other.valueOf():
            return TypeAutoParts.Other
        default:
            return null
    }
}