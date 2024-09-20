export default function GetStrDate(date: string | undefined){
    const date_output = new Date(date ? date : "")
    return date ? `${date_output.getDay()}.${date_output.getMonth()}.${date_output.getFullYear()}` : ""
}