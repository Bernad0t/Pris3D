import { FormAuthorization } from "../components/navigate_button"
import Header from "../components/header/header"
import "./authorization.css"
import { TokensDTO } from "../../sqhemas/base_data_dto"

import { useState } from "react"

export default function Authorization(){
    const [tokens, setTokens] = useState<TokensDTO>({access_token: "", refresh_token: ""} )
    return (
        <>
        <Header id={-1}/>
        <main className="registr">
        <div className="containRegistr">
        <FormAuthorization SetTokens={setTokens}/>
        </div>
        </main>
        </>
    )
}