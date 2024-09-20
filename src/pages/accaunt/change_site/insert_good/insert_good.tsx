import { useState } from "react";
import { Catalog, TypeAutoParts } from "../../../../sqhemas/enums";
import Header from "../../../components/header/header";

import style from "../change_components.module.css"
import "./insert_good.css"

import AddImages from "../../../../modal_pages/UploadImages/UploadImages";
import ProcessInsertData from "../../../components/ProcessSubmit/ProcessInsertData";
import LoadingComponent from "../../../components/LoadingComponent";
import convert_str_to_enum_AutoParts, { convert_str_to_enum_Catalog } from "../../../../utils/convert_str_to_enum_type";
import MyModal from "../../../../modal_pages/modal/modal";
import MySelect from "../../../../UI/MySelect/MySelect";
import MarksFilter from "../../../components/marks_filter/marks_filter";
import MyInsertDetails from "../../../../UI/MyDetails/MyDetails";

export function ErrorMassage(description: string, setAfterSubmit: React.Dispatch<React.SetStateAction<JSX.Element>>){
    setAfterSubmit(
        <>
            <div id="ErrorAuth">{description}</div>
        </>
    )
}

export default function InsertGood(){
    // React state to control Modal visibility
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [afterSubmit, setAfterSubmit] = useState<JSX.Element>(<div></div>)

    const [name, setName] = useState("")
    const [type, setType] = useState<TypeAutoParts | null>(null)
    const [description, setDescription] = useState("")
    const [mark, setMark] = useState("")
    const [catalog, setCatalog] = useState<Catalog | null>(null)
    const [price, setPrice] = useState<string | null | number>(null)
    const [files, setFiles] = useState<File[] | null>(null);
    const [article, setArticle] = useState("")

    const handleSubmit = () => {
        if ((catalog == Catalog.AutoParts && type || catalog == Catalog.Printer) && name.length != 0
         && description.length != 0 && Number(price) && files){
            setLoading(true)
            ProcessInsertData(name, catalog, type, article,  description, mark, Number(price), files)
            .then((data) => {
                console.log(data, "err")
                if (data.status == 200){
                    setAfterSubmit(<div></div>)
                    setName("")
                    setType(null)
                    setDescription("")
                    setMark("")
                    setPrice(null)
                    setFiles(null)
                    setArticle("")
                    ErrorMassage("", setAfterSubmit)
                }
                else{
                    if (data.status == 400)
                        ErrorMassage("Такой товар уже существует", setAfterSubmit)
                    else
                        ErrorMassage("Что-то пошло не так", setAfterSubmit)
                }
            })
            .finally(() => setLoading(false))
        }
        else
            ErrorMassage("Не все поля заполнены", setAfterSubmit)
    };
    return(
        <>
        <Header id={-1}/>
        <main className={style.containMain}>
            <LoadingComponent loading={loading}>
            <div className={style.containForm}>
                    <div className={style.insert_div}>
                        <input type="text" value={name} className={style.inputField} placeholder="Введите название" 
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className={style.insert_div}>
                        <MySelect style={{width: "80%", paddingLeft: "5%"}} onChange={(e) => setCatalog(convert_str_to_enum_Catalog(e.target.value))}>
                            <option disabled selected>Каталог</option>
                            <option value={Catalog.AutoParts}>{Catalog.AutoParts}</option>
                            <option value={Catalog.Printer}>{Catalog.Printer}</option>
                        </MySelect> 
                    </div>
                    {catalog == Catalog.AutoParts && <div className={style.insert_div}>
                        <MySelect style={{width: "80%", paddingLeft: "5%"}} onChange={(e) => setType(convert_str_to_enum_AutoParts(e.target.value))}>
                            <option disabled selected>Тип товара</option>
                            <option value={TypeAutoParts.Auto}>{TypeAutoParts.Auto}</option>
                            <option value={TypeAutoParts.Moto}>{TypeAutoParts.Moto}</option>
                            <option value={TypeAutoParts.Other}>{TypeAutoParts.Other}</option>
                        </MySelect> 
                    </div>}
                    <div className={style.insert_div}>
                        <input type="text" value={article} className={style.inputField} placeholder="Введите артикул" 
                        onChange={(e) => setArticle(e.target.value)}/>
                    </div>
                    <div id={style.contain_textarea} className={style.insert_div}>
                        <textarea name="" id="" value={description} placeholder="Введите описание товара" 
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <MyInsertDetails setMark={setMark} name={mark ? mark : "Марка"} className={style.contain_details} style={{width: "80%"}}>
                        <MarksFilter catalog={catalog} filter={null} setFilter={setMark} defaultMark="Другое"/>
                    </MyInsertDetails>
                    <div className={style.insert_div}>
                        <input value={price ? price : ""} type="text" step="0.01" className={style.inputField} 
                        placeholder="Введите цену" onChange={(e) => setPrice(Number(e.target.value) ? e.target.value : null)}/>
                    </div>
                    <div className={style.insert_div}>
                        <button className={style.uploadImages} onClick={() => setShowModal(true)}>Загрузить картинки</button>
                    </div>

                    <div id={style.contain_submit_insert} className={style.insert_div}>
                        <button className={style.submit_insert} type="submit" onClick={handleSubmit}>Сохранить</button>
                    </div>
                    {afterSubmit}
            </div>
            </LoadingComponent>
            <MyModal showModal={showModal} setShowModal={setShowModal}>
                <AddImages files={files} setFiles={setFiles}/>
            </MyModal>
        </main>
        </>
    )
}