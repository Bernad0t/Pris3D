from datetime import datetime, date

from pydantic import BaseModel, EmailStr

from project.BaseData.Enums.for_models import TypeService, ResultPurchase, UserStatus, TypeAutoParts, Catalog, \
    WayDeliveryEnum


class GoodsServiceDTO(BaseModel):
    id: int
    Name: str | None
    TypeService: TypeService | None
    Catalog: Catalog
    TypeGoods: TypeAutoParts | None
    Article: str | None
    Description: str | None
    Mark: str | None
    Price: float | None
    img: str


class GoodsServiceAddDTO(BaseModel):
    Name: str
    Catalog: Catalog
    TypeGoods: TypeAutoParts | None
    Article: str | None
    Description: str | None
    Mark: str | None
    Price: float


class BasketsDTO(BaseModel):
    id: int
    GoodsService_id: int
    Number: int | None


class OrderDTO(BaseModel):
    id: int
    Users_id: int
    ResultPurchase: ResultPurchase
    DatePayment: datetime | None
    DateReciept: datetime | None
    PriceDelivery: float
    TotalPrice: float
    Discount: float
    WayDelivery: WayDeliveryEnum | None


class OrderDTORel(OrderDTO):
    goods_in_basket: list["GoodsServiceDTO"]
    baskets: list["BasketsDTO"]


class TokensDTO(BaseModel):
    access_token: str
    refresh_token: str
    login: str


class DayScheduleDTO(BaseModel):
    day_id: int
    From: str
    To: str

class DataSiteDTO(BaseModel):
    Mobile: str
    Mail: EmailStr
    Address: str
    # Card: Mapped[str | None]

    # MondayStart: datetime | str
    # MondayEnd: datetime | str
    # TuesdayStart: datetime | str
    # TuesdayEnd: datetime | str
    # WednesdayStart: datetime | str
    # WednesdayEnd: datetime | str
    # ThursdayStart: datetime | str
    # ThursdayEnd: datetime | str
    # FridayStart: datetime | str
    # FridayEnd: datetime | str
    # SaturdayStart: datetime | str
    # SaturdayEnd: datetime | str
    # SundayStart: datetime | str
    # SundayEnd: datetime | str

class DataDTO(BaseModel):
    data_site: DataSiteDTO
    schedule: list[DayScheduleDTO]