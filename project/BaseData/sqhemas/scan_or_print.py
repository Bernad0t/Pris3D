from pydantic import BaseModel, EmailStr

class DescriptionOrder(BaseModel):
    description: str
    mobile: str
    mail: EmailStr
    name: str