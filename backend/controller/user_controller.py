from schemas import user_schema

class UserController:
    @staticmethod
    def me(current_user:user_schema.MeResponse):
        return current_user