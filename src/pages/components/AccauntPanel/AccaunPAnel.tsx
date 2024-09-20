import { useNavigate } from "react-router-dom";
import { IdPages, pathPages } from "../../../sqhemas/enums";
import MyBlueButton from "../../../UI/MyBlueButton/MyBlueButton";
import useGetButtonsAccaunt from "../getButtonsAccaunt";
import { instance } from "../myAxios";
import NavigateButtons from "../navigate_button";

import "./AccauntPanel.css"

export default function AccauntPanel({id}: {id: number}){
    const navigate = useNavigate()

    const Buttons = useGetButtonsAccaunt(id)

    function ExitAcc(){
        instance.get(`http://127.0.0.1:8000/accaunt/exitAcc`, {params: {token: localStorage.getItem("token")}})
        .then(() => {
            localStorage.removeItem("token")
            navigate(pathPages.Main)
        })
    }

    return(
        <>
        <div className="navAcc">
            <NavigateButtons 
                activeClassName="selectedOneNavAcc"
                Buttons = {Buttons}
            />
            <div style={{position: "absolute", bottom: "25%"}}>
                <div style={{width: "80px", height: "30px", position: "relative"}}>
                    <MyBlueButton click={ExitAcc}>Выход</MyBlueButton>
                </div>
            </div>
        </div>
        </>
    )
}