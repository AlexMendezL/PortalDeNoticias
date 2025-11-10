from fastapi import APIRouter, Depends
from schemas import user_schema
from middleware.auth_middleware import get_current_user

from controller.user_controller import UserController

router = APIRouter(
    dependencies=[Depends(get_current_user)]
)

@router.get("/ping")
def ping():
    return {"message": "pong user"}

@router.get("/me", response_model=user_schema.MeResponse)
def me(current_user: user_schema.MeResponse = Depends(get_current_user)):
    return UserController.me(current_user)
