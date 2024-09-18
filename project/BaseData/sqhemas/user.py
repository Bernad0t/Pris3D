import datetime

from pydantic import BaseModel, EmailStr

from ..Enums.for_models import SexEnum


class GetUserBase(BaseModel):
    access_token: str

class GetUserContactsDTO(BaseModel):
    Gmail: EmailStr | None
    Mobile: str | None
    FullName: str | None
    DateBirthday: datetime.date | None | str
    Sex: SexEnum | None | str


class UpdateUserContactsDTO(GetUserBase, GetUserContactsDTO):
    pass


class AddAddressContactsDTO(BaseModel):
    City: str
    Street: str
    Home: str
    Mobile: str
    Mail: EmailStr
    Selected: bool

class AddressContactsDTO(AddAddressContactsDTO):
    id: int
