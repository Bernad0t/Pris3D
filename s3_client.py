import asyncio
from contextlib import asynccontextmanager

from aiobotocore.session import get_session
from botocore.exceptions import ClientError


class S3Client:
    def __init__(
            self,
            access_key: str,
            secret_key: str,
            endpoint_url: str,
            bucket_name: str,
    ):
        self.config = {
            "aws_access_key_id": access_key,
            "aws_secret_access_key": secret_key,
            "endpoint_url": endpoint_url,
        }
        self.bucket_name = bucket_name
        self.session = get_session()

    @asynccontextmanager
    async def get_client(self):
        async with self.session.create_client("s3", **self.config) as client:
            yield client

    async def upload_file(
            self,
            file_path: str,
    ):
        object_name = file_path.split("/")[-1]  # /users/artem/cat.jpg
        try:
            async with self.get_client() as client:
                with open(file_path, "rb") as file:
                    await client.put_object(
                        Bucket=self.bucket_name,
                        Key=object_name,
                        Body=file,
                    )
                print(f"File {object_name} uploaded to {self.bucket_name}")
        except ClientError as e:
            print(f"Error uploading file: {e}")

    async def delete_file(self, object_name: str):
        try:
            async with self.get_client() as client:
                await client.delete_object(Bucket=self.bucket_name, Key=object_name)
                print(f"File {object_name} deleted from {self.bucket_name}")
        except ClientError as e:
            print(f"Error deleting file: {e}")

    async def get_file(self, object_name: str, destination_path: str):
        try:
            async with self.get_client() as client:
                response = await client.get_object(Bucket=self.bucket_name, Key=object_name)
                data = await response["Body"].read()
                with open(destination_path, "wb") as file:
                    file.write(data)
                print(f"File {object_name} downloaded to {destination_path}")
        except ClientError as e:
            print(f"Error downloading file: {e}")

async def work_with_file():
    s3_client = S3Client(
        access_key="bf66681674b44c6d926a15dd916befd6",
        secret_key="30fb4d9e80644028b0e81872c0d63fa3",
        endpoint_url="https://s3.storage.selcloud.ru",  # для Selectel используйте https://s3.storage.selcloud.ru
        bucket_name="Pris3D",
    )

    # уже загружено

    # await s3_client.upload_file("C:/Games/CK Pris3D/images/logo.png")
    # await s3_client.upload_file("C:/Games/CK Pris3D/images/list.png")
    # await s3_client.upload_file("C:/Games/CK Pris3D/images/Ручка задней двери Pathfinder R51.png")
    # await s3_client.upload_file("C:/Games/CK Pris3D/images/Шестерня редуктора заднего стеклоочистителя 2114.png")
    # await s3_client.upload_file("C:/Games/CK Pris3D/images/Шестерня стеклоподъемника LADA PrioraChev Niva.png")
    # await s3_client.upload_file("C:/Games/CK Pris3D/images/Хомут рулевого вала Nissan Qashqai.png")
    # await s3_client.upload_file("C:/Games/CK Pris3D/images/Заглушка ручки двери Mitsubishi.png")
    # await s3_client.upload_file("C:/Games/CK Pris3D/images/Адаптер для датчика Audi 80 B4.png")


if __name__ == "__main__":
    asyncio.run(work_with_file())