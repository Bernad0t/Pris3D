from sqlalchemy import func, select, and_
from project.BaseData.engine import async_session_factory
from project.BaseData.Models.models import GoodsServiceOrm
from ..Enums.for_models import TypeService, TypeGoods
from ..Models.sqhemas import GoodsServiceDTO

# async def get_goods_by_price(biggerThan: float | None, lowerThan : float | None) -> [GoodsServiceDTO]:
#     async with async_session_factory() as session:
#         query = (
#             select(GoodsServiceOrm)
#             .where(and_(GoodsServiceOrm.Price >= func.coalesce(biggerThan, 0), GoodsServiceOrm.Price <= func.coalesce(lowerThan,
#                 select(func.max(GoodsServiceOrm.Price)))))
#         )
#         result = await session.execute(query)
#         result = result.scalars().all()
#         return [GoodsServiceDTO.model_validate(row, from_attributes=True) for row in result]


async def get_goods_by_filter(TypeGoods: TypeGoods, biggerThan: float, lowerThan: float, FilterSearch: str) -> [GoodsServiceDTO]:
    async with async_session_factory() as session:
        query = (
            select(GoodsServiceOrm)
            .where(and_(GoodsServiceOrm.TypeGoods == TypeGoods, GoodsServiceOrm.Price >= biggerThan,
                        GoodsServiceOrm.Price <= lowerThan, func.lower(GoodsServiceOrm.Name).like("%"+FilterSearch.lower()+"%")))
        )
        result = await session.execute(query)
        result = result.scalars().all()
        return [GoodsServiceDTO.model_validate(row, from_attributes=True) for row in result]


async def get_max_price() -> float:
    async with async_session_factory() as session:
        query = (
            select(func.max(GoodsServiceOrm.Price))
        )
        result = await session.execute(query)
        return result.scalars().first()