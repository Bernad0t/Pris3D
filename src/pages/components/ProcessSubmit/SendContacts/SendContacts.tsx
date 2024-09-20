import { GetUserContactsDTO } from "../../../../sqhemas/base_data_dto"
import { instance } from "../../myAxios"

export default function SendContacts(contacts: GetUserContactsDTO){
    // const navigate = useNavigate() 
    instance.post("http://127.0.0.1:8000/accaunt/SendContacts", {
        access_token: localStorage.getItem("token"),
        Gmail: contacts.Gmail,
        Mobile: contacts.Mobile,
        FullName: contacts.FullName,
        DateBirthday: contacts.DateBirthday,
        Sex: contacts.Sex,
    }, {withCredentials: true})
}