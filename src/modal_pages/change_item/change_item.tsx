import { GoodsServiceDTO } from "../../sqhemas/base_data_dto";

import style from "./change_item.module.css"
import { useState } from "react";
import LoadingComponent from "../../pages/components/LoadingComponent";
import MyNaturaleButton from "../../UI/MyNaturaleButton/MyNaturaleButton";
import MyModal from "../modal/modal";
import MyBlueButton from "../../UI/MyBlueButton/MyBlueButton";
import AddImages from "../UploadImages/UploadImages";
import { ProcessUpdateData } from "../../pages/components/ProcessSubmit/ProcessInsertData";
import { ErrorMassage } from "../../pages/accaunt/change_site/insert_good/insert_good";

interface Props{
    item: GoodsServiceDTO
    setItem: React.Dispatch<React.SetStateAction<GoodsServiceDTO | null>>
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    images: string[]
    setImages: React.Dispatch<React.SetStateAction<string[]>>
}

enum NameRows{
    "id"= "id",
    "Name" = "Название",
    "TypeService" = "Тип услуги",
    "TypeGoods" = "Тип товара",
    "Description" = "Описание",
    "Mark" = "Марка",
    "Price" = "Цена",
    "img" = "Превью",
    "Article" = "Артикуль"
}

function ChangePreview(item: GoodsServiceDTO, setItem: React.Dispatch<React.SetStateAction<GoodsServiceDTO | null>>, images: string[]){
    function OneImg(img: string){
        return(
            <div onClick={() => setItem({...item, img: img})} className={style.div_img_list}>
                <img src={img} alt="" />
            </div>
        )
    }

    return(
        <div className={style.change_preview}>
            <div className={style.div_img_preview}>
                <img src={item.img} alt="" />
            </div>
            <div className={style.div_images}>
                {images.map(img => OneImg(img))}
            </div>
        </div>
    )
}

function ChangeImages(images: string[], setImages: React.Dispatch<React.SetStateAction<string[]>>, files: File[] | null, setFiles: React.Dispatch<React.SetStateAction<File[] | null>>){
    const [showUploadImages, setShowUploadImages] = useState(false)

    function OneImage(img: string, images: string[], setImages: React.Dispatch<React.SetStateAction<string[]>>){
        return(
            <div className={style.contain_change_one_img}>
                <div className={style.change_one_img}>
                    <img src={img} alt="" />
                </div>
                <div className={style.remove_one_img}>
                    <MyNaturaleButton onClick={() => setImages(images.filter(image => image != img))}>Удалить</MyNaturaleButton>
                </div>
            </div>
        )
    }

    return(
        <div className={style.contain_change_images}>
            <div className={style.change_images}>
                    {images.map(img => OneImage(img, images, setImages))}
            </div>
            <div className={style.container_add}>
                <div className={style.contain_add}>
                    <MyBlueButton click={() => setShowUploadImages(!showUploadImages)}>Добавить</MyBlueButton>
                </div>
            </div>
            <MyModal showModal={showUploadImages} setShowModal={setShowUploadImages}>
                    <AddImages files={files} setFiles={setFiles}/>
            </MyModal>
        </div>
    )
}

function OneRow(name_row: string, value_row: string | undefined, item: GoodsServiceDTO, setItem: React.Dispatch<React.SetStateAction<GoodsServiceDTO | null>>){
    function Changed(name_row: string, new_value: string){
        let new_item: GoodsServiceDTO = {...item}
        new_item[name_row as keyof typeof new_item] = new_value
        setItem(new_item)
    }

    return(
        name_row != "img" && name_row != "TypeGoods" && name_row != "TypeService" && name_row != "id" && name_row != "Catalog" ?
            <div className={style.contain_row}>
                <div>
                    {NameRows[name_row as keyof typeof NameRows]}:
                </div>
                <div>
                    {name_row == "Description" ? <textarea value={value_row} onChange={(e) => Changed(name_row, e.target.value)}/>
                    : <input value={value_row} onChange={(e) => Changed(name_row, e.target.value)}/>}
                </div>
            </div> : null
    )

}

export default function ChangeItem({item, setItem, setModal, images, setImages}: Props){
    const [loading, setLoading] = useState(false)
    const [showPreviewModal, setShowPreviewModal] = useState(false)
    const [showImagesModal, setShowImagesModal] = useState(false)
    const [files, setFiles] = useState<File[] | null>(null);
    // const [showUploadImages, setShowUploadImages] = useState(false)

    const [afterSubmit, setAfterSubmit] = useState<JSX.Element>(<div></div>)

    const keys = Object.keys(item)

    function SubmitChange(){
       setLoading(true)
       ProcessUpdateData(item, files, images)
       .then((data) => {
           if (data.status == 200)
               setModal(false)
           else
               ErrorMassage("Что-то пошло не так", setAfterSubmit)
       })
       .finally(() => setLoading(false))
   }

    return(
        <>
        <MyModal showModal={showPreviewModal} setShowModal={setShowPreviewModal}>
            {ChangePreview(item, setItem, images)}
        </MyModal> 
        <MyModal showModal={showImagesModal} setShowModal={setShowImagesModal}>
            {ChangeImages(images, setImages, files, setFiles)}
        </MyModal>

        <div className={style.contain_change}>
            <LoadingComponent loading={loading}>
                {keys.map(key => OneRow(key, item[key as keyof typeof item]?.toString(), item, setItem))}
                <div className={style.contain_save}>
                    <MyNaturaleButton onClick={() => setShowPreviewModal(!showPreviewModal)}>Изменить превью</MyNaturaleButton>
                </div>
                <div className={style.contain_save}>
                    <MyNaturaleButton onClick={() => setShowImagesModal(!showImagesModal)}>Изменить фотографии</MyNaturaleButton>
                </div>
                <div className={style.contain_save}>
                    <MyBlueButton click={() => SubmitChange()}>Сохранить</MyBlueButton>
                </div>
                {afterSubmit}
            </LoadingComponent>
        </div>
        </>
    )
}