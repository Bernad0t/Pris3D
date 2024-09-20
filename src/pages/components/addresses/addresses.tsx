import { useEffect, useRef, useState } from "react";
import { AddAddressDTO, AddressDTO } from "../../../sqhemas/base_data_dto";
import MyNaturaleButton from "../../../UI/MyNaturaleButton/MyNaturaleButton";

import style from "./addresses.module.css"
import MyBlueButton from "../../../UI/MyBlueButton/MyBlueButton";
import LoadingComponent from "../LoadingComponent";
import GetStrFromAddress from "../../../utils/getStrFromAddr";
import MyModal from "../../../modal_pages/modal/modal";
import ChangeAddress from "../../../modal_pages/ChangeAddress/ChangeAddress";
import { AddAddressAPI, UpdateAddressAPI } from "../ProcessSubmit/change_address/address_api";
import { instance } from "../myAxios";
import MyCircleButton from "../../../UI/MyCircleButton/MyCircleButton";

interface Props{
    addresses: AddressDTO[]
    setAddresses: React.Dispatch<React.SetStateAction<AddressDTO[]>>
}

function Address(address: AddressDTO, onDelete: Function, onUpdate: Function, onSelect: Function){
    return(
        <div className={style.one_addr}>
            <MyCircleButton selected={address.Selected} onClick={() => onSelect(address)}></MyCircleButton>
            <div className={style.info}>
                <div className={style.name_addr}>
                    {GetStrFromAddress(address)}
                </div>
                <div className={style.other_fields_info}>
                    {address.Mobile}
                </div>
                <div className={style.other_fields_info}>
                    {address.Mail}
                </div>
                <div className={style.contain_change_delete}>
                    <div className={style.contain_change}>
                        <MyNaturaleButton style={{backgroundColor: "#FFF", color: "#000"}} onClick={() => onUpdate(address)}>Редактировать</MyNaturaleButton>
                    </div>
                    <div className={style.contain_delete}>
                        <MyNaturaleButton style={{color: "red"}} onClick={() => onDelete(address)}>Удалить</MyNaturaleButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

function EmptyAddress(){
    return(
        {
            City: "",
            Street: "",
            Home: "",
            Mobile: "",
            Mail: "", 
            Selected: false
        }
    )
}

export default function Addresses({addresses, setAddresses}: Props){
    const [changeAddr, setChangeAddr] = useState<AddAddressDTO | AddressDTO>(EmptyAddress())
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const ChangeAdressSubmit = useRef(async () => {})

    useEffect(() => {
        instance.get<AddressDTO[]>("http://127.0.0.1:8000/accaunt/getAddress", {params: {token: localStorage.getItem("token")}})
        .then(({data}) => setAddresses(data))
        .finally(() => setLoading(false))
    }, [])

    function DeleteAddr(addr: AddressDTO){
        let new_addresses = addresses.filter(address => GetStrFromAddress(address) != GetStrFromAddress(addr))
        const flag_addr = new_addresses.find(address => address.Selected == true)
        if (!flag_addr && flag_addr != undefined)
            new_addresses[0].Selected = true
        setAddresses(new_addresses)
        instance.post("http://127.0.0.1:8000/accaunt/deleteAddress", addr, {params: {token: localStorage.getItem("token")}})
    }

    function AddAddress(){
        setShowModal(true)
        if (addresses.length == 0)
            setChangeAddr(EmptyAddress())
        else
            setChangeAddr({...EmptyAddress(), Mail: addresses[0].Mail, Mobile: addresses[0].Mobile})
        ChangeAdressSubmit.current = async (address: AddAddressDTO) => {return AddAddressAPI(address)}
    }

    function UpdateAddress(address: AddressDTO){
        setShowModal(true)
        setChangeAddr(address)
        ChangeAdressSubmit.current = async (address: AddressDTO) => {return UpdateAddressAPI(address)}
    }

    function onSelect(addr: AddressDTO){
        const old_selected = addresses.find(address => address.Selected)
        const new_addresses = addresses.map(address => GetStrFromAddress(address) != GetStrFromAddress(addr) ? 
        {...address, Selected: false} : {...addr, Selected: !addr.Selected})
        setAddresses(new_addresses)
        UpdateAddressAPI({...addr, Selected: !addr.Selected})
        if (old_selected)
            UpdateAddressAPI({...old_selected, Selected: !old_selected.Selected})
    }

    function AfterChange(){
        setShowModal(false)
        instance.get<AddressDTO[]>("http://127.0.0.1:8000/accaunt/getAddress", {params: {token: localStorage.getItem("token")}})
        .then(({data}) => setAddresses(data))
        .finally(() => setLoading(false))
    }

    return(
        <div className={style.all_addr}>
            <LoadingComponent loading={loading}>
                {addresses.map(addr => Address(addr, DeleteAddr, UpdateAddress, onSelect))}
            </LoadingComponent>
            <div style={{width:"230px", height:"30px", marginTop: "30px"}}>
                <MyBlueButton click={() => AddAddress()}>Добавить адрес</MyBlueButton>
            </div>
            <MyModal showModal={showModal} setShowModal={setShowModal}>
                <ChangeAddress address={changeAddr} setAddress={setChangeAddr} handleSubmit={ChangeAdressSubmit.current} 
                CallBack={AfterChange}/>
            </MyModal>
        </div>
    )
}