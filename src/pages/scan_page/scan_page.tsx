import axios from "axios"
import { IdPages } from "../../sqhemas/enums"
import { QueryService } from "../../sqhemas/frontend_dto"
import ScanPrintPage from "../components/ScanPrintPage/ScanPrintPage"

export default function ScanPage(){
    const images = [
        "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/scan_print/1scan.KRUEDLa4hfwypUf5WiwxZGKuh_q6rQf0cqiH_rSljfay.UmpnpjSnE92Lkflz6X5vFGDBHU6_Xi0zIb_7UmqMh5E",
        "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/scan_print/2scan.3MYj5La4cC8VTbIqF5-1t0VGcimdRfInVUByLZNNeCWV.zgGrsVgqqd-nzoJ-wsAb4BC6mXdD7SbbJR529w-l47s",
        "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/scan_print/3scan.AbRQhOiUPacFrcc3aJ_kf-ITfC2lkZhwTvXbIsScRgI",
        "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/scan_print/4scan.NrPPKba4mlr5gFhfrxkSstSLmFxxiBhSuY2YWH-AklB5.GdSlim2RYEdxkbdNjjsKHGbGrgzRs0wWueXEKPSNHEk"
    ]
    const description = "Прeдoстaвляeм услугу cканирования дeтали, пpи неoбходимocти доpaбoтки. Taкжe вoзможно воcстaнoвлениe cлoмaнных дeтaлей, дoстатoчнo пpинеcти егo чaсти. Тaкжe возможнa 3D-печать cмоделиpoванной детaли из любыx пластиков в тoм чиcлe и инжeнepных. Boзмoжно paбoта c peгионами путем пересылки деталей СДЭКом нам и вам обратно также. Результат работы – SТL, SТР и др. необходимые варианты модели. Минимальная стоимость – 1000р. Минимальный размер – 25*25*25 мм. Возможна работа с юр. лицами. 3д-сканирование, реверс инжиниринг, восстановление детали, копирование детали, мебельный крепеж."
    const id = IdPages.scan3d

    async function submit(query: QueryService){
        axios.post(`http://127.0.0.1:8000/purchase/sendScan`, query, {withCredentials: true})
    }

    return(
        <ScanPrintPage id_page={id} images={images} handleSubmit={submit} description={description}/>
    )
}