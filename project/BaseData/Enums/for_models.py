import enum

class ResultPurchase(enum.Enum):
    delivering = "delivering"
    delivered = "delivered"
    taken = "taken"
    returned = "returned"


class TypeService(enum.Enum):
    Goods = "Goods"
    Service = "Service"


class UserStatus(enum.Enum):
    Admin = "Admin"
    User = "User"


class TypeGoods(enum.Enum):
    Auto = "Auto"
    Moto = "Moto"
    Printer = "Printer"