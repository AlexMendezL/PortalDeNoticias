import re

from pydantic import GetCoreSchemaHandler
from pydantic_core import PydanticCustomError, core_schema

from typing import Annotated
from pydantic import StringConstraints


def NonEmptyStr(
        min_length: int = 5,
        max_length: int = 250,
        pattern: str | None = None,
        strip_whitespace: bool = True,
) -> type[str]:
    return Annotated[
        str,
        StringConstraints(
            strip_whitespace=strip_whitespace,
            min_length=min_length,
            max_length=max_length,
            pattern=pattern,
        ),
    ]


class PasswordStr(str):

    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, handler: GetCoreSchemaHandler):
        def validate_password(value: str) -> str:
            if not isinstance(value, str):
                raise PydanticCustomError("password_type", "Password must be a string.")

            if len(value) < 8 or len(value) > 64:
                raise PydanticCustomError(
                    "password_length",
                    "Password must be between 8 and 64 characters long."
                )
            if " " in value:
                raise PydanticCustomError("password_space", "Password cannot contain spaces.")
            if not re.search(r"[A-Z]", value):
                raise PydanticCustomError("password_uppercase", "Password must include at least one uppercase letter.")
            if not re.search(r"[a-z]", value):
                raise PydanticCustomError("password_lowercase", "Password must include at least one lowercase letter.")
            if not re.search(r"\d", value):
                raise PydanticCustomError("password_digit", "Password must include at least one digit.")
            if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
                raise PydanticCustomError("password_special", "Password must include at least one special character.")

            return value

        return core_schema.no_info_after_validator_function(validate_password, core_schema.str_schema())
