import asyncio

from project.BaseData.Enums.for_models import TypeService, TypeGoods
from project.BaseData.engine import async_engine
from project.BaseData.queries.create_table_tmp import create_tables
from project.BaseData.queries.for_base_data import test, insert_position_goods
from project.BaseData.queries.for_filters_catology import get_goods_by_filter


async def start():
    await create_tables()
    # await insert_position_goods("Адаптер для датчика Audi 80/S2 B4", TypeService.Goods, TypeGoods.Auto,
    #                             300, True)
    # await insert_position_goods("Ручка задней двери Pathfinder R51", TypeService.Goods, TypeGoods.Auto,
    #                             850, True)
    # await insert_position_goods("АШестерня редуктора заднего стеклоочистителя 2114", TypeService.Goods, TypeGoods.Auto,
    #                             450, True)
    # await insert_position_goods("Шестерня стеклоподъемника LADA Priora/Chev Niva", TypeService.Goods, TypeGoods.Auto,
    #                             450, True)
    # await insert_position_goods("Заглушка ручки двери Mitsubishi", TypeService.Goods, TypeGoods.Auto,
    #                             250, True)
    # print(await test())
    listok = await get_goods_by_filter(TypeGoods.Auto, 0, 1000, "LADA")
    print(listok)

asyncio.run(start())