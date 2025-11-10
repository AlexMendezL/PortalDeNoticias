from schemas import user_schema

class UserController:
    @staticmethod
    def me(current_user:user_schema.UserBase):
        return current_user