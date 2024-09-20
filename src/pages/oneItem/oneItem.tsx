import Header from "../components/header/header"
import { GoodsServiceDTO } from "../../sqhemas/base_data_dto"
import { useState, useEffect } from "react"
import axios from "axios"
import { NavigateFunction, useNavigate, useParams } from "react-router-dom"
import Loader from "../components/Loader/loader"
import "./oneItem.css"
import BasketChangeButton from "../components/ProcessSubmit/AddBasket/AddBasket"
import LoadingComponent from "../components/LoadingComponent"
import { pathPages, UserStatus } from "../../sqhemas/enums"
import ChangeItemButton, { DeleteItemButton } from "../components/change_item_button/change_item_button"
import MyModal from "../../modal_pages/modal/modal"
import ChangeItem from "../../modal_pages/change_item/change_item"
import { instance } from "../components/myAxios"
import GetFavorites from "../../utils/GetFavorites/GetFavorites"
import { AddFavorite, DeleteFavorite } from "../components/ButtonFavorite/ButtonFavorite"

function ProcessDeleteItem(id: number, setLoading: React.Dispatch<React.SetStateAction<boolean>>, navigate: NavigateFunction){
  setLoading(true)
  instance.delete(`http://127.0.0.1:8000/data/deleteData`, {params: {token: localStorage.getItem("token"), id_item: id}})
  .then(() => navigate(pathPages.Main))
  .finally(() => setLoading(false))
}

export default function OneItem(){
  const navigate = useNavigate()
  const pathId = useParams()

  const [status, setStatus] = useState(UserStatus.unLog.valueOf())
  useEffect(() => {
    instance.get<string>(`http://127.0.0.1:8000/accaunt/getStatus`, {params: {"token" : localStorage.getItem("token")}})
      .then(({data}) => setStatus(data))
  }, [])
  const [showModal, setShowModal] = useState(false)

  const [isFav, setIsFav] = useState(false)
  const [loading, setLoading] = useState(true)
  const [Card, setCard] = useState<GoodsServiceDTO | null>(null)
  const [selectedPicture, setSelectedPicture] = useState("")
  const [allPictures, setAllPictures] = useState<Array<string>>([])
  useEffect(() => {
  axios.get<GoodsServiceDTO>(`http://127.0.0.1:8000/data/getItemById`, {params : {id: pathId.id}})
  .then(({data}) => {
      setCard(data)
      setSelectedPicture(data.img)
      axios.get<Array<string>>("http://127.0.0.1:8000/data/getAllPictures", {params : {id: pathId.id}})
      .then(({data}) => {
        setAllPictures(data)
        setLoading(false)
      })
    })
  GetFavorites()
  .then((data) => {
    if (data?.find(fav => fav.id == Number(pathId.id)))
      setIsFav(true)
  })
  },[])

  function Picture(sourceImg: string){
      function clicked(){
          setSelectedPicture(sourceImg)
      }

      return (
          <div className="">
              <img onClick={clicked} src={sourceImg} alt=""/>
          </div>
      )
  }
  return(
      <>
      <Header id={-1}/>
      <LoadingComponent loading={loading}>
      <main>
    <div className="containMain">

      <div className="selectedPicture">
        <img src={selectedPicture} alt=""/>
      </div>

      <div className="allPictures">
        {allPictures.map(picture => Picture(picture))}
      </div>

      <div className="contain_discription">
        <div className="discription">

        {Card == null ? <div style={{alignContent: "center", display: "flex", justifyContent: "center"}}><Loader/></div> : <>
          <div className="">
            <h2 style={{textAlign:"center"}}>{Card.Name}</h2>
          </div>
          <div className="filter">
            <b>Категория</b> <br/>
            {Card.TypeGoods ? Card.TypeGoods : Card.Catalog}
          </div>
          <div className="filter">
            <b>Марка</b> <br/>
            {Card.Mark}
          </div>
          {Card.Article?.length > 0 && 
          <div className="filter">
            <b>Артикул</b> <br/>
            {Card.Article}
          </div>}
          <div className="item">
            <div className="">
              <b>Описание</b>
            </div>
            <div className="itemDiscr">
                {Card.Description}
            </div>
            <div className="">
              <h3>ЦЕНА : {Card.Price} Р</h3>
            </div>
          </div>
          </>
        }
          <div className="toBasket">
            <BasketChangeButton good_id={Number(pathId.id)}/>
            <div className="ContainWrapper">
              {isFav ? <DeleteFavorite Card_id={Number(pathId.id)} Changed={() => setIsFav(false)}/> : 
                <AddFavorite Card_id={Number(pathId.id)} Changed={() => setIsFav(true)}/>}
            </div>
          </div>
        </div>
        {status == UserStatus.admin.valueOf() ? 
          <div className="contain_tools">
            <ChangeItemButton clicked={() => loading ? null : setShowModal(true)} height={"40px"} width={"40px"}/> 
            <DeleteItemButton clicked={() => loading ? null : ProcessDeleteItem(Card.id, setLoading, navigate)} height={"40px"} width={"40px"}/>
          </div>
          : null 
        }
      </div>
    </div>
    <MyModal showModal={showModal} setShowModal={setShowModal}>
        <ChangeItem item={Card} setItem={setCard} setModal={setShowModal} images={allPictures} setImages={setAllPictures}/>
    </MyModal>
  </main>
  </LoadingComponent>
      </>
  )
}