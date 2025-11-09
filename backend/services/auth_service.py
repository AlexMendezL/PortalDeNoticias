# from authlib.integrations.starlette_client import OAuth
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from config.settings import settings

# Password hashing
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto", argon2__memory_cost=65536, argon2__time_cost=3,
                           argon2__parallelism=2)


# # OAuth2 Configuration
# oauth = OAuth()
#
# # Google OAuth
# oauth.register(
#     name='google',
#     client_id=settings.GOOGLE_CLIENT_ID,
#     client_secret=settings.GOOGLE_CLIENT_SECRET,
#     server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
#     client_kwargs={'scope': 'openid email profile'}
# )
#
# # Facebook OAuth
# oauth.register(
#     name='facebook',
#     client_id=settings.FACEBOOK_CLIENT_ID,
#     client_secret=settings.FACEBOOK_CLIENT_SECRET,
#     authorize_url='https://www.facebook.com/v12.0/dialog/oauth',
#     access_token_url='https://graph.facebook.com/v12.0/oauth/access_token',
#     client_kwargs={'scope': 'email public_profile'}
# )
#
# # GitHub OAuth
# oauth.register(
#     name='github',
#     client_id=settings.GITHUB_CLIENT_ID,
#     client_secret=settings.GITHUB_CLIENT_SECRET,
#     authorize_url='https://github.com/login/oauth/authorize',
#     access_token_url='https://github.com/login/oauth/access_token',
#     client_kwargs={'scope': 'user:email'}
# )


class AuthService:
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def get_password_hash(password: str) -> str:
        return pwd_context.hash(password)

    @staticmethod
    def create_access_token(data: dict, expire: int = settings.ACCESS_TOKEN_EXPIRE_MINUTES) -> str:
        to_encode = data.copy()
        now = datetime.now(timezone.utc)
        expire = now + timedelta(minutes=expire)
        to_encode.update({"exp": expire, "type": "access"})
        return jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

    @staticmethod
    def create_refresh_token(data: dict) -> str:
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
        to_encode.update({"exp": expire, "type": "refresh"})
        return jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

    @staticmethod
    def verify_token(token: str) -> dict:
        try:
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
            return payload
        except JWTError as e:
            print("ERROR", e)
            return None
