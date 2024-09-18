from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

import smtplib, ssl

load_dotenv()

#DATABASE
class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASS: str
    DB_NAME: str
    SECRET_KEY_TOKEN: str
    ALGORITHM: str
    MAIL: str
    PASSWORD_MAIL: str
    @property
    def DATABASE_URL_asyncpg(self):
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    @property
    def DATABASE_URL_psycopg(self):
        return f"postgresql+psycopg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
SECRET_KEY_TOKEN = settings.SECRET_KEY_TOKEN
ALGORITHM = settings.ALGORITHM
EXPIRE_REFRESH_TOKEN = 60 * 24 * 30 # min
EXPIRE_ACCESS_TOKEN = 60 * 24 * 15  # min

#MAIL

port = 465  # For SSL
smtp_server = "smtp.gmail.com"
sender_email = settings.MAIL
password = settings.PASSWORD_MAIL
context = ssl.create_default_context()

async def send_message(message: str, subject: str, receiver_email: str = sender_email):
    msg = MIMEMultipart("alternative")
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = receiver_email
    message = MIMEText(message, "plain")
    msg.attach(message)
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(
            sender_email, receiver_email, msg.as_string()
        )
