
import { pathPages } from "../../../sqhemas/enums";
import { TokensDTO } from "../../../sqhemas/base_data_dto";
import axios from "axios"
import "./ProcessSubmitAuth.css"

export default function ProcessSubmit(login: string, password: string, SetToken: React.Dispatch<React.SetStateAction<TokensDTO>>,
    setAfterSubmit:  React.Dispatch<React.SetStateAction<JSX.Element>>,PathServer: pathPages, AlertError: string, navigate: Function){
        if (login == "" || password == ""){
            setAfterSubmit(
                <>
                <div id="ErrorAuth">Вы не заполнили все поля</div>
                </>
            )
        }
        else{
            axios.post<TokensDTO>("http://127.0.0.1:8000/auth" + PathServer, {login: login, password: password}, {withCredentials: true})
            .then(({data}) => {
                SetToken(data)
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('login', data.login)
                localStorage.setItem("refresh_token", data.refresh_token)
                // const date = new Date()
                // date.setMinutes(2 + date.getMinutes())
                // localStorage.setItem('timeout', date.toString())
                navigate(pathPages.Main)
            })
            .catch((error=>{ 
                if(error.response){
                    setAfterSubmit(
                        <>
                        <div id="ErrorAuth">{AlertError}</div>
                        </>
                    ) 
                }
             }))
            // TODO сделай загрузку, передавая serLoading и перенаправь куданит
    }
}