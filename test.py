import asyncio
from project.BaseData.queries.authorization import Register
# from project.BaseData.queries.create_table_tmp import create_tables
from project.BaseData.queries.user import get_address


async def start():
    # await create_tables()
    # token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiU3RhdHVzIjoiVXNlciIsImV4cCI6MTcyMDkxODg0MH0.G-NbX9QEL9suQ7jVuE0U133-cGMmhHlkJvJ5o5vTgcw"
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
    tokens = await Register("string", "string")
    # token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiU3RhdHVzIjoiVXNlciIsImV4cCI6MTcyMTA3ODI0OX0.IzPS4mPSLQsRqQQPxUzQkgboxuILbeUh42geGYr1uaQ"
    # await Login("string", "string")
    # await add_to_basket(jwt.decode(tokens.access_token, SECRET_KEY_TOKEN, ALGORITHM), 2, 1)
    # await add_to_basket(jwt.decode(tokens.access_token, SECRET_KEY_TOKEN, ALGORITHM), 2, 0)
    # await get_baskets(jwt.decode(tokens.access_token, SECRET_KEY_TOKEN, ALGORITHM))
    await get_address(tokens.access_token)
    # res = await get_user_favorite(jwt.decode(tokens.access_token, SECRET_KEY_TOKEN, ALGORITHM))
    # await find_user_by_token(jwt.decode(token, SECRET_KEY_TOKEN, ALGORITHM))
    # print(res)

asyncio.run(start())