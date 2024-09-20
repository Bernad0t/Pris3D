import { useState } from "react"
import { IdPages } from "../../../sqhemas/enums"
import Addresses from "../../components/addresses/addresses"
import useGetButtonsAccaunt from "../../components/getButtonsAccaunt"
import Header from "../../components/header/header"
import NavigateButtons from "../../components/navigate_button"
import { AddressDTO } from "../../../sqhemas/base_data_dto"
import AccauntPanel from "../../components/AccauntPanel/AccaunPAnel"

export default function AddressAcc(){
    const [addresses, setAddresses] = useState<AddressDTO[]>([])
    
    // const Buttons = useGetButtonsAccaunt(IdPages.adressAcc)

    return(
        <>
            <Header id={-1}/>
            <main className="mainAcc">
            {/* <div className="navAcc">
                <NavigateButtons 
                    activeClassName="selectedOneNavAcc"
                    Buttons = {Buttons}
                />
            </div> */}
            <AccauntPanel id={IdPages.adressAcc}/>
            <div className="containAccInfo">
                <div className="nameAccCategory">
                    адрес доставки
                </div>
                <Addresses addresses={addresses} setAddresses={setAddresses}/>
            </div>
        </main>
        </>
    )
}