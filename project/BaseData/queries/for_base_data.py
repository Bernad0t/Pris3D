from fastapi import UploadFile
from sqlalchemy import delete, select, and_, update
from sqlalchemy.orm import Session

from project.BaseData.engine import async_session_factory
from project.BaseData.Models.purchase import GoodsServiceOrm
from s3_client import upload_file, get_file_source
from ..Enums.for_models import TypeService, TypeAutoParts, Catalog
from ..Models.goods import PicturesGoodsOrm
from ..Models.site_data import DataSiteOrm, DayScheduleOrm
from ..sqhemas.data import GoodsServiceDTO, GoodsServiceAddDTO, DataSiteDTO, DataDTO, DayScheduleDTO
from ...exceptions import GoodsServices_ERROR


async def get_session():
    session = async_session_factory()
    try:
        yield session
    finally:
       await session.close()


async def get_data_contacts():
    async with async_session_factory() as session:
        query = (
            select(DataSiteOrm)
        )
        result = await session.execute(query)
        result = result.scalars().first()
        data_site = DataSiteDTO.model_validate(result, from_attributes=True)
        query = (
            select(DayScheduleOrm)
        )
        result = await session.execute(query)
        result = result.scalars().all()
        schedule = []
        for sch in result:
            schedule.append(DayScheduleDTO.model_validate(sch, from_attributes=True))
        return DataDTO.model_validate({"data_site": data_site, "schedule": schedule})


async def set_data_contacts(data: DataDTO):
    async with async_session_factory() as session:
        query = select(DataSiteOrm)
        result = await session.execute(query)
        result = result.scalars().first()
        if not result:
            await create_data_contact(session, data)
            return
        query = (
            update(DataSiteOrm)
            .values(**data.data_site.dict())
        )
        await session.execute(query)
        for schedule in data.schedule:
            query = (
                update(DayScheduleOrm)
                .where(DayScheduleOrm.day_id == schedule.day_id)
                .values(**schedule.dict())
            )
            await session.execute(query)
        await session.commit()


async def create_data_contact(session: Session, data: DataDTO):
    new_data = DataSiteOrm(**data.data_site.dict())
    for schedule in data.schedule:
        new_schedule = DayScheduleOrm(**schedule.dict())
        session.add(new_schedule)
    session.add(new_data)
    await session.commit()

async def insert_position_goods(Good: GoodsServiceAddDTO, img_name: str, session: Session, sess_commit: bool = False):
    good = GoodsServiceOrm(**Good.dict(), img=get_file_source(img_name), TypeService=TypeService.Goods)
    # query = (
    #     select(GoodsServiceOrm)
    #     .where(and_(GoodsServiceOrm.Name == Good.Name, GoodsServiceOrm.Mark == Good.Mark))
    # )
    # result = await session.execute(query)
    # result = result.scalars().all()
    # if len(result) != 0:
    #     raise GoodsServices_ERROR
    session.add(good)
    await session.flush()

    good_id = good.id

    if sess_commit:
        await session.commit()
    return good_id


async def upload_list_images(images_file: list[UploadFile], good_id: int, session: Session, sess_commit: bool = False):
    for img in images_file:
        await upload_file(img.file, img.filename) #  TODO по filename еправильно, создай уникально по good_id + марке или хз как, а так же сдеай счетчик и добавь туда
        new_img = PicturesGoodsOrm(Good_id=good_id, Source=get_file_source(img.filename))
        session.add(new_img)
    if sess_commit:
        await session.commit()



async def get_all_item_pictures(id: int):
    async with async_session_factory() as session:
        query = (
            select(GoodsServiceOrm)
            .where(GoodsServiceOrm.id == id)
        )
        result = await session.execute(query)
        result = result.scalars().all()
        if len(result) == 0:
            raise GoodsServices_ERROR
        query = (
            select(PicturesGoodsOrm)
            .where(PicturesGoodsOrm.Good_id == id)
        )
        result = await session.execute(query)
        result = result.scalars().all()
        return [row.Source for row in result]

async def update_position_goods(data: GoodsServiceDTO, images: list[str], session: Session, commit: bool = False): #  TODO удаляй из s3
    query = (
        update(GoodsServiceOrm)
        .where(GoodsServiceOrm.id == data.id)
        .values(**data.dict())
    )
    await session.execute(query)
    query = (
        delete(PicturesGoodsOrm)
        .where(and_(PicturesGoodsOrm.Good_id == data.id, PicturesGoodsOrm.Source.not_in(images)))
    )
    await session.execute(query)
    if commit:
        await session.commit()


async def delete_position_goods(id_item: int): #  TODO удаляй из s3
    async with async_session_factory() as session:
        query = (
            delete(GoodsServiceOrm)
            .where(GoodsServiceOrm.id == id_item)
        )
        await session.execute(query)
        await session.commit()


async def get_item_by_id(id: int):
    async with async_session_factory() as session:
        query = (
            select(GoodsServiceOrm)
            .where(GoodsServiceOrm.id == id)
        )
        result = await session.execute(query)
        result = result.scalars().first()
        return GoodsServiceDTO.model_validate(result, from_attributes=True)


async def test():
    async with async_session_factory() as session:
        query = select(GoodsServiceOrm)
        result = await session.execute(query)
        result = result.scalars().first()
        return [result.id, result.Name, result.TypeService, result.Number, result.Price]


async def get_marks(catalog: Catalog):
    async with async_session_factory() as session:
        query = (
            select(GoodsServiceOrm.Mark)
            .where(GoodsServiceOrm.Catalog == catalog)
            .group_by(GoodsServiceOrm.Mark)
        )
        result = await session.execute(query)
        result = result.scalars().all()
        return [row for row in result]


async def set_preview(id: int, source: str):
    async with async_session_factory() as session:
        query = (
            update(GoodsServiceOrm.img)
            .where(GoodsServiceOrm.id == id)
            .values(source)
        )
        await session.execute(query)