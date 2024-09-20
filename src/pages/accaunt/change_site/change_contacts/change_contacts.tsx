
import Header from "../../../components/header/header";
import LoadingComponent from "../../../components/LoadingComponent";
import style from "../change_components.module.css"
import { useEffect, useState } from "react";
import { ErrorMassage } from "../insert_good/insert_good";
import Schedule from "../../../../modal_pages/change_schedule/schedule";
import { DataDTO } from "../../../../sqhemas/base_data_dto";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { pathPages } from "../../../../sqhemas/enums";
import MyModal from "../../../../modal_pages/modal/modal";
import { instance } from "../../../components/myAxios";

export default function ChangeSiteContacts(){
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [afterSubmit, setAfterSubmit] = useState<JSX.Element>(<div></div>)

    const [data, setData] = useState<DataDTO | null>(null)

    useEffect(() => {
        axios.get<DataDTO>(`http://127.0.0.1:8000/data/GetDataContacts`)
        .then(({data}) => setData(data))
    }, [])

    const handleSubmit = () => {
        if (data?.data_site.Mobile.length != 0 && data?.data_site.Address.length != 0){
            setLoading(true)
            instance.post(`http://127.0.0.1:8000/data/SetDataContacts`, data, {withCredentials: true, params: {token: localStorage.getItem("token")}})
            .then(() => navigate("/accaunt" + pathPages.changeSite))
            .finally(() => setLoading(false))
        }
        else
            ErrorMassage("Не все поля заполнены", setAfterSubmit)
    };
    return(
        <>
        <Header id={-1}/>
        <main className={style.containMain}>
            <div className={style.containForm}>
                <LoadingComponent loading={loading}>
                    <div className={style.insert_div}>
                        <input type="text" value={data?.data_site.Mobile} className={style.inputField} placeholder="Введите телефон" 
                        onChange={(e) => setData(data ? {...data, data_site: {...data.data_site, Mobile: e.target.value}} : null)}/>
                    </div>
                    <div className={style.insert_div}>
                        <input value={data?.data_site.Address} type="text" className={style.inputField} placeholder="Введите адрес магазина" 
                        onChange={(e) => setData(data ? {...data, data_site: {...data.data_site, Address: e.target.value}} : null)}/>
                    </div>
                    <div className={style.insert_div}>
                        <input value={data?.data_site.Mail} type="text" className={style.inputField} placeholder="Введите почту" 
                        onChange={(e) => setData(data ? {...data, data_site: {...data.data_site, Mail: e.target.value}} : null)}/>
                    </div>
                    <div className={style.insert_div}>
                        <button className={style.uploadImages} onClick={() => data == null ? null : setShowModal(true)}>Расписание</button>
                    </div>
                    <div id={style.contain_submit_insert} className={style.insert_div}>
                        <button className={style.submit_insert} type="submit" onClick={handleSubmit}>Сохранить</button>
                    </div>
                </LoadingComponent>
                {afterSubmit}
            </div>
            <MyModal showModal={showModal} setShowModal={setShowModal}>
                <Schedule data={data} setData={setData}/>
            </MyModal>
        </main>
        </>
    )
}