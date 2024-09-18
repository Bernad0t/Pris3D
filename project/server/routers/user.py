from typing import Optional

from fastapi import Depends, APIRouter, Request, Header
from jose import jwt, exceptions
from starlette.responses import Response
from starlette import status
import json
from typing_extensions import Annotated

from project.BaseData.Utils.token import verify_token
from project.BaseData.queries.user import get_user_contact, get_access_token, update_user_contact, get_user_favorite, \
    set_user_favorite, delete_user_favorite, set_address, get_address, delete_address, update_address
from project.BaseData.sqhemas.user import GetUserContactsDTO, UpdateUserContactsDTO, AddressContactsDTO, \
    AddAddressContactsDTO
from project.exceptions import ADDRESS_ERROR

router = APIRouter(
    prefix="/accaunt",
    tags=["users"],
)

@router.get("/getContacts")
async def get_contacts(token: Annotated[str, Depends(verify_token)], response: Response):
    try:
        return await get_user_contact(token)
    except:
        response.status_code = status.HTTP_409_CONFLICT


@router.get("/getAccessToken")
async def get_access_token_to_front(refresh_token: str, response: Response):
    try:
        return await get_access_token(refresh_token)
    except exceptions.ExpiredSignatureError:
        response.status_code = status.HTTP_401_UNAUTHORIZED
    except:
        response.status_code = status.HTTP_409_CONFLICT

@router.post("/SendContacts")
async def update_contacts(data: UpdateUserContactsDTO):
    try:
        token = verify_token(data.access_token)
        await update_user_contact(token, data)
    except:
        return



@router.get("/GetFavorites")
async def get_favorites(token: Annotated[str, Depends(verify_token)]):
    favCards = await get_user_favorite(token)
    return favCards

@router.get("/setFavorites")
async def set_favorites(token: Annotated[str, Depends(verify_token)], card_id: int):
    await set_user_favorite(token, card_id)

@router.get("/deleteFavorites")
async def delete_favorites(token: Annotated[str, Depends(verify_token)], card_id: int):
    await delete_user_favorite(token, card_id)


@router.get("/getStatus")
async def get_status_router(token: Annotated[str, Depends(verify_token)]):
    print(token)
    return token["Status"]


@router.post("/setAddress")
async def set_address_router(token: Annotated[str, Depends(verify_token)], data: AddAddressContactsDTO):
    await set_address(data, token)


@router.post("/updateAddress")
async def update_address_router(token: Annotated[str, Depends(verify_token)], data: AddressContactsDTO):
    await update_address(data, token)


@router.get("/getAddress")
async def get_address_router(token: Annotated[str, Depends(verify_token)], response: Response):
    try:
        return await get_address(token)
    except ADDRESS_ERROR:
        response.status_code = status.HTTP_409_CONFLICT


@router.post("/deleteAddress")
async def delete_address_router(token: Annotated[str, Depends(verify_token)], data: AddressContactsDTO):
    await delete_address(data, token)