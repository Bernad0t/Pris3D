import Main from "./pages/main_page/main.tsx"
import Catology from "./pages/auto_catology/catology.tsx"
import "./App.css"
import Authorization from "./pages/authorization/authorization.tsx"

import {Route, Routes, BrowserRouter} from "react-router-dom"
import OneItem from "./pages/oneItem/oneItem.tsx"
import Contacts from "./pages/accaunt/contacts/contacts.tsx"
import Favorite from "./pages/accaunt/favorite/favorite.tsx"
import Printer3D from "./pages/catology_printer3d/printer3d.tsx"
import Basket from "./pages/accaunt/basket/basket.tsx"
import ChageSite from "./pages/accaunt/change_site/change_site.tsx"
import InsertGood from "./pages/accaunt/change_site/insert_good/insert_good.tsx"
import ChangeSiteContacts from "./pages/accaunt/change_site/change_contacts/change_contacts.tsx"
import { pathPages } from "./sqhemas/enums.ts"
import PrintPage from "./pages/print/print_page.tsx"
import ScanPage from "./pages/scan_page/scan_page.tsx"
import AddressAcc from "./pages/accaunt/address/address_acc.tsx"
import ChooseAddress from "./pages/accaunt/basket/address_purchase/address.tsx"
import HistoryAcc from "./pages/accaunt/history/history.tsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={pathPages.Main} Component={Main}></Route>
          <Route path={pathPages.autoParts} Component={Catology}></Route>
          <Route path={pathPages.printer3d} Component={Printer3D}></Route>
          <Route path={pathPages.authorization} Component={Authorization}></Route>
          <Route path={pathPages.Item + "/:id"} Component={OneItem}/>
          <Route path='/accaunt/contactsAcc' Component={Contacts}/>
          <Route path={pathPages.adressAcc} Component={AddressAcc}/>
          <Route path={pathPages.historyAcc} Component={HistoryAcc}/>
          <Route path='/accaunt/favoriteAcc' Component={Favorite}/>
          <Route path='/accaunt/basketAcc' Component={Basket}/>
          <Route path='/accaunt/changeSite' Component={ChageSite}/>
          <Route path='/data/changeSite/insert' Component={InsertGood}/>
          <Route path='/data/changeSite/contactsData' Component={ChangeSiteContacts}/>
          <Route path={pathPages.print3d} Component={PrintPage}/>
          <Route path={pathPages.scan3d} Component={ScanPage}/>ChooseAddress
          <Route path={pathPages.addressPurchase} Component={ChooseAddress}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App