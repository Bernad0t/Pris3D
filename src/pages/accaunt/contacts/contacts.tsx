import { IdPages, pathPages, Sex } from "../../../sqhemas/enums";
import Header from "../../components/header/header";
import NavigateButtons from "../../components/navigate_button";
import { GetUserContactsDTO } from "../../../sqhemas/base_data_dto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../accaunt.css"
import "../buttons.css"
import "./contacts.css"
import SendContacts from "../../components/ProcessSubmit/SendContacts/SendContacts";
import useGetButtonsAccaunt from "../../components/getButtonsAccaunt";
import MySelect from "../../../UI/MySelect/MySelect";
import { GetUserContactsEnum } from "../../../sqhemas/enums_models_field";
import InputDate from "../../../UI/InputDate/InputDate";
import { instance } from "../../components/myAxios";
import AccauntPanel from "../../components/AccauntPanel/AccaunPAnel";

function OneDescriptionField(key: string, data: GetUserContactsDTO, ableChange: boolean, callBack: Function){
    return (
        <div className="descr">
          <div className="nameDescr">
            {GetUserContactsEnum[key as keyof typeof GetUserContactsEnum]}
          </div>
          <div className="itemDescr">
            {
                key == "Sex" && ableChange ? 
                <MySelect style={{width: "30%"}} onChange={(e) => callBack(key, e.target.value)}>
                    <option disabled selected>...</option>
                    <option value={Sex.Female}>{Sex.Female}</option>
                    <option value={Sex.Male}>{Sex.Male}</option>
                </MySelect> : key == "DateBirthday" && ableChange ? <InputDate onChange={(e) => callBack(key, e.target.value)} date={data["DateBirthday"]}/>
                : <input style={ableChange ? {borderBottom: "1px solid #FFF"} : {border: "None"}} className="inputContact" type="text" 
                value={data[key as keyof typeof data]?.toString()} disabled={!ableChange} onChange={e => {callBack(key, e.target.value)}}/>
            }
          </div>
        </div>
    )
}

export default function Contacts(){
    const [ableChange, setAbleChange] = useState(false)
    const [data, setData] = useState<GetUserContactsDTO | null>(null)
    const navigate = useNavigate()
    
    useEffect( () => {
    instance.get<GetUserContactsDTO>(`http://127.0.0.1:8000/accaunt/getContacts`, {params: {"token" : localStorage.getItem("token")}} )
      .then(({data}) => {
        setData(data)
    })
      .catch((error=>{ console.log(error.response, 'error')
        if (error.response.status != 410)
            navigate(pathPages.authorization)
    }))}, [])

    function SetNewData(key: string, new_data: string | Date){
        let NewArrInputData = {...data}
        NewArrInputData[key] = new_data
        setData(NewArrInputData)
    }

    // const Buttons = useGetButtonsAccaunt(IdPages.contactsAcc)
    console.log(data, "data")
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
            <AccauntPanel id={IdPages.contactsAcc}/>
            <div className="containAccInfo">
                <div className="nameAccCategory">
                контактные данные
                </div>
                {
                    data ? Object.keys(data).map(key => OneDescriptionField(key, data, ableChange, SetNewData)) : null
                }

                <div className="containChangeButAcc">
                    {
                        ableChange ?
                        <button style={{color: "rgba(52, 75, 245, 1)"}} type="button" name="button" className="ChangeButAcc" 
                        onClick={() => {setAbleChange(!ableChange); SendContacts(data)}}>Сохранить</button> :
                        <button type="button" name="button" className="ChangeButAcc" onClick={() => setAbleChange(!ableChange)}>
                            Изменить</button>
                    }
                </div>
            </div>
        </main>
        </>
    )
}