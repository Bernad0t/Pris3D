import datetime
from typing import Optional
from pydantic import EmailStr
from sqlalchemy import ForeignKey
from project.BaseData.engine import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from project.BaseData.Enums.for_models import ResultPurchase, TypeService, TypeAutoParts, Catalog, WayDeliveryEnum
from ..Models.user import UsersOrm


class GoodsServiceOrm(Base):
    __tablename__ = "GoodsService"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Name: Mapped[str]
    TypeService: Mapped[TypeService] # услуга(3д печать) или товар
    Catalog: Mapped[Catalog]
    TypeGoods: Mapped[TypeAutoParts | None] # авто или мото или ничего (если принтер)
    Article: Mapped[str | None]
    Description: Mapped[str | None]
    Mark: Mapped[str | None]
    Price: Mapped[float]
    img: Mapped[str]

    order_user: Mapped[list["OrderOrm"]] = relationship(
        back_populates="goods_in_basket",
        secondary="Baskets"
    )


class OrderOrm(Base): #  по результату найду все корзины
    __tablename__ = "Order"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Users_id: Mapped[int] = mapped_column(ForeignKey("Users.id", ondelete="SET NULL"))
    DatePayment: Mapped[datetime.date | None]
    DateReciept: Mapped[datetime.date | None]
    ResultPurchase: Mapped[ResultPurchase]
    Discount: Mapped[float] = 0
    PriceDelivery: Mapped[float] = 0
    TotalPrice: Mapped[float]
    WayDelivery: Mapped[WayDeliveryEnum | None]

    goods_in_basket: Mapped[list["GoodsServiceOrm"]] = relationship(
        back_populates="order_user",
        secondary="Baskets"
    )
    baskets: Mapped[list["BasketsOrm"]] = relationship(
        back_populates="order",
        viewonly=True
    )
     #  мб добавить еще корзины

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

    order: Mapped["OrderOrm"] = relationship(
        back_populates="baskets",
        viewonly=True
    )