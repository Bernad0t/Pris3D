from fastapi import HTTPException
from jose import jwt, exceptions

from config import SECRET_KEY_TOKEN, ALGORITHM

from starlette.responses import Response

from project.BaseData.Enums.for_models import UserStatus


def verify_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY_TOKEN, ALGORITHM)
    except exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=410, detail="X-Token header invalid")
    except:
        raise HTTPException(status_code=409, detail="X-Token header invalid")

def verify_token_admin(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, SECRET_KEY_TOKEN, ALGORITHM)
        if decoded_token["Status"] == UserStatus.Admin.value: #  TODO заменить на admin
            return jwt.decode(token, SECRET_KEY_TOKEN, ALGORITHM)
        else:
            raise HTTPException(status_code=409, detail="X-Token header invalid")
    except exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=410, detail="X-Token header invalid")
    except:
        raise HTTPException(status_code=409, detail="X-Token header invalid")