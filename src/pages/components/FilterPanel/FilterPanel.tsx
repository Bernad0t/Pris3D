import { useNavigate } from "react-router-dom"
import style from "./FilterPanel.module.css"
import basket from "./img/basket.png"
import { pathPages } from "../../../sqhemas/enums"

interface Props{
    children: React.ReactNode
}

export default function FilterPanel({children}: Props){
    const navigate = useNavigate()

    return(
        <div className={style.aside}>
            {children}
            <div className={style.contain_basket}>
                <input type="image" src={basket} onClick={() => navigate(pathPages.basketAcc)}/>
            </div>
        </div>
    )
}