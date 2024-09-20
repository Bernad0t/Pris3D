import { useEffect, useState } from "react"
import { FilterPrinter, GoodsServiceClient } from "../../sqhemas/frontend_dto"
import axios from "axios"
import { updateTypeCardsPrinter } from "../../utils/filterCardsPrinter"
import Header from "../components/header/header"

import GetCards from "../components/card"
import LoadingComponent from "../components/LoadingComponent"
import MarksFilter from "../components/marks_filter/marks_filter"
import { Catalog } from "../../sqhemas/enums"
import FilterPanel from "../components/FilterPanel/FilterPanel"
import { MyFilterDetails } from "../../UI/MyDetails/MyDetails"
import PagginationMenu from "../../UI/paggination_buttons/paggination_menu"

const limitCards = 4

export default function Printer3D(){
    const id: number = 5
    const [cards, setCards] = useState<Array<GoodsServiceClient>>([])
    const [filter, setFilter] = useState<FilterPrinter>({
        biggerThan: 0, lowerThan: undefined, filterSearch: "", mark: ""
    })
    const [MaxPriceData, setMaxPriceData] = useState<number>()
    const [loading, setLoading] = useState(true)

    const [page, setPage] = useState(1) //  pagination

    useEffect(() => {
        setLoading(true)
        MaxPriceData ? 
        updateTypeCardsPrinter(filter, (data: Array<GoodsServiceClient>) => {setCards(data)}) :
        axios.get<number>("http://127.0.0.1:8000/data/catology/getMaxPrice")
        .then(({data}) => {
            setMaxPriceData(data)
            setFilter({...filter, lowerThan: data})
            updateTypeCardsPrinter({...filter, lowerThan: data}, (data: Array<GoodsServiceClient>) => {setCards(data)})
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
                    <MyFilterDetails name="Фирма" style={{width: "100%"}}>
                        <div className="">
                            <MarksFilter catalog={Catalog.Printer} filter={filter} setFilter={setFilter} defaultMark="Все"/>
                        </div>
                    </MyFilterDetails>
                </div>
        
                <div className="row_aside">
                    <MyFilterDetails name="Ценовой диапазон" style={{width: "100%"}}>
                        <div className="">
                            <div className="one_category">
                                <input value={filter.biggerThan || ''}  onChange={e => {setFilter({...filter, biggerThan: 
                                Number(e.target.value) ? Number(e.target.value) : 0})}} type="text" placeholder="от" name="" className="input_filter"/>
                            </div>
                        </div>
                        <div className="one_category">
                            <input value={filter.lowerThan || ''}  onChange={e => {setFilter({...filter, lowerThan: 
                                Number(e.target.value)} )}} type="text" placeholder="до" name="" className="input_filter"/>
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
                    <div className="contain_cards">{ GetCards(cards, setCards, loading)}</div>
                    <PagginationMenu page={page} setPage={setPage} maxPage={Math.round(cards.length / limitCards)}/>
                </LoadingComponent>
            </div>
        </main>
    </>
    )
}