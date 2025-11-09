import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi import HTTPException
from sqlalchemy.orm import Session

from config.settings import settings
from models import user_model
from schemas import user_schema, auth_schema
from services.auth_service import AuthService


def send_reset_email(to: str, reset_link: str):
    msg = MIMEMultipart()
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Password Reset Request"
    msg["From"] = "news-porta@email.com"
    msg["To"] = to

    html_message = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
                <h2 style="color: #333;">Recuperación de contraseña 🔐</h2>
                <p>Hola,</p>
                <p>Has solicitado restablecer tu contraseña. Haz clic en el botón de abajo para continuar:</p>
                <p style="text-align: center;">
                    <a href="{reset_link}" 
                       style="background-color: #007bff; color: white; padding: 10px 20px; 
                              text-decoration: none; border-radius: 5px;">Restablecer contraseña</a>
                </p>
                <p>Si tú no solicitaste este cambio, puedes ignorar este correo.</p>
                <p style="color: #888;">— El equipo de tu Portal de Noticias</p>
            </div>
        </body>
    </html> """

    msg.attach(MIMEText(html_message, "html"))
    try:
        with smtplib.SMTP(host="localhost", port=1025) as smtp:
            if settings.EMAIL_USE_TLS:
                smtp.starttls()
            if settings.EMAIL_LOGIN:
                smtp.login(user=settings.EMAIL_USER, password=settings.EMAIL_PASSWORD)
            smtp.send_message(msg)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Error to send email")


class AuthController:
    @staticmethod
    async def signup(user: user_schema.UserCreate, db: Session):
        exist_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()

        if exist_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        hash_password = AuthService.get_password_hash(user.password)
        new_user = user_model.User(email=user.email, name=user.name, password=hash_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

    @staticmethod
    async def login(credentials: auth_schema.LoginRequest, db: Session):

        user = db.query(user_model.User).filter(user_model.User.email == credentials.email).first()
        if not user or not user.password:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        if not user.is_active:
            raise HTTPException(status_code=401, detail="Account is disabled")

        verify_password = AuthService.verify_password(credentials.password, user.password)

        if not verify_password:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        access_token = AuthService.create_access_token({"user_id": str(user.id)})
        refresh_token = AuthService.create_refresh_token({"user_id": str(user.id)})

        return auth_schema.LoginResponse(email=user.email, name=user.name, access_token=access_token,
                                         refresh_token=refresh_token)

    @staticmethod
    async def forget_password(data: auth_schema.ForgetPasswordRequest, db: Session):
        user = db.query(user_model.User).filter(user_model.User.email == data.email).first()
        if user:
            token = AuthService.create_access_token({"user_id": str(user.id)},
                                                    settings.FORGOT_PASSWORD_TOKEN_EXPIRE_MINUTES)
            redirect = f"{settings.FRONTEND_URL}/forget-password?token={token}"
            send_reset_email(user.email, redirect)

        return {"message": "Email sent"}

    @staticmethod
    async def forget_password_confirm(data: auth_schema.ForgetPasswordConfirmRequest, db: Session):
        token_payload = AuthService.verify_token(data.token)

        if not token_payload or not token_payload["user_id"]:
            raise HTTPException(status_code=401, detail="Invalid action")

        id = token_payload["user_id"]
        user = db.query(user_model.User).filter(user_model.User.id == id).first()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid action")

        hash_password = AuthService.get_password_hash(data.password)
        user.password = hash_password
        db.commit()

        return {"message": "Password changed successfully"}
