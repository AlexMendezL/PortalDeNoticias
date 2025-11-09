from pydantic import BaseModel, EmailStr, field_validator

from schemas.utils_schema import PasswordStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: PasswordStr


class LoginResponse(BaseModel):
    email: str
    name: str
    access_token: str
    refresh_token: str
    token_type: str = 'Bearer'


class ForgetPasswordRequest(BaseModel):
    email: EmailStr


class ForgetPasswordConfirmRequest(BaseModel):
    password: PasswordStr
    confirm_password: PasswordStr
    token: str

    @field_validator("confirm_password")
    def passwords_match(cls, v, values):
        if 'password' in values.data and v != values.data['password']:
            raise ValueError("Passwords do not match")
        return v
