import datetime
from typing import Optional
from pydantic import EmailStr
from sqlalchemy import ForeignKey
from project.BaseData.engine import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from project.BaseData.Enums.for_models import ResultPurchase, TypeService, TypeAutoParts
from ..Models.purchase import GoodsServiceOrm

class PicturesGoodsOrm(Base):
    __tablename__ = "PicturesGoods"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Good_id: Mapped[int] = mapped_column(ForeignKey("GoodsService.id", ondelete="CASCADE"))
    Source: Mapped[str]