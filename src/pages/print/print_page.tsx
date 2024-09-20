import axios from "axios"
import { IdPages } from "../../sqhemas/enums"
import { QueryService } from "../../sqhemas/frontend_dto"
import ScanPrintPage from "../components/ScanPrintPage/ScanPrintPage"

export default function PrintPage(){
    const images = [
        "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/scan_print/1print.7YVSdLa4QWxk3YNpBBfd6CPWQ2rs1cNkJNBDbuLdSWbk.YD2J-FPOFKCvad0Z2YZbTbD-bXX-nv1Dar6y30pGfuE",
        "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/scan_print/2print._nGXf7a4Upih1pCd5yzIHObdUJ4p3tCQ4dtQmifWWpIh.qsDHkNHbtVGDC-E2Cm_4eJL7iuGKkslsH6Ux4AsVgLY",
        "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/scan_print/3print.l95tGra4Ozdbs_kyT3insxy4OTHTu7k_G745Nd2zMz3b.F7l6esLomdOQtAue23Y-rRW4_ak0268r6mQPj7Y4hIw",
        "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/scan_print/4print.5jcsTra4St4a54jbbC3WWl3sSNiS78jWWupI3JznQtSa.4HJqW7Vj--MiRfXYsJfr787fPBUSHaZ_mTvoGKkmW2k"
        ]
    const description = "Предоcтaвляем уcлуги 3Д-печати на заказ, в тoм числe мелко и cpeдне cеpийнaя пeчaть, вoзмoжна работа с юpидичеcкими лицaми. Большoй выбор вoзмoжныx иcпoльзуемых плacтиков (PLА, РEТG, АВS, Nеylon, Flex, Flех Нard(полиуpетaн), РND (пoлиэтилeн низкого давлeния), Koмпозиты c cодepжaнием углевoлoкнa и cтекловолокна (АВS GF10, АВS РА6 и тд)). Также возможно изготовление детали по образцу."
    const id = IdPages.print3d

    async function submit(query: QueryService){
        axios.post(`http://127.0.0.1:8000/purchase/sendPrint`, query, {withCredentials: true})
    }

    return(
        <ScanPrintPage id_page={id} images={images} handleSubmit={submit} description={description}/>
    )
}