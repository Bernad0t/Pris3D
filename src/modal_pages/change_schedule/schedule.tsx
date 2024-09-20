import { DataDTO, DayScheduleDTO } from "../../sqhemas/base_data_dto";
import "./schedule.css"
import { WeekNames } from "../../sqhemas/enums_models_field";

interface Props{
    data: DataDTO
    setData: React.Dispatch<React.SetStateAction<DataDTO>>
}

function OneDay(schedule: DayScheduleDTO, data: DataDTO, setData: React.Dispatch<React.SetStateAction<DataDTO>>){
  return(
    <div className="one-day">
      <div>{WeekNames[schedule.day_id]}:</div>
      <div className="one-schedule">
        <input type="text" value={schedule.From} onChange={(e) => 
          setData({...data, schedule: data.schedule.map(sch => sch.day_id == schedule.day_id ? {...sch, From: e.target.value} : sch
          )})}/>
        -
        <input type="text" value={schedule.To} onChange={(e) => 
          setData({...data, schedule: data.schedule.map(sch => sch.day_id == schedule.day_id ? {...sch, To: e.target.value} : sch
          )})}/>
      </div>
    </div>
  )
}

export default function Schedule({data, setData}: Props){
  console.log(data, "dadas")
  return (
    <>
        <div className="input-schedule-row">
          {data.schedule.map(sch => OneDay(sch, data, setData))}
        </div>
    </>
  );
}