// import { useState } from "react"
import "./card.css"
import { useNavigate } from "react-router-dom"
import { pathPages } from "../../sqhemas/enums"
import { AddFavorite, DeleteFavorite } from "./ButtonFavorite/ButtonFavorite"
import { GoodsServiceClient } from "../../sqhemas/frontend_dto"

function Card(props: GoodsServiceClient, CallBackCards: Function, Click: Function){
  function clicked(){
    Click(props.id)
  }
  return(
      <div key={props.id} className="one_card_contain">
          <div className="one_card">
            {props.addedFavorite ? <DeleteFavorite Card_id={props.id} Changed={CallBackCards}/> : <AddFavorite Card_id={props.id} Changed={CallBackCards}/>}
            <img src={props.img} alt="" onClick={clicked}/>
            <div style={{textAlign:"center"}} className="name_card" onClick={clicked}>
              {props.Name}
            </div>
            <div style={{textAlign:"center"}} className="price_card" onClick={clicked}>
              {props.Price} Р
            </div>
          </div>
        </div>
  )
}


export default function GetCards(arrCards: Array<GoodsServiceClient>, setArrCards: React.Dispatch<React.SetStateAction<GoodsServiceClient[]>>, loading: boolean){
  const navigate = useNavigate()

  function Click(id: number){
    navigate(pathPages.Item + `/${id}`)
  }

  function CallBackCards(id: number){
    const newCards = arrCards.map(card => card.id == id ? {...card, addedFavorite: !card.addedFavorite} : {...card})
    setArrCards(newCards)
  }

  if (!arrCards.length && !loading){
    return (
    <>
      <div className="notFound">
      <div>
        Товары не найдены
      </div>
      <div>
      <img src="https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/notFoundSmile.png" alt="" />
      </div>
      </div>
    </>
    )
  }
  else{
    return arrCards.map(card => Card(card, CallBackCards, Click))
  }
}