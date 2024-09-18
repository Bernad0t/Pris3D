from fastapi import APIRouter

from config import send_message

router = APIRouter(
    prefix="/mail",
    tags=["mail"],
)

@router.get("/sendMailTest")
async def get_data_contacts_router():
    await send_message("test", "theme", "250918vesnadns@gmail.com")
