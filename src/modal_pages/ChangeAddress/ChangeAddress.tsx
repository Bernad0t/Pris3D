import { InputHTMLAttributes, useState } from "react";
import { AddAddressDTO, AddressDTO } from "../../sqhemas/base_data_dto";
import MyNaturaleInput from "../../UI/MyNaturaleInput/MyNaturaleInput";
import MyNaturaleButton from "../../UI/MyNaturaleButton/MyNaturaleButton";
import CheckAndSubmit from "../../pages/components/ProcessSubmit/check_before_submit/check_before_submit";
import LoadingComponent from "../../pages/components/LoadingComponent";

import styles from "./ChangeAddress.module.css"

interface Props{
    address: AddressDTO | AddAddressDTO
    setAddress: React.Dispatch<React.SetStateAction<AddressDTO | AddAddressDTO>>
    handleSubmit: Function
    CallBack: Function
}

interface CategoryProps extends InputHTMLAttributes<HTMLDivElement>{
    nameField: string
}

enum ToRussianField{
    "City" = "Город",
    "Mobile" = "Телефон",
    "Street" = "Улица",
    "Home" = "Дом",
    "Mail" = "Почта",
}

function OneCategory({nameField, children, style}:  CategoryProps){
    return(
        <div style={style} className={styles.one_cat}>
            <div className={styles.name_cat}>
                {nameField}
            </div>
            <div className={styles.body_cat}>
                {children}
            </div>
        </div>
    )
}

function OneField(name: string, address: AddressDTO | AddAddressDTO, setAddress: React.Dispatch<React.SetStateAction<AddressDTO | AddAddressDTO>>){
    
    return(
        <div className={styles.contain_input}>
            {name != "Selected" && <MyNaturaleInput placeholder={ToRussianField[name as keyof typeof ToRussianField]} 
            value={address[name as keyof typeof address].toString()} onChange={(e) => setAddress({...address, [name]: e.target.value})}/>}
        </div>
    )
}

export default function ChangeAddress({address, setAddress,  handleSubmit, CallBack}: Props){
    const [afterSubmit, setAfterSubmit] = useState<JSX.Element>(<div></div>)
    const [loading, setLoading] = useState(false)

    const keys = Object.keys(address)

    function Submit(){
        if (CheckAndSubmit(address, setAfterSubmit)){
            setLoading(true)
            handleSubmit(address)
            .finally(() => {setLoading(false); CallBack()})
        }
    }

    return(
        <div className={styles.contain_all}>
            <OneCategory nameField="Добавить новый адрес" style={{borderBottom: "1px solid #AFAFAF"}}>
                {keys.map(key => key != "Selected" &&  key != "Mobile" && key != "Mail"? OneField(key, address, setAddress) : null)}
            </OneCategory>

            <OneCategory nameField="Контактные данные">
                {keys.map(key => key != "Selected" &&  (key == "Mobile" || key == "Mail")? OneField(key, address, setAddress) : null)}
            </OneCategory>

            <LoadingComponent loading={loading}>
                <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
                    <div style={{width: "30%", height: "30px"}}>
                        <MyNaturaleButton style={{backgroundColor: "#AFAFAF", color: "#000"}} onClick={() => Submit()}>Сохранить</MyNaturaleButton>
                    </div>
                </div>
            </LoadingComponent>
            {afterSubmit}
        </div>
    )

}