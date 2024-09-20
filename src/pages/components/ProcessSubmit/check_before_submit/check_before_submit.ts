import { ErrorMassage } from "../../../accaunt/change_site/insert_good/insert_good"

export default function CheckAndSubmit(query: NonNullable<unknown> | null, setAfterSubmit: React.Dispatch<React.SetStateAction<JSX.Element>>){
    let flag = true
    try{
        const keys = Object.keys(query)
        for (let i = 0; i < keys.length; i++){
            if (query && !query[keys[i] as keyof typeof query] && query[keys[i] as keyof typeof query] != false){
                flag = false
                console.log(query[keys[i] as keyof typeof query], "query[keys[i] as keyof typeof query]")
                ErrorMassage("Заполните все поля", setAfterSubmit)
                break
            }
        }}
    catch{
        flag = false
        ErrorMassage("Заполните все поля", setAfterSubmit)
    }
    return flag
}