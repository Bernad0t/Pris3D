import { useEffect, useState } from "react"
import GetFavorites from "../../../utils/GetFavorites/GetFavorites"
import NavigateButtons from "../../components/navigate_button"
import Header from "../../components/header/header"
import { IdPages, pathPages } from "../../../sqhemas/enums"
import Loader from "../../components/Loader/loader"
import GetCards from "../../components/card"
import { GoodsServiceClient } from "../../../sqhemas/frontend_dto"
import { convertGoodsService } from "../../../utils/convertIntoClientFromDto"
import useGetButtonsAccaunt from "../../components/getButtonsAccaunt"
import AccauntPanel from "../../components/AccauntPanel/AccaunPAnel"

export default function Favorite(){
    const [loading, setLoading] = useState(true)
    const [favoritesCards, setFavoritesCards] = useState<Array<GoodsServiceClient>>([])

    useEffect(() => {
        GetFavorites()
        .then((data) => setFavoritesCards(convertGoodsService(data ? data : [], favoritesCards, data ? data : [])))
        setLoading(false)
    },[])

    // const Buttons = useGetButtonsAccaunt(IdPages.favoriteAcc)

    return(
        <>
        <Header id={-1}/>
        <main className="mainAcc">
            {/* <div className="navAcc">
                <NavigateButtons 
                    activeClassName="selectedOneNavAcc"
                    Buttons = {Buttons}
                />
            </div> */}
            <AccauntPanel id={IdPages.favoriteAcc}/>
            <div className="containAccInfo">
                <div className="nameAccCategory">
                избранное
                </div>
                
                <div className="contain_cards">{ loading ?  <div style={{width: '100%', marginTop: '10%', display: "flex", justifyContent: "center"}}>
                    <Loader/>{GetCards(favoritesCards, setFavoritesCards, loading)}</div> : GetCards(favoritesCards, setFavoritesCards, loading)
                }</div>

            </div>
        </main>
        </>
    )
}