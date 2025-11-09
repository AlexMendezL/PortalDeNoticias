from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette import status

from config.db import get_db
from controller.auth_controller import AuthController
from schemas import user_schema, auth_schema

router = APIRouter()


@router.get("/ping", )
def ping():
    return {"message": "pong auth"}


@router.post("/signup", status_code=status.HTTP_201_CREATED, response_model=user_schema.UserBase)
async def signup(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    return await AuthController.signup(user, db)


@router.post("/login", status_code=status.HTTP_200_OK, response_model=auth_schema.LoginResponse)
async def login(user: auth_schema.LoginRequest, db: Session = Depends(get_db)):
    return await AuthController.login(user, db)


@router.post("/forget_password", status_code=status.HTTP_200_OK)
async def forget_password(data: auth_schema.ForgetPasswordRequest, db: Session = Depends(get_db)):
    return await AuthController.forget_password(data, db)


@router.post("/forget_password_confirm", status_code=status.HTTP_200_OK)
async def forget_password_confirm(data: auth_schema.ForgetPasswordConfirmRequest, db: Session = Depends(get_db)):
    return await AuthController.forget_password_confirm(data, db)
