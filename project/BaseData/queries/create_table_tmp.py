from project.BaseData.Enums.for_models import TypeService, TypeAutoParts
from project.BaseData.Models.site_data import DataSiteOrm
from project.BaseData.engine import async_engine
from project.BaseData.Models.purchase import Base
from project.BaseData.queries.for_base_data import insert_position_goods, set_data_contacts
from project.BaseData.sqhemas.data import DataSiteDTO, DayScheduleDTO, DataDTO


async def create_tables():# TODO когда все сделаешь, удали
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    dataSite = DataSiteDTO(Mobile="11", Address="123", Mail="dns@gmail.com")
    schedule = []
    for i in range(7):
        schedule.append(DayScheduleDTO(day_id=i, From="12", To="16"))
    data = DataDTO(data_site=dataSite, schedule=schedule)
    await set_data_contacts(data)
    # descr = "Шестерня редуктора заднего стеклоочистителя ВАЗ 2114 Samara, 2121 Bronto, Urban, Рысь, (4x4) Фора, Нива. Деталь смоделирована по оригинальной и изготовлена на 3д принтере. Также на деталь есть гарантия! Возможна доставка транспортной компанией по всей России"
    # smth = "https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/Адаптер для датчика Audi 80 B4.png"
    # await insert_position_goods("Адаптер для датчика Audi 80/S2 B4", TypeService.Goods, TypeGoods.Auto, descr, "audi",
    #                       300, ["https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/%D0%90%D0%B4%D0%B0%D0%BF%D1%82%D0%B5%D1%80%20%D"
    #                            "0%B4%D0%BB%D1%8F%20%D0%B4%D0%B0%D1%82%D1%87%D0%B8%D0%BA%D0%B0%20Audi%2080%20B4.png", smth, smth], True)
    # await insert_position_goods("Ручка задней двери Pathfinder R51", TypeService.Goods, TypeGoods.Auto, descr, None,
    #                             850, ["https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/%D0%A0%D1%83%D1%87%D0%"
    #                                  "BA%D0%B0%20%D0%B7%D0%B0%D0%B4%D0%BD%D0%B5%D0%B9%20%D0%B4%D0%B2%D0%B5%D1%80%D0%B8%20Pathfinder%20R51.png", smth], True)
    # await insert_position_goods("Шестерня редуктора заднего стеклоочистителя 2114", TypeService.Goods, TypeGoods.Auto, descr, "lada",
    #                             450, ["https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/%D0%A8%D0%B5%D1%81%D1%82%D0%B5%D1%80%D0%BD%D"
    #                                  "1%8F%20%D1%80%D0%B5%D0%B4%D1%83%D0%BA%D1%82%D0%BE%D1%80%D0%B0%20%D0%B7%D0%B0%D0%B4%D0%BD%D0%B5%D0%B3%D0%BE%20%D"
    #                                  "1%81%D1%82%D0%B5%D0%BA%D0%BB%D0%BE%D0%BE%D1%87%D0%B8%D1%81%D1%82%D0%B8%D1%82%D0%B5%D0%BB%D1%8F%202114.png", smth, smth, smth],True)
    # await insert_position_goods("Шестерня стеклоподъемника LADA Priora/Chev Niva", TypeService.Goods, TypeGoods.Auto, descr, "LADA Priora/Chev Niva",
    #                             450, ["https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/%D0%A8%D0%B5%D1%81%D1%82%"
    #                                  "D0%B5%D1%80%D0%BD%D1%8F%20%D1%81%D1%82%D0%B5%D0%BA%D0%BB%D0%BE%D0%BF%D0%BE%D0%B4%D1%8A%D0%B5%D0%BC%D0%BD%D0%B8%D0%BA%D0%B0%20LADA%20PrioraChev%20Niva.png", smth],True)
    # await insert_position_goods("Заглушка ручки двери Mitsubishi", TypeService.Goods, TypeGoods.Auto, descr, "Mitsubishi",
    #                             250, ["https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/%D0%97%D0%B0%D0%B3%D0%BB%D"
    #                                  "1%83%D1%88%D0%BA%D0%B0%20%D1%80%D1%83%D1%87%D0%BA%D0%B8%20%D0%B4%D0%B2%D0%B5%D1%80%D0%B8%20Mitsubishi.png", smth],True)
    # await insert_position_goods("Хомут рулевого вала Nissan Qashqai", TypeService.Goods, TypeGoods.Moto, descr, "Nissan Qashqai",
    #                             1000, ["https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/%D0%A5%D0%BE%D0%BC%D1%83%D1%82%20%D1%80%D1%83%D0%BB%D0%B5%D0%B2%D0%BE%D0%B3%D0%BE%20%D0%B2%D0%B0%D0%BB%D0%B0%20Nissan%20Qashqai.png", smth],True)
    # await insert_position_goods("Creality K1", TypeService.Goods, TypeGoods.Printer, descr,
    #                             "Creality",
    #                             42000, ["https://42edf277-8b7c-4e04-93b8-58920975fd1d.selstorage.ru/printer.png"], True)