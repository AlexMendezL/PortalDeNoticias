from uuid import UUID

from pydantic import BaseModel, EmailStr, field_validator

from schemas.utils_schema import NonEmptyStr, PasswordStr

NameStr = NonEmptyStr(min_length=3, max_length=30, pattern=r"^[a-zA-Z0-9_]+$")


class UserBase(BaseModel):
    email: EmailStr
    name: NameStr


class UserCreate(UserBase):
    password: PasswordStr
    confirm_password: PasswordStr

    @field_validator("confirm_password")
    def passwords_match(cls, v, values):
        if 'password' in values.data and v != values.data['password']:
            raise ValueError("Passwords do not match")
        return v


class UserResponse(UserBase):
    id: UUID



