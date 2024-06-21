import datetime
from typing import Optional
from pydantic import EmailStr
from sqlalchemy import ForeignKey
from project.BaseData.engine import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from project.BaseData.Enums.for_models import ResultPurchase, UserStatus, TypeService, TypeGoods


class DataSiteOrm(Base):
    __tablename__ = "DataSite"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Mobile: Mapped[str | None]
    Gmail: Mapped[Optional[str]]
    Address: Mapped[str | None]
    Card: Mapped[str | None]


class UsersOrm(Base):
    __tablename__ = "Users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Login: Mapped[str]
    Password: Mapped[str]
    Address: Mapped[str | None]
    Gmail: Mapped[Optional[str]]
    Mobile: Mapped[str | None]
    Card: Mapped[str | None]
    Status: Mapped[UserStatus] # админ или юзер


class GoodsServiceOrm(Base):
    __tablename__ = "GoodsService"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Name: Mapped[str]
    TypeService: Mapped[TypeService] # услуга(3д печать) или товар
    TypeGoods: Mapped[TypeGoods | None] # авто или мото или 3д принтер или ничего (если услуга)
    Price: Mapped[int]
    img: Mapped[str]
    # мб стоит сделать марку????
    order_user: Mapped[list["OrderOrm"]] = relationship(
        back_populates="goods",
        secondary="Baskets"
    )


class OrderOrm(Base):
    __tablename__ = "Order"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Users_id: Mapped[int] = mapped_column(ForeignKey("Users.id", ondelete="SET NULL"))
    DatePayment: Mapped[datetime.date]
    DateReciept: Mapped[datetime.date]
    ResultPurchase: Mapped[ResultPurchase]
    TotalPrice: Mapped[float]

    goods: Mapped[list["GoodsServiceOrm"]] = relationship(
        back_populates="order_user",
        secondary="Baskets"
    )


class ReviewOrm(Base):
    __tablename__ = "Review"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Score: Mapped[int]
    Describe: Mapped[str | None]


class BasketsOrm(Base):
    __tablename__ = "Baskets"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Order_id: Mapped[int] = mapped_column(ForeignKey("Order.id", ondelete="SET NULL"))
    GoodsService_id: Mapped[int] = mapped_column(ForeignKey("GoodsService.id", ondelete="SET NULL"))
    Number: Mapped[int | None]
    Review_id: Mapped[int | None] = mapped_column(ForeignKey("Review.id", ondelete="SET NULL"))