from sqlalchemy import func, select, and_, or_
from project.BaseData.engine import async_session_factory
from project.BaseData.Models.purchase import GoodsServiceOrm
from ..Enums.for_models import TypeAutoParts, Catalog
from project.BaseData.sqhemas.data import GoodsServiceDTO


async def get_goods_by_filter(catalog: Catalog, type_goods: TypeAutoParts | None, biggerThan: float, lowerThan: float, Mark: str, FilterSearch: str) \
        -> [GoodsServiceDTO]:
    async with async_session_factory() as session:
        query = (
            select(GoodsServiceOrm)
            .where(and_(or_(GoodsServiceOrm.TypeGoods == type_goods,
                        GoodsServiceOrm.TypeGoods is None), func.lower(GoodsServiceOrm.Mark).like("%" + Mark.lower() + "%"),
                        GoodsServiceOrm.Catalog == catalog, GoodsServiceOrm.Price >= biggerThan, GoodsServiceOrm.Price <= lowerThan,
                        or_(func.lower(GoodsServiceOrm.Name).like("%"+FilterSearch.lower()+"%"),
                            func.lower(GoodsServiceOrm.Article).like("%"+FilterSearch.lower()+"%"))))
        )
        result = await session.execute(query)
        result = result.scalars().all()
        print([GoodsServiceDTO.model_validate(row, from_attributes=True) for row in result], "reees")
        return [GoodsServiceDTO.model_validate(row, from_attributes=True) for row in result]


async def get_max_price() -> float:
    async with async_session_factory() as session:
        query = (
            select(func.max(GoodsServiceOrm.Price))
        )
        result = await session.execute(query)
        return result.scalars().first()