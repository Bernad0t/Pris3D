
from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from starlette.responses import Response
from starlette import status
from typing_extensions import Annotated

from config import send_message
from project.BaseData.Utils.mails import send_order, send_scan_print
from project.BaseData.Utils.token import verify_token
from project.BaseData.queries.for_base_data import get_session
from project.BaseData.queries.purchase import add_to_basket, get_baskets, exist_item_in_basket, delete_basket, \
    get_quantity_card, get_history, set_order
from project.BaseData.sqhemas.data import OrderDTORel
from project.BaseData.sqhemas.scan_or_print import DescriptionOrder
from project.exceptions import ORDER_ERROR

router = APIRouter(
    prefix="/purchase",
    tags=["purchase"],
)


@router.get("/addBasket")
async def add_basket(token: Annotated[str, Depends(verify_token)], good_id: int, quantity: int):
    await add_to_basket(token, good_id, quantity)


@router.get("/existItemInBasket")
async def exist_item_in_basket_router(token: Annotated[str, Depends(verify_token)], good_id: int):
    try:
        result = await exist_item_in_basket(token, good_id)
        return result
    except ORDER_ERROR:
        return False

@router.get("/getBaskets")
async def get_baskets_from_order(token: Annotated[str, Depends(verify_token)], response: Response):
    try:
        order = await get_baskets(token)
        return order
    except ORDER_ERROR:
        response.status_code = status.HTTP_404_NOT_FOUND


@router.delete("/deleteBasket")
async def delete_baskets_from_order(token: Annotated[str, Depends(verify_token)], good_id: int):
    await delete_basket(token, good_id)


@router.get("/getQuantityCard")
async def get_quantity_from_basket(token: Annotated[str, Depends(verify_token)], good_id: int, order_id: int):
    return await get_quantity_card(good_id, order_id)


@router.get("/getHistory")
async def get_history_router(token: Annotated[str, Depends(verify_token)]):
    return await get_history(token["id"])


@router.post("/setOrder")
async def set_order_router(token: Annotated[str, Depends(verify_token)], data: OrderDTORel, response: Response,
                           session: Session = Depends(get_session)):
    try:
        await set_order(data, session)
        await send_order(data)
        await session.commit()
        session.close()
    except:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR


@router.post("/sendScan")
async def send_scan_router(details: DescriptionOrder):
    await send_scan_print(details, "Заказ на сканирование детали")


@router.post("/sendPrint")
async def send_print_router(details: DescriptionOrder):
    await send_scan_print(details, "Заказ на печать детали")