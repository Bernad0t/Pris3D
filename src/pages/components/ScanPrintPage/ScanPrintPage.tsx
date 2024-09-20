import { useEffect, useRef, useState } from "react"
import { IdPages } from "../../../sqhemas/enums"
import MyNaturaleButton from "../../../UI/MyNaturaleButton/MyNaturaleButton"
import Header from "../header/header"
import { QueryService } from "../../../sqhemas/frontend_dto"

import style from "./ScanPrintPage.module.css"
import MyBlueButton from "../../../UI/MyBlueButton/MyBlueButton"
import { instance } from "../myAxios"
import { GetUserContactsDTO } from "../../../sqhemas/base_data_dto"
import CheckAndSubmit from "../ProcessSubmit/check_before_submit/check_before_submit"
import LoadingComponent from "../LoadingComponent"
import { ErrorMassage } from "../../accaunt/change_site/insert_good/insert_good"

interface Props{
    id_page: IdPages
    images: string[]
    handleSubmit: Function
    description: string
}

function OneCase(img: string){
    return(
        <div>
            <img src={img} alt=""/>
        </div>
    )
}

export default function ScanPrintPage({id_page, images, handleSubmit, description}: Props){
    const [query, setQuery] = useState<QueryService | null>(null)
    const [afterSubmit, setAfterSubmit] = useState<JSX.Element>(<div></div>)

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const scrolling = useRef(null);
    
    useEffect( () => {
    instance.get<GetUserContactsDTO>(`http://127.0.0.1:8000/accaunt/getContacts`, {params: {"token" : localStorage.getItem("token")}} )
      .then(({data}) => {
        setQuery({mail: data.Gmail, mobile: data.Mobile, name: data.FullName, description: ""})
    })}, [])


    function Submit(){
        if (CheckAndSubmit(query, setAfterSubmit)){
            setLoading(true)
            handleSubmit(query)
            .then(() => {
                setSuccess(true)
            })
            .catch(() => {
                ErrorMassage("Что-то пошло не так", setAfterSubmit)
            })
            .finally(() => setLoading(false))
        }
    }

    return(
        <>
            <Header id={id_page}/>
            <main className={style.contain_main}>
                <div className={`${style.name_field} ${style.get_application}`}>
                    <div id={style.scroll_but}>
                        <MyNaturaleButton onClick={() => {scrolling.current.scrollIntoView()}}>Оставьте заявку!</MyNaturaleButton>
                    </div>
                </div>

                <div className={style.description_page} style={{textAlign: "center"}}>
                    {description}
                </div>

                <div className={style.our_cases}>
                <div className={style.name_field}>
                    <h2>Наши кейсы</h2>
                </div>
                <div className={style.cases}>
                    {images.map(img => OneCase(img))}
                </div>
                </div>

                <div className={style.contain_application}>
                <div className={`${style.name_field} ${style.get_application}`} ref={scrolling}>
                    <h2>Форма для заявки. Мы свяжемся с вами!</h2>
                </div>

                <LoadingComponent loading={loading}>
                    {success ? 
                        <div style={{display: "flex", justifyContent: "center", color: "blue", fontSize: "1.4em"}}>
                            Заявка отправлена!
                        </div> :
                        <div className={style.application}>
                            <div className={style.contain_description}>
                            <div className={style.name_description}>
                                <h3>Тема обращения</h3>
                            </div>
                            <div className={style.contain_textarea}>
                                <textarea name="name" value={query?.description} onChange={(e) => setQuery({...query, description: e.target.value})}></textarea>
                            </div>
                            </div>

                            <div className={style.input_fields}>
                            <div className={style.other_application_field}>
                                <div className="">
                                <h3>Ваше имя</h3>
                                </div>
                                <div className="">
                                <input type="text" name="" value={query?.name} placeholder="Введите имя" onChange={(e) => setQuery({...query, name: e.target.value})}/>
                                </div>
                            </div>

                            <div className={style.other_application_field}>
                                <div className="">
                                <h3>Номер телефона</h3>
                                </div>
                                <div className="">
                                <input type="text" name="" value={query?.mobile} placeholder="Введите номер телефона" onChange={(e) => setQuery({...query, mobile: e.target.value})}/>
                                </div>
                            </div>

                            <div className={style.other_application_field}>
                                <div className="">
                                <h3>Ваш e-mail</h3>
                                </div>
                                <div className="">
                                <input type="text" name="" value={query?.mail} placeholder="Введите почту" onChange={(e) => setQuery({...query, mail: e.target.value})}/>
                                </div>
                            </div>

                            <div id={style.contain_send}>
                                <MyBlueButton click={() => Submit()}>Отправить заявку</MyBlueButton>
                            </div>
                            <div>
                                {afterSubmit}
                            </div>
                            </div>

                        </div>}
                </LoadingComponent>
                </div>
            </main>
        </>
    )
}