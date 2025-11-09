from typing import List

from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Portal de noticias"
    # DEBUG: bool
    DEBUG: bool = True
    API_PREFIX: str = "/api/v1"

    SECRET_KEY: str = "SECRET_KEY"
    JWT_SECRET_KEY: str = "SECRET_KEY"
    ACCESS_TOKEN_EXPIRES_MINUTES: int = 240
    REFRESH_TOKEN_EXPIRES_DAYS: int = 3

    DATABASE_URL: str

    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:3000"]

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()