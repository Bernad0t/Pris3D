import { OrderDTORel } from "../../../../sqhemas/base_data_dto"

import basket_style from "./Ticket.module.css"

interface Props{
    order: OrderDTORel | null
    handleSubmit: Function
}

function FieldTicket(nameField: string, valueField: number | null){
    return(
        <div className="">
            <span>{nameField}</span>
            <span>{valueField} РУБ.</span>
        </div>
    )
}

export default function Ticket({order, handleSubmit}: Props){
    return(
        <div className={basket_style.buyTicket}>
            <div className={basket_style.headerTicket}>
                СУММА ЗАКАЗА
            </div>
            <div className={basket_style.priceTicket}>
                {FieldTicket("Цена", order ? order.TotalPrice : null)}
                {FieldTicket("Скидка", order ? order.Discount : null)}
                {FieldTicket("Доставка", order ? order.PriceDelivery : null)}
            </div>
            <div className={basket_style.resultTicket}>
                <span>ИТОГО</span>
                <span>{order ? order.TotalPrice + order.PriceDelivery - order.Discount : null} РУБ.</span>
            </div>
            <div className={basket_style.submitPurchase}>
                <button type="submit" name="button" onClick={() => handleSubmit()}>ДАЛЕЕ</button>
            </div>
        </div>
    )
}