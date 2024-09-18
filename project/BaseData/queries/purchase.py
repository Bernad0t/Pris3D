from datetime import datetime

from sqlalchemy import select, and_, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload, Session

from project.BaseData.engine import async_session_factory
from project.BaseData.Models.purchase import OrderOrm, BasketsOrm, GoodsServiceOrm
from project.BaseData.Enums.for_models import ResultPurchase
from project.BaseData.sqhemas.data import BasketsDTO, OrderDTORel
from project.exceptions import ORDER_ERROR


async def create_order(user_id: int, session: AsyncSession):
    order = OrderOrm(Users_id=user_id, DatePayment=None, DateReciept=None,
                     ResultPurchase=ResultPurchase.unpaid, Discount=0, PriceDelivery=0, TotalPrice=0, goods_in_basket=[])
    session.add(order)
    await session.flush()
    return order


async def get_history(user_id: int):
    async with async_session_factory() as session:
        query = (
            select(OrderOrm)
            .where(and_(OrderOrm.Users_id == user_id, OrderOrm.ResultPurchase != ResultPurchase.unpaid))
            .options(selectinload(OrderOrm.goods_in_basket))
            .options(selectinload(OrderOrm.baskets))
        )

        order = await session.execute(query)
        order = order.unique().scalars().all()
        return [OrderDTORel.model_validate(row, from_attributes=True) for row in order]


async def get_order(user_id: int):
    async with async_session_factory() as session:
        query = (
            select(OrderOrm)
            .where(and_(OrderOrm.Users_id == user_id, OrderOrm.ResultPurchase == ResultPurchase.unpaid))
            .options(selectinload(OrderOrm.goods_in_basket))
            .options(selectinload(OrderOrm.baskets))
        )

        order = await session.execute(query)
        order = order.unique().scalars().first()
        return order


async def set_order(order: OrderDTORel, session: Session, commit: bool = False):
    if not order.DatePayment:
        date_payment = None
    else:
        date_payment = order.DatePayment.date()
    if not order.DateReciept:
        date_reciept = None
    else:
        date_reciept = order.DatePayment.date()
    query = (
        update(OrderOrm)
        .where(OrderOrm.id == order.id)
        .values({"WayDelivery": order.WayDelivery, "ResultPurchase": order.ResultPurchase, "DatePayment":
            date_payment, "DateReciept": date_reciept})
    )

    await session.execute(query)
    if commit:
        await session.commit()


async def get_price_card(id: int):
    async with async_session_factory() as session:
        query = (
            select(GoodsServiceOrm.Price)
            .where(GoodsServiceOrm.id == id)
        )
        result = await session.execute(query)
        return round(result.scalars().first(), 2)


async def get_quantity_card(good_id: int, order_id: int):
    async with async_session_factory() as session:
        query = (
            select(BasketsOrm.Number)
            .where(and_(BasketsOrm.GoodsService_id == good_id, BasketsOrm.Order_id == order_id))
        )
        result = await session.execute(query)
        return result.scalars().first()


async def get_basket(good_id: int, order_id: int):
    async with async_session_factory() as session:
        query = (
            select(BasketsOrm)
            .where(and_(BasketsOrm.Order_id == order_id, BasketsOrm.GoodsService_id == good_id))
            .order_by(BasketsOrm.GoodsService_id)
        )
        result = await session.execute(query)
        return result.scalars().first()


async def delete_basket(token: dict, good_id: int): # TODO order измени
    async with async_session_factory() as session:
        order = await get_order(token["id"])
        query_basket = (
            select(BasketsOrm)
            .where(and_(BasketsOrm.Order_id == order.id, BasketsOrm.GoodsService_id == good_id))
        )
        basket = await session.execute(query_basket)
        basket = basket.scalars().first()
        new_price = round(order.TotalPrice - await get_price_card(good_id) * basket.Number, 2)
        query_basket = (
            delete(BasketsOrm)
            .where(and_(BasketsOrm.Order_id == order.id, BasketsOrm.GoodsService_id == good_id))
        )
        query_order = (
            update(OrderOrm)
            .where(OrderOrm.id == order.id)
            .values({OrderOrm.TotalPrice: new_price})
        )
        await session.execute(query_basket)
        await session.execute(query_order)
        await session.commit()


async def add_to_basket(token: dict, good_id: int, quantity: int = 1):
    async with async_session_factory() as session:
        order = await get_order(token["id"])

        if not order:
            order = await create_order(token["id"], session)

        basket = await get_basket(good_id, order.id)

        price_card = await get_price_card(good_id)
        if basket:
            query_basket = (
                update(BasketsOrm)
                .where(and_(BasketsOrm.Order_id == order.id, BasketsOrm.GoodsService_id == good_id))
                .values({BasketsOrm.Number: quantity})
            )
            new_price = round(order.TotalPrice + price_card * (quantity - basket.Number), 2)
            await session.execute(query_basket)
        else:
            basketOrm = BasketsOrm(Order_id=order.id, GoodsService_id=good_id, Number=quantity)
            new_price = round(order.TotalPrice + quantity * price_card, 2)
            session.add(basketOrm)
        query_order = (
            update(OrderOrm)
            .where(OrderOrm.id == order.id)
            .values({OrderOrm.TotalPrice: new_price})
        )
        await session.execute(query_order)
        await session.commit()


async def get_baskets(token: dict):
    async with async_session_factory() as session:
        order = await get_order(token["id"])

        if order:
            order_id = order.id
        else:
            raise ORDER_ERROR

        return OrderDTORel.model_validate(order, from_attributes=True)


async def exist_item_in_basket(token: dict, good_id: int):
    async with async_session_factory() as session:
        order = await get_order(token["id"])

        if order:
            order_id = order.id
        else:
            raise ORDER_ERROR

        query = (
            select(BasketsOrm)
            .where(and_(BasketsOrm.Order_id == order_id, BasketsOrm.GoodsService_id == good_id))
        )

        item = await session.execute(query)
        item = item.scalars().first()

        if item:
            return True
        else:
            return False