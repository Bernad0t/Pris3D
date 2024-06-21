from fastapi import APIRouter
from project.BaseData.Models.sqhemas import OrderAddDTO, BasketsAddDTO
from project.BaseData.queries.for_user import create_order, collect_basket

router = APIRouter(
    prefix="/purchase",
    tags=["purchase"],
)


@router.post("/{user_id}/{order_id}")
async def insert_router(order: OrderAddDTO, baskets: list[BasketsAddDTO]):
    # мб crt_ord и crt_bask объедингить, где буду проверять на сущ order что позволит хранить корзину????
    order_id = await create_order(order.Users_id, order.DatePayment, order.DateReciept, order.ResultPurchase, order.TotalPrice)
    commit = False
    for i in range(len(baskets)):
        if i == len(baskets) - 1:
            commit = True
        await collect_basket(order_id, baskets[i].GoodsService_id, baskets[i].GoodsService_id, commit)