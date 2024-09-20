//images
import statistic from "./assets/img/statistic.png"
import replie_1 from "./assets/img/repl_1.png"
import replie_2 from "./assets/img/repl_2.png"
import replie_3 from "./assets/img/repl_3.png"
import map from "./assets/img/map.png"
//styles
import "./assets/buttons.css"
import "./assets/main.css"
import "./assets/footer.css"
import "./assets/replies.css"

import Header from "../components/header/header"
import { useNavigate } from "react-router-dom"
import { pathPages } from "../../sqhemas/enums"
import { useEffect, useState } from "react"
import { DataDTO } from "../../sqhemas/base_data_dto"
import axios from "axios"
import ContactSchedule from "../components/schedule/schedule"

function Replie({image}: {image: string}){
    return(
        <div className="replies">
            <div className="">
              <input type="image" src={image} name="button" className="repl_but"/>
            </div>
          </div>
    )
}

export default function Main(){
  const id: number = 1
  const navigate = useNavigate()
  const [data, setData] = useState<DataDTO | null>(null)
  useEffect(() => {
    axios.get<DataDTO>(`http://127.0.0.1:8000/data/GetDataContacts`)
    .then(({data}) => setData(data))
  }, [])
    return(
        <>
        <Header id={id}/>      
          <main>
      <div className="info">
        <div className="info_text">
            <h1>Pris3D</h1>
            <h2>Аддитивное производство</h2>
          <div className="">
            Предоставляем услуги 3D-сканирования, 3D-печати, ремонта и продажи 3D-принтеров
          </div>
          <div className="">
            <button type="button" name="button" className="look_auto" onClick={() => navigate(pathPages.autoParts)}>Посмотреть автозапчасти</button>

          </div>
        </div>
        <div className="grafic">
            <img src={statistic} alt="statistic"/>
        </div>
      </div>

      <div className="benefits">
        <div className="our_benefits">
          <h2>Наши преимущества</h2>
        </div>
        <div className="container_benefits">
          <div className="container_names_benefits">
            <div className="">
              <h2 style={{textAlign:"center"}} >Эксклюзивные запчасти</h2>
            </div>
            <div className="">
              <h2 style={{textAlign:"center"}} >Гарантия</h2>
            </div>
            <div className="">
              <h2 style={{textAlign:"center"}}>Изготовление на заказ</h2>
            </div>
            <div className="">
              <h2 style={{textAlign:"center"}} >Доставка</h2>
            </div>

          </div>

          <div className="container_discription_benefits">
            <div style={{textAlign:"center"}} className="">
              Производим запчасти, которые отдельно не купить
            </div>
            <div style={{textAlign:"center"}} className="">
              Наличие гарантии на производимые детали
            </div>
            <div style={{textAlign:"center"}} className="">
              Наличие возможности изготовления детали под заказ
            </div>
            <div style={{textAlign:"center"}} className="">
              Отправляем почтой, сдэком и авито-доставкой, зависит от того, что для Вас удобнее.
            </div>
          </div>
        </div>
      </div>

      <div className="part_replies">
        <div className="text_repl">
          <h1>Отзывы</h1>
        </div>
        <div className="container_repl">
          <Replie image={replie_1}/>
          <Replie image={replie_2}/>
          <Replie image={replie_3}/>
        </div>
        <form action={pathPages.toAvito}>
        <div className="contain_check_repl_but">
          <button type="submit" name="button" className="check_repl_but">Посмотреть все отзывы</button>
        </div>
        </form>
      </div>
    </main>

    <footer>
      <ContactSchedule data={data}/>
      <img src={map} alt="map"/>
    </footer>

        </>
    )
}