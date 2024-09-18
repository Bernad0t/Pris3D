import datetime
from pydantic import BaseModel, UUID4

from project.BaseData.Enums.for_models import UserStatus


class UserCreate(BaseModel):
    """ Проверяет sign-up запрос """
    login: str
    password: str


class UserBase(BaseModel):
    """ Формирует тело ответа с деталями пользователя """
    id: int
    Address: list[str] | None
    Gmail: str | None
    Mobile: str | None
    Status: UserStatus

