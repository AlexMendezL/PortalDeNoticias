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
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 240
    REFRESH_TOKEN_EXPIRE_DAYS: int = 3

    DATABASE_URL: str

    EMAIL_HOST: str
    EMAIL_HOST_USER: str
    EMAIL_HOST_PASSWORD: str
    EMAIL_PORT: int = 1025
    EMAIL_FROM: str
    EMAIL_USE_TLS: bool
    EMAIL_LOGIN: bool

    FORGOT_PASSWORD_TOKEN_EXPIRE_MINUTES: int
    FRONTEND_URL: str

    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:3000"]

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
