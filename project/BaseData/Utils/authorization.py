from jose import jwt
from datetime import datetime, timedelta
import bcrypt

from config import SECRET_KEY_TOKEN, ALGORITHM, EXPIRE_REFRESH_TOKEN, EXPIRE_ACCESS_TOKEN


def create_access_token(data: dict):# лучше по id будет искать чем по токену. так быстрее
    to_encode = data.copy()

    # expire time of the token
    expire = datetime.utcnow() + timedelta(minutes=EXPIRE_ACCESS_TOKEN)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY_TOKEN, ALGORITHM)

    # return the generated token
    return encoded_jwt


def create_refresh_token(data: dict):
    to_encode = data.copy()

    # expire time of the token
    expire = datetime.utcnow() + timedelta(minutes=EXPIRE_REFRESH_TOKEN)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY_TOKEN, algorithm=ALGORITHM)

    # return the generated token
    return encoded_jwt


def get_hashed_password(plain_text_password: str):
    # Hash a password for the first time
    #   (Using bcrypt, the salt is saved into the hash itself)
    pwd_bytes = plain_text_password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password=pwd_bytes, salt=salt)
    print(pwd_bytes, type(bcrypt.gensalt()), type(hashed_password))
    return hashed_password

def check_password(plain_text_password: str, hashed_password: str):
    # Check hashed password. Using bcrypt, the salt is saved into the hash itself
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_password.encode('utf-8'))