from config import send_message
from project.BaseData.Enums.for_models import WayDeliveryEnum
from project.BaseData.queries.user import get_user_by_id
from project.BaseData.sqhemas.data import OrderDTORel
from project.BaseData.sqhemas.scan_or_print import DescriptionOrder


async def send_order(order: OrderDTORel):
    user = await get_user_by_id(order.Users_id)
    message = "Товар(ы):\n"
    print(message, "message")
    for good in order.goods_in_basket:
        number = -1
        for basket in order.baskets:
            if basket.GoodsService_id == good.id:
                number = basket.Number
                break
        message += f"   {good.Name}({good.Price} РУБ, артикул: {good.Article}, марка: {good.Mark}," \
                   f" каталог: {good.Catalog.value}, количество: {number})\n"
    message += f"Способ доставки: {order.WayDelivery.value}\n"
    message += f"Общая стоимость: {order.TotalPrice}\n"
    message += f"Заказчик:\n   ФИО: {user.FullName}, Почта: {user.Gmail}, Телефон: {user.Mobile}\n"
    if order.WayDelivery == WayDeliveryEnum.delivery:
        for addr in user.user_address:
            if addr.Selected:
                message += f"Адрес доставки: г. {addr.City} ул. {addr.Street} дом {addr.Home}"
                break
    await send_message(message, "Покупка товара")


async def send_scan_print(details: DescriptionOrder, theme: str):
    message = f"Заказ: {details.description}\n ФИО заказчика: {details.name}\n Почта: {details.mail}\n Телефон:" \
              f" {details.mobile}"
    await send_message(message, theme)

