import PagginationButton from "./pagginaation_button/paggination_button";

import style from "./paggination.module.css"

export default function PagginationMenu({page, setPage, maxPage} : {page: number,setPage: React.Dispatch<React.SetStateAction<number>>,  maxPage: number}){
    return(
        <div className={style.contain_paggination}>
            <div className={style.paggination}>
                <div className={style.one_part}>
                    {page > 1 && <PagginationButton onClick={() => setPage(page - 1)}>Назад</PagginationButton>}
                </div>
                <div className={style.one_part}>
                    <div style={{display: "flex", margin: "auto", color: "rgba(52, 75, 245, 1)"}}>
                        {page}
                    </div>
                </div>
                <div className={style.one_part}>
                    {page < maxPage && <PagginationButton onClick={() => setPage(page + 1)}>Вперед</PagginationButton>}
                </div>
            </div>
        </div>
    )
}