import { AddressDTO } from "../sqhemas/base_data_dto";

export default function GetStrFromAddress(address: AddressDTO){
    return "улица " + address.Street + ", " + address.Home + ", " + address.City
}