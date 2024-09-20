import { DataDTO, DayScheduleDTO } from "../../../sqhemas/base_data_dto"
import { WeekNames } from "../../../sqhemas/enums_models_field"

import style from "./schedule.module.css"

function DaySchedule(data: DayScheduleDTO){
    return(
      <>
        {WeekNames[data?.day_id]}: {data?.From}-{data?.To}<br/>
      </>
    )
  }

export default function ContactSchedule({data}: {data: DataDTO | null}){
    return(
        <div className={style.kontacts}>
        <h1>Контакты</h1>
        Телефон/WhatsApp: {data?.data_site.Mobile} <br/>
        {data?.data_site.Address}<br/>
        Время работы: <br/>
        {data?.schedule.map(schedule => DaySchedule(schedule))}

      </div>
    )
}