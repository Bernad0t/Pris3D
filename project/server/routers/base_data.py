from fastapi import APIRouter

from project.BaseData.Enums.for_models import TypeGoods
from project.BaseData.Models.sqhemas import GoodsServiceAddDTO, GoodsServiceDTO
from project.BaseData.queries.for_base_data import insert_position_goods, update_position_goods

from starlette import status
from starlette.responses import Response

from project.BaseData.queries.for_filters_catology import get_max_price, get_goods_by_filter

router = APIRouter(
    prefix="/data",
    tags=["data"],
)

@router.post("/insert")
async def insert_router(data: GoodsServiceAddDTO, response: Response):
    status_insert = await insert_position_goods(data.Name, data.TypeService, data.TypeGoods, data.Price, True)
    if status_insert == 1:
        response.status_code = status.HTTP_409_CONFLICT
    else:
        response.status_code = status.HTTP_200_OK


@router.post("/update/{data_id}")
async def update_router(data: GoodsServiceDTO, response: Response):
    status_update = await update_position_goods(data.id, data.Name, data.TypeService, data.TypeGoods, data.Price, True)
    if status_update == 1:
        response.status_code = status.HTTP_404_NOT_FOUND
    else:
        response.status_code = status.HTTP_200_OK


@router.get("/catology/filterByCategory")
async def get_position_by_category(data: TypeGoods, biggerThan: float, lowerThan: float, FilterSearch: str):
    return await get_goods_by_filter(data, biggerThan, lowerThan, FilterSearch)


# @router.get("/catology/filterByPrice")
# async def get_position_by_price(biggerThan: float | None, lowerThan: float | None):
#     return await get_goods_by_price(biggerThan, lowerThan)


@router.get("/catology/getMaxPrice")
async def get_position_by_category():
    return await get_max_price()