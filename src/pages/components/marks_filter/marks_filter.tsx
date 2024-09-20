import { useEffect, useState } from "react";
import { Catalog } from "../../../sqhemas/enums";
import axios from "axios";
import ButtonFilter from "../../../UI/button_filter/button_filter";
import { FilterAuto, FilterPrinter } from "../../../sqhemas/frontend_dto";

// import style from "./marks_filter.module.css"

interface Props{
    catalog: Catalog
    filter: FilterAuto | FilterPrinter | null
    setFilter: React.Dispatch<React.SetStateAction<FilterAuto>> | React.Dispatch<React.SetStateAction<FilterPrinter>>
     | React.Dispatch<React.SetStateAction<string>> // для insert_good
    defaultMark: string
}

function OneMark(name: string, active: boolean, clicked: Function){
    return(
        <>
        {name.length > 0 && <div className={""}>
            <ButtonFilter active={active} onClick={() => clicked(name)}/>
            {name}
        </div>}
        </>
    )
}

export default function MarksFilter({catalog, filter, setFilter, defaultMark="Все"} : Props){
    const [marks, setMarks] = useState([
        {name: defaultMark, active: false}
    ])

    useEffect(
        () => {
            axios.get<string[]>(`http://127.0.0.1:8000/data/getMarks`, {params: {catalog: catalog}})
            .then(({data}) => {
                const new_marks = data.map(item => {return {name: item, active: false}})
                setMarks([...marks, ...new_marks])
            })
        }, [catalog]
    )
    function Click(name: string){
        if (filter) 
            setFilter({...filter, mark: name == defaultMark || marks.find(mark => mark.name == name && mark.active)?.active ? "" : name})
        else 
            setFilter(name == defaultMark ? "" : name)
        setMarks(marks.map(mark => mark.name == name || mark.active ? {...mark, active: !mark.active} : mark))
    }

    return(
        marks.map((mark) => OneMark(mark.name, mark.active, Click))
    )

}