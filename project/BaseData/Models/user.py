import datetime
from typing import Optional
from sqlalchemy import ForeignKey
from project.BaseData.engine import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from project.BaseData.Enums.for_models import UserStatus, SexEnum
class UsersOrm(Base):
    __tablename__ = "Users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Login: Mapped[str]
    Password: Mapped[str] = mapped_column()
    Gmail: Mapped[Optional[str]] = None
    Mobile: Mapped[str | None] = None
    Card: Mapped[str | None] = None
    FullName: Mapped[str | None] = None
    DateBirthday: Mapped[datetime.date | None] = None
    Sex: Mapped[str | None] = None
    Status: Mapped[UserStatus] # админ или юзер

    user_address: Mapped[list["AddressOrm"]] = relationship(
        back_populates="address_user",
        # secondary="UsersAddress"
    )


class UsersAddressOrm(Base):
    __tablename__ = "UsersAddress"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    UserId: Mapped[int] = mapped_column(ForeignKey("Users.id", ondelete="CASCADE"))
    AddressId: Mapped[int] = mapped_column(ForeignKey("Address.id", ondelete="CASCADE"))


class AddressOrm(Base):
    __tablename__ = "Address"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    User_id: Mapped[int] = mapped_column(ForeignKey("Users.id", ondelete="CASCADE"))
    City: Mapped[str]
    Street: Mapped[str]
    Home: Mapped[str]
    Selected: Mapped[bool]

    address_user: Mapped["UsersOrm"] = relationship(
        back_populates="user_address",
        # secondary="UsersAddress"
    )


class RefreshTokenOrm(Base):
    __tablename__ = "RefreshToken"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    User_id: Mapped[int] = mapped_column(ForeignKey("Users.id", ondelete="CASCADE"))
    Token: Mapped[str]

class UsersFavoriteOrm(Base):
    __tablename__ = "UsersFavorite"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Favorite_id: Mapped[int] = mapped_column(ForeignKey("GoodsService.id", ondelete="CASCADE"))
    User_id: Mapped[int] = mapped_column(ForeignKey("Users.id", ondelete="CASCADE"))
