from typing import Union

from starlette.middleware.cors import CORSMiddleware

from project.server.routers import authorization, user, purchase, base_data, send_mail
from fastapi import FastAPI

from project.BaseData.engine import async_engine
from project.BaseData.queries.create_table_tmp import create_tables
from project.BaseData.queries.for_base_data import test, insert_position_goods

app = FastAPI(
# title="My App",
#     description="Description of my app.",
#     version="1.0",
#     docs_url='/docs',
#     openapi_url='/openapi.json', # This line solved my issue, in my case it was a lambda function
#     redoc_url=None
)

origins = ['http://localhost:5173', 'http://127.0.0.1:8000',
           'https://localhost:5173', 'https://127.0.0.1:8000', "http://localhost", "http://localhost:8080",]
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173', 'http://127.0.0.1:8000',
           'https://localhost:5173', 'https://127.0.0.1:8000', "http://localhost", "http://localhost:8080",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(base_data.router)
app.include_router(purchase.router)
app.include_router(authorization.router)
app.include_router(user.router)
app.include_router(send_mail.router)

@app.on_event("startup")
async def startup():
    # когда приложение запускается устанавливаем соединение с БД
    #async_engine.connect()
    print("start")
    # await create_tables() # TODO потом удали


# @app.on_event("shutdown")
# async def shutdown():
#     # когда приложение останавливается разрываем соединение с БД
#     async_engine.disconnect()

