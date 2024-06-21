from project.BaseData.Enums.for_models import TypeService, TypeGoods
from project.BaseData.engine import async_engine
from project.BaseData.Models.models import Base
from project.BaseData.queries.for_base_data import insert_position_goods



async def create_tables():# TODO когда все сделаешь, удали
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    await insert_position_goods("Адаптер для датчика Audi 80/S2 B4", TypeService.Goods, TypeGoods.Auto,
                          300, "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/%D0%90%D0%B4%D0%B0%D0%BF%D1%82%D0%B5%D1%80%20%D"
                               "0%B4%D0%BB%D1%8F%20%D0%B4%D0%B0%D1%82%D1%87%D0%B8%D0%BA%D0%B0%20Audi%2080%20B4.png", True)
    await insert_position_goods("Ручка задней двери Pathfinder R51", TypeService.Goods, TypeGoods.Auto,
                                850, "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/%D0%A0%D1%83%D1%87%D0%"
                                     "BA%D0%B0%20%D0%B7%D0%B0%D0%B4%D0%BD%D0%B5%D0%B9%20%D0%B4%D0%B2%D0%B5%D1%80%D0%B8%20Pathfinder%20R51.png", True)
    await insert_position_goods("Шестерня редуктора заднего стеклоочистителя 2114", TypeService.Goods, TypeGoods.Auto,
                                450, "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/%D0%A8%D0%B5%D1%81%D1%82%D0%B5%D1%80%D0%BD%D"
                                     "1%8F%20%D1%80%D0%B5%D0%B4%D1%83%D0%BA%D1%82%D0%BE%D1%80%D0%B0%20%D0%B7%D0%B0%D0%B4%D0%BD%D0%B5%D0%B3%D0%BE%20%D"
                                     "1%81%D1%82%D0%B5%D0%BA%D0%BB%D0%BE%D0%BE%D1%87%D0%B8%D1%81%D1%82%D0%B8%D1%82%D0%B5%D0%BB%D1%8F%202114.png",True)
    await insert_position_goods("Шестерня стеклоподъемника LADA Priora/Chev Niva", TypeService.Goods, TypeGoods.Auto,
                                450, "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/%D0%A8%D0%B5%D1%81%D1%82%"
                                     "D0%B5%D1%80%D0%BD%D1%8F%20%D1%81%D1%82%D0%B5%D0%BA%D0%BB%D0%BE%D0%BF%D0%BE%D0%B4%D1%8A%D0%B5%D0%BC%D0%BD%D0%B8%D0%BA%D0%B0%20LADA%20PrioraChev%20Niva.png",True)
    await insert_position_goods("Заглушка ручки двери Mitsubishi", TypeService.Goods, TypeGoods.Auto,
                                250, "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/%D0%97%D0%B0%D0%B3%D0%BB%D"
                                     "1%83%D1%88%D0%BA%D0%B0%20%D1%80%D1%83%D1%87%D0%BA%D0%B8%20%D0%B4%D0%B2%D0%B5%D1%80%D0%B8%20Mitsubishi.png",True)
    await insert_position_goods("Хомут рулевого вала Nissan Qashqai", TypeService.Goods, TypeGoods.Moto,
                                1000, "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/%D0%A5%D0%BE%D0%BC%D1%83%D1%82%20%D1%80%D1%83%D0%BB%D0%B5%D0%B2%D0%BE%D0%B3%D0%BE%20%D0%B2%D0%B0%D0%BB%D0%B0%20Nissan%20Qashqai.png",True)