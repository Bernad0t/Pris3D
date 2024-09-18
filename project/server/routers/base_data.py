import json
from typing import Optional

from sqlalchemy.orm import Session
from typing_extensions import Annotated
from fastapi import APIRouter, Depends, UploadFile, Form, File
from fastapi.responses import FileResponse

from project.BaseData.Enums.for_models import TypeAutoParts, Catalog
from project.BaseData.Utils.token import verify_token_admin
from project.BaseData.sqhemas.data import GoodsServiceAddDTO, GoodsServiceDTO, DataSiteDTO, DataDTO
from project.BaseData.queries.for_base_data import insert_position_goods, update_position_goods, get_all_item_pictures, \
    get_item_by_id, get_session, upload_list_images, get_data_contacts, set_data_contacts, delete_position_goods, \
    get_marks, set_preview

from starlette import status
from starlette.responses import Response

from project.BaseData.queries.for_filters_catology import get_max_price, get_goods_by_filter
from project.exceptions import GoodsServices_ERROR
from s3_client import get_file_s3

router = APIRouter(
    prefix="/data",
    tags=["data"],
)


@router.get("/GetDataContacts")
async def get_data_contacts_router() -> DataDTO:
    return await get_data_contacts()


@router.post("/SetDataContacts")
async def set_data_contacts_router(token: Annotated[str, Depends(verify_token_admin)], data: DataDTO):
    await set_data_contacts(data)

@router.post("/insertData")
async def insert_files_router(token: Annotated[str, Depends(verify_token_admin)], files: list[UploadFile],
                              data: Annotated[str, Form()], response: Response, session: Session = Depends(get_session)):
    data_dict = json.loads(data)
    if data_dict["TypeGoods"]:
        data_dict["TypeGoods"] = TypeAutoParts(data_dict["TypeGoods"])
    data_orm = GoodsServiceAddDTO.model_validate(data_dict)
    try:
        good_id = await insert_position_goods(data_orm, files[0].filename, session)
        await upload_list_images(files, good_id, session, True)
        session.close()
    except GoodsServices_ERROR:
        response.status_code = status.HTTP_400_BAD_REQUEST

@router.post("/updateData")
async def update_router(token: Annotated[str, Depends(verify_token_admin)], data: Annotated[str, Form()],
                        images: Annotated[str, Form()],  files: list[UploadFile] = File(None),
                        session: Session = Depends(get_session)):
    data_dict = json.loads(data)
    images = json.loads(images)
    print(type(images), images, "iimaageess")
    if data_dict["TypeGoods"]:
        data_dict["TypeGoods"] = TypeAutoParts(data_dict["TypeGoods"])
    data_orm = GoodsServiceDTO.model_validate(data_dict)
    if files:
        await update_position_goods(data_orm, images, session)
        await upload_list_images(files, data_orm.id, session, True)
    else:
        await update_position_goods(data_orm, images, session, True)


@router.delete("/deleteData")
async def delete_router(token: Annotated[str, Depends(verify_token_admin)], id_item: int):
    await delete_position_goods(id_item)


@router.get("/catology/filterByCategory")
async def get_position_by_category(catalog: Catalog, biggerThan: float, lowerThan: float,mark: str, FilterSearch: str,
                                   type_good: TypeAutoParts | None = None):
    return await get_goods_by_filter(catalog, type_good, biggerThan, lowerThan, mark, FilterSearch)

@router.get("/getAllPictures")
async def get_all_pictures(id: int, response: Response):
    try:
        return await get_all_item_pictures(id)
    except GoodsServices_ERROR:
        response.status_code = status.HTTP_400_BAD_REQUEST

@router.get("/catology/getMaxPrice")
async def get_max_price_router():
    return await get_max_price()


@router.get("/getItemById")
async def get_position_by_id(id: int, response: Response):
    try:
        return await get_item_by_id(id)
    except GoodsServices_ERROR:
        response.status_code = status.HTTP_400_BAD_REQUEST


@router.get("/getMarks")
async def get_marks_router(catalog: Catalog):
    return await get_marks(catalog)


@router.get("/setPreview")
async def set_preview_router(token: Annotated[str, Depends(verify_token_admin)], id: int, name: str):
    await set_preview(id, name)
