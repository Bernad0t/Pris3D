import { AddAddressDTO, AddressDTO } from "../../../../sqhemas/base_data_dto";
import { instance } from "../../myAxios";

export async function AddAddressAPI(address: AddAddressDTO){
    return instance.post(`http://127.0.0.1:8000/accaunt/setAddress`, address, {params: {"token" : localStorage.getItem("token")},
     withCredentials: true})
    .then(() => {return})
}

export async function UpdateAddressAPI(address: AddressDTO) {
    return instance.post(`http://127.0.0.1:8000/accaunt/updateAddress`, address, {params: {"token" : localStorage.getItem("token")},
     withCredentials: true})
    .then(() => {return})
}