import datetime

from project.BaseData.engine import Base
from sqlalchemy.orm import Mapped, mapped_column

class DayScheduleOrm(Base):
    __tablename__ = "DaySchedule"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    day_id: Mapped[int]
    From: Mapped[str]
    To: Mapped[str]
class DataSiteOrm(Base):
    __tablename__ = "DataSite"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    Mobile: Mapped[str | None]
    Address: Mapped[str | None]
    Mail: Mapped[str | None]

    #  schedule
    # MondayStart: Mapped[str]
    # MondayEnd: Mapped[str]
    # TuesdayStart: Mapped[str]
    # TuesdayEnd: Mapped[str]
    # WednesdayStart: Mapped[str]
    # WednesdayEnd: Mapped[str]
    # ThursdayStart: Mapped[str]
    # ThursdayEnd: Mapped[str]
    # FridayStart: Mapped[str]
    # FridayEnd: Mapped[str]
    # SaturdayStart: Mapped[str]
    # SaturdayEnd: Mapped[str]
    # SundayStart: Mapped[str]
    # SundayEnd: Mapped[str]