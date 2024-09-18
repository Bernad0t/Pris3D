import enum

class ResultPurchase(enum.Enum):
    delivering = "доставляется"
    delivered = "доставлено"
    taken = "забрано"
    returned = "возвращено"
    unpaid = "не оплачено"


class TypeService(enum.Enum):
    Goods = "Товар"
    Scanning = "Сканирование"
    Print3D = "3Д печать"


class UserStatus(enum.Enum):
    Admin = "Admin"
    User = "User"


class Catalog(enum.Enum):
    AutoParts = "Автозапчасти"
    Printer = "Принтеры"


class TypeAutoParts(enum.Enum):
    Auto = "Автомобиль"
    Moto = "Мотоцикл"
    Other = "Другое"


class SexEnum(enum.Enum):
    Male = "Мужской"
    Female = "Женский"
    Not_describe = ""


class WayDeliveryEnum(enum.Enum):
    delivery = "доставка"
    take = "самовывоз"