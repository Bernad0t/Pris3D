from sqlalchemy import func, select, and_, update

from project.BaseData.Enums.for_models import UserStatus
from project.BaseData.Models.user import UsersOrm, RefreshTokenOrm
from project.BaseData.Utils.authorization import create_refresh_token, create_access_token, get_hashed_password, \
    check_password
from project.BaseData.engine import async_session_factory
from project.BaseData.Models.purchase import GoodsServiceOrm
from project.BaseData.sqhemas.data import TokensDTO
from project.exceptions import AUTHORIZATION_ERROR


async def Register(login: str, password: str):
    async with async_session_factory() as session:
        query = (
            select(UsersOrm)
            .where(login == UsersOrm.Login)
        )
        result = await session.execute(query)
        result = result.scalars().first()
        if result:
            raise AUTHORIZATION_ERROR
        hashed_password = get_hashed_password(password)
        new_user = UsersOrm(Login=login, Password=hashed_password, Gmail=None, Mobile=None, Card=None, Status=UserStatus.User)
        session.add(new_user)
        await session.flush()
        dict_for_token = {'id': new_user.id, 'Status': new_user.Status.value}
        get_refresh_token = create_refresh_token(dict_for_token)
        refresh_token = RefreshTokenOrm(User_id=new_user.id, Token=get_refresh_token)
        session.add(refresh_token)
        await session.commit()
        return TokensDTO.model_validate({"access_token": create_access_token(dict_for_token), "refresh_token": get_refresh_token, "login": login})
        # return {"access_token": create_access_token(dict_for_token), "refresh_token": get_refresh_token}


async def Login(login: str, password: str):
    async with async_session_factory() as session:
        query = (
            select(UsersOrm)
            .where(UsersOrm.Login == login)
        )
        result = await session.execute(query)
        result = result.scalars().first()
        if not result:
            raise AUTHORIZATION_ERROR
        if not check_password(password, result.Password):
            print("fdfd")
            raise AUTHORIZATION_ERROR
        dict_for_token = {'id': result.id, 'Status': result.Status.value}
        refresh_token = create_refresh_token(dict_for_token)
        query = (
            update(RefreshTokenOrm)
            .where(RefreshTokenOrm.User_id == result.id)
            .values(Token=refresh_token)
        )
        await session.execute(query)
        await session.commit()
        return TokensDTO.model_validate({"access_token": create_access_token(dict_for_token), "refresh_token": refresh_token, "login": login})
        # return {"access_token": create_access_token(dict_for_token), "refresh_token": refresh_token}


async def find_user_by_token(token: dict):
    async with async_session_factory() as session:
        query = (
            select(UsersOrm)
            .where(UsersOrm.id == token["id"])
        )
        result = await session.execute(query)
        result = result.scalars().first()
        if not result:
            raise AUTHORIZATION_ERROR

