from datetime import datetime

from pydantic import BaseModel

from project.BaseData.Enums.for_models import TypeService, ResultPurchase, UserStatus, TypeGoods


class GoodsServiceDTO(BaseModel):
    id: int
    Name: str | None
    TypeService: TypeService | None
    TypeGoods : TypeGoods | None
    Price: int | None
    img: str


class GoodsServiceRelDTO(GoodsServiceDTO):
    order_user: list["OrderAddDTO"]


class GoodsServiceAddDTO(BaseModel):
    Name: str
    TypeService: TypeService
    TypeGoods: TypeGoods | None
    Price: int
    img: str


class OrderAddDTO(BaseModel):
    Users_id: int
    DatePayment: datetime | None
    DateReciept: datetime | None
    ResultPurchase: ResultPurchase | None
    TotalPrice: float | None


class BasketsAddDTO(BaseModel):
    GoodsService_id: int
    Number: int | None




# class DataSiteDTO(BaseModel):
#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     Mobile: Mapped[str | None]
#     Gmail: Mapped[str | None]
#     Address: Mapped[str | None]
#     Card: Mapped[str | None]