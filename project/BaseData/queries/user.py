from datetime import datetime
from sqlalchemy import func, select, and_, update, delete
from sqlalchemy.orm import selectinload

from project.BaseData.Models.purchase import GoodsServiceOrm
from project.BaseData.Models.user import RefreshTokenOrm, UsersOrm, UsersFavoriteOrm, AddressOrm
from project.BaseData.Utils.authorization import create_access_token
from project.BaseData.engine import async_session_factory

from config import SECRET_KEY_TOKEN, ALGORITHM
from jose import jwt, exceptions

from project.BaseData.sqhemas.data import GoodsServiceDTO
from project.BaseData.sqhemas.user import GetUserContactsDTO, AddressContactsDTO, AddAddressContactsDTO
from project.exceptions import ADDRESS_ERROR


async def get_user_by_id(id: int) -> UsersOrm:
    async with async_session_factory() as session:
        query = (
            select(UsersOrm)
            .where(UsersOrm.id == id)
            .options(selectinload(UsersOrm.user_address))
        )
        result = await session.execute(query)
        return result.scalars().first()


async def get_selected_address(id: int) -> AddressOrm:
    async with async_session_factory() as session:
        query = (
            select(AddressOrm)
            .where(AddressOrm.id == id)
        )
        result = await session.execute(query)
        return result.scalars().first()

async def get_refresh_token(id: int):
    async with async_session_factory() as session:
        query = (
            select(RefreshTokenOrm.Token)
            .where(RefreshTokenOrm.User_id == id)
        )
        result = await session.execute(query)
        return result.scalars().first()  # TODO доставай из кук


async def get_access_token(refresh_token: str):
    async with async_session_factory() as session:
        decoded_token = jwt.decode(refresh_token, SECRET_KEY_TOKEN, ALGORITHM)
        dict_for_token = {"id": decoded_token["id"], "Status": decoded_token["Status"]}
        return create_access_token(dict_for_token)



async def get_user_contact(token: dict):
    async with async_session_factory() as session:
        print(token["id"])
        query = (
            select(UsersOrm)
            .where(UsersOrm.id == token["id"])
        )
        result = await session.execute(query)
        userOrm = result.scalars().first()
        alertDict = {"Gmail": userOrm.Gmail, "Mobile": userOrm.Mobile, "FullName": userOrm.FullName,
                     "DateBirthday": userOrm.DateBirthday, "Sex": userOrm.Sex}
        return GetUserContactsDTO.model_validate(alertDict)

async def update_user_contact(token: dict, data: GetUserContactsDTO):
    async with async_session_factory() as session:
        query = (
            update(UsersOrm)
            .where(UsersOrm.id == token["id"])
            .values(Gmail=data.Gmail, Mobile=data.Mobile, Sex=data.Sex, FullName=data.FullName, DateBirthday=data.DateBirthday)
        )
        await session.execute(query)
        await session.commit()


async def get_user_favorite(token: dict):
    async with async_session_factory() as session:
        query = (
            select(GoodsServiceOrm)
            .where(GoodsServiceOrm.id.in_(
                select(UsersFavoriteOrm.Favorite_id)
                .where(UsersFavoriteOrm.User_id == token["id"])
            ))
        )
        result = await session.execute(query)
        cards = result.scalars().all()
        return [GoodsServiceDTO.model_validate(row, from_attributes=True) for row in cards]

async def set_user_favorite(token: dict, card_id: int):
    async with async_session_factory() as session:
        new_favorite = UsersFavoriteOrm(User_id=token["id"], Favorite_id=card_id)
        session.add(new_favorite)
        await session.commit()


async def delete_user_favorite(token: dict, card_id: int):
    async with async_session_factory() as session:
        query = (
            delete(UsersFavoriteOrm)
            .where(and_(UsersFavoriteOrm.User_id == token["id"], UsersFavoriteOrm.Favorite_id == card_id))
        )
        result = await session.execute(query)
        await session.commit()


async def set_address(data: AddAddressContactsDTO, token: dict):
    async with async_session_factory() as session:
        query = (
            update(UsersOrm)
            .where(UsersOrm.id == token["id"])
            .values({"Gmail": data.Mail, "Mobile": data.Mobile})
        )
        await session.execute(query)
        new_address = AddressOrm(City=data.City, Home=data.Home, Street=data.Street, Selected=data.Selected,
                                 User_id=token["id"])
        session.add(new_address)
        await session.commit()


async def update_address(data: AddressContactsDTO, token: dict):
    async with async_session_factory() as session:
        query = (
            update(UsersOrm)
            .where(UsersOrm.id == token["id"])
            .values({"Gmail": data.Mail, "Mobile": data.Mobile})
        )
        await session.execute(query)
        query = (
            update(AddressOrm)
            .where(AddressOrm.id == data.id)
            .values({"City": data.City, "Street": data.Street, "Home": data.Home, "Selected": data.Selected})
        )
        await session.execute(query)
        await session.commit()


async def get_address(token: dict):
    async with async_session_factory() as session:
        query = (
            select(UsersOrm)
            .where(UsersOrm.id == token["id"])
            .options(selectinload(UsersOrm.user_address))
        )
        user = await session.execute(query)
        user = user.unique().scalars().first()
        addresses = user.user_address
        res = []
        for addr in addresses:
            res.append({"id": addr.id, "Mail": user.Gmail, "Mobile": user.Mobile, "City": addr.City, "Street": addr.Street,
                        "Home": addr.Home, "Selected": addr.Selected})
        if len(res) == 0:
            print(addresses, "user_address")
            raise ADDRESS_ERROR
        return [AddressContactsDTO.model_validate(row) for row in res]


async def delete_address(data: AddressContactsDTO, token: dict):
    async with async_session_factory() as session:
        query = (
            delete(AddressOrm)
            .where(data.id == AddressOrm.id)
        )
        await session.execute(query)
        await session.commit()


async def exit_acc(token: dict):
    async with async_session_factory() as session:
        query = (
            delete(RefreshTokenOrm)
            .where(RefreshTokenOrm.User_id == token["id"])
        )
        await session.execute(query)
        await session.commit()