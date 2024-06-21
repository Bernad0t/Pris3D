from sqlalchemy import func, select, and_
from project.BaseData.engine import async_session_factory
from project.BaseData.Models.models import GoodsServiceOrm
from ..Enums.for_models import TypeService, TypeGoods
from ..Models.sqhemas import GoodsServiceDTO


async def insert_position_goods(Name: str, TypeService: TypeService, TypeGoods: TypeGoods, Price: float, img: str,  sess_commit: bool = False):
    async with async_session_factory() as session:
        # TODO сделать проверку ,что не существует такой позиции
        good = GoodsServiceOrm(Name=Name, TypeService=TypeService, TypeGoods=TypeGoods, Price=float(Price), img=img)
        query = (
            select(GoodsServiceOrm)
            .where(and_(GoodsServiceOrm.Name == Name, GoodsServiceOrm.TypeService == TypeService,
                        GoodsServiceOrm.Price == Price))
        )
        result = await session.execute(query)
        result = result.scalars().all()
        if len(result) != 0:
            return 1
        session.add(good)
        if sess_commit:
            await session.commit()
        return 0


async def update_position_goods(id: int, Name: str, TypeService: TypeService, TypeGoods: TypeGoods, Price: float, sess_commit: bool = False):
    # админ будет в предложенных полях вводить изменения,
    # и то, что изменено, будет записано в список
    async with async_session_factory() as session:
        # думаю ,лучше 2 раза обратиться к бд, чем 5 раз с проверкой на None в листе
        query = (
            select(GoodsServiceOrm)
            .where(GoodsServiceOrm.id == id)
        )
        result = await session.execute(query)
        result = result.scalars().first()
        if result == None:
            return 1
        await session.query(GoodsServiceOrm).filter(id == GoodsServiceOrm.id)\
            .update({GoodsServiceOrm.Name : func.coalesce(Name, result.id)},
                    {GoodsServiceOrm.TypeService : func.coalesce(TypeService, result.TypeService)},
                    {GoodsServiceOrm.Price : func.coalesce(Price, result.Price)},
                    {GoodsServiceOrm.TypeGoods : func.coalesce(TypeGoods, result.TypeGoods)})
        if sess_commit:
            await session.commit()
        return 0


async def test():
    async with async_session_factory() as session:
        query = select(GoodsServiceOrm)
        result = await session.execute(query)
        result = result.scalars().first()
        return [result.id, result.Name, result.TypeService, result.Number, result.Price]