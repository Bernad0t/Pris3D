from fastapi import Depends, APIRouter, Cookie

from starlette.responses import Response
from starlette import status

from typing_extensions import Annotated

from project.BaseData.Utils.token import verify_token
from project.BaseData.queries.authorization import Register, Login, find_user_by_token
from project.BaseData.sqhemas.authorization import UserCreate
from project.exceptions import AUTHORIZATION_ERROR, TOKEN_VALIDATE

router = APIRouter(
    prefix="/auth",
    tags=["data"],
)


@router.get("/isActive")
async def active_user(token: Annotated[str, Depends(verify_token)]):
    try:
        await find_user_by_token(token)
        return True
    except AUTHORIZATION_ERROR:
        return False


@router.post("/sign-up")
async def create_user(user: UserCreate, response: Response):
    try:
        dict_tokens = await Register(user.login, user.password)
        # response.set_cookie(key="refresh_token", value=refresh_token, max_age=2000000, secure=False, httponly=False)
        return dict_tokens
    except AUTHORIZATION_ERROR:
        response.status_code = status.HTTP_400_BAD_REQUEST
    except TOKEN_VALIDATE:
        return

@router.post("/sign-in")
async def login_user(user: UserCreate, response: Response):
    try:
        dict_tokens = await Login(user.login, user.password)
        # response.set_cookie(key="refresh_token", value=refresh_token)
        return dict_tokens
    except AUTHORIZATION_ERROR:
        response.status_code = status.HTTP_400_BAD_REQUEST
    except TOKEN_VALIDATE:
        return