//styles
import "./assets/buttons.css"
import "./assets/main.css"
import "./assets/aside.css"

//modules
import GetCards from "../components/card"
//import { TransitionGroup } from "react-transition-group"
import { updateTypeCardsAuto } from "../../utils/filterCardsAuto"
import React, {useState, useEffect} from "react"
import Header from "../components/header/header"
import { FilterAuto, GoodsServiceClient } from "../../sqhemas/frontend_dto"
import axios from "axios"
import LoadingComponent from "../components/LoadingComponent"
import ButtonFilter from "../../UI/button_filter/button_filter"
import MarksFilter from "../components/marks_filter/marks_filter"
import FilterPanel from "../components/FilterPanel/FilterPanel"
import { Catalog } from "../../sqhemas/enums"
import { MyFilterDetails } from "../../UI/MyDetails/MyDetails"
import PagginationMenu from "../../UI/paggination_buttons/paggination_menu"

export interface OneTypeProps{type : string, active : boolean}

const limitCards = 4

function OneCategory(type: OneTypeProps, filter: FilterAuto, setFilter: React.Dispatch<React.SetStateAction<FilterAuto>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>){
  return(
    <div className="one_category">
      <ButtonFilter active={type.active} onClick={()=>{setFilter({...filter, flagsFilter: filter.flagsFilter.map(flag => flag.type == type.type ?
       {...flag, active: !flag.active} : flag)}); setLoading(true)}} />
      {type.type}
    </div>
  )
}

export default function Catology(){
  const id: number = 3
  const [cards, setCards] = useState<Array<GoodsServiceClient>>([])
  const [filter, setFilter] = useState<FilterAuto>({
    flagsFilter: [  // type должен совпадать с TrpeAutoParts enum
      {type: "Автомобиль", active: false}, {type: "Мотоцикл", active: false}, {type: "Другое", active: false}],
    biggerThan: 0, lowerThan: undefined, mark: "", filterSearch: ""
  })
  const [MaxPriceData, setMaxPriceData] = useState<number>()
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1) //  pagination

  useEffect(() => {
    MaxPriceData ? 
    updateTypeCardsAuto(filter, (data: Array<GoodsServiceClient>) => {setCards(data)}) :
      axios.get<number>("http://127.0.0.1:8000/data/catology/getMaxPrice")
      .then(({data}) => {
        setMaxPriceData(data)
        setFilter({...filter, lowerThan: data})
        updateTypeCardsAuto({...filter, lowerThan: data}, (data: Array<GoodsServiceClient>) => {setCards(data)})
      })
    setLoading(false)
  },[filter])
  
  return(
      <>
      <Header id={id}/>
      <main>
    <FilterPanel>
      <div className="row_aside">
        Фильтр
      </div>

      <div className="row_aside">
        <MyFilterDetails name="Категория" style={{width: "100%"}}>
          {filter.flagsFilter.map((flag) => OneCategory(flag, filter, setFilter, setLoading))}
        </MyFilterDetails>
      </div>
      <div className="row_aside">
        <MyFilterDetails name="Марка" style={{width: "100%"}}>
          <div className="">
            <MarksFilter catalog={Catalog.AutoParts} filter={filter} setFilter={setFilter} defaultMark="Все"/>
          </div>
        </MyFilterDetails>
      </div>

      <div className="row_aside">
        <MyFilterDetails name="Ценовой диапазон" style={{width: "100%"}}>
          <div className="">
            <div className="one_category">
              <input value={filter.biggerThan || ''}  onChange={e => {setFilter({...filter, biggerThan: Number(e.target.value) ?
               Number(e.target.value) : 0})}}
               type="text" placeholder="от" name="" className="input_filter"/>
            </div>
          </div>
          <div className="one_category">
            <input value={filter.lowerThan || ''}  onChange={e => {setFilter({...filter, lowerThan: Number(e.target.value)})}}
             type="text" placeholder="до" name="" className="input_filter"/>
          </div>
        </MyFilterDetails>
      </div>
    </FilterPanel>
      <div className="main">
        <div className="">
          <input type="text" onChange={(e)=>{setFilter({...filter, filterSearch: e.target.value})}} name="" placeholder="Поиск" 
          className="search"/>
        </div>
        <LoadingComponent loading={loading}>
        <div className="contain_cards">{
            GetCards(cards.slice((page - 1) * limitCards, page * limitCards), setCards, loading)
          }</div>
          <PagginationMenu page={page} setPage={setPage} maxPage={Math.round(cards.length / limitCards)}/>
        </LoadingComponent>
      </div>
  </main>
  </>
  )
}