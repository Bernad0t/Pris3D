from datetime import datetime

from project.BaseData.engine import async_session_factory
from project.BaseData.Models.models import OrderOrm, BasketsOrm
from project.BaseData.Enums.for_models import ResultPurchase


async def create_order(user_id: int, DatePayment: datetime, DateReciept: datetime, ResultPurchase: ResultPurchase, TotalPrice: float):
    async with async_session_factory as session:
        order = OrderOrm(Users_id=user_id, DatePayment=DatePayment, DateReciept=DateReciept,
                         ResultPurchase=ResultPurchase, TotalPrice=TotalPrice)
        await session.add(order)
        await session.flush()
        return order.id


async def collect_basket(order_id: id, quantity: int, good_id: int, sess_commit: bool = False):
    async with async_session_factory as session:
        basket = BasketsOrm(Order_id=order_id, GoodsService_id=good_id, Number=quantity, Review_id=None)
        await session.add(basket)
        await session.flush()
        if sess_commit:
            await session.commit()
